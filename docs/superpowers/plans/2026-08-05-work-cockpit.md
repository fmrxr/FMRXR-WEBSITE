# Work Cockpit Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace `/os/projets`, `/os/taches`, `/os/agenda` with a single `/os/work` page — a multi-project cockpit with a pulse-sorted project list, a stack of pinned project detail cards, a multi-project swimlane timeline, and a "current sprint" banner with a real burndown.

**Architecture:** One new route (`app/os/work/page.tsx`) orchestrates data already served by `useOs()`. New pure functions in `lib/os/compute.ts` (`projectPulse`, `activeSprint`, `burndownSeries`, `ganttByProject`) compute derived state; new presentational components under `components/os/work/` render it. `OsGraph`/`OsTask`/`OsDeadline` types gain fields (`sprints`, `blockers`, `completedAt`, `epic`) that already exist in the live Supabase data but were never declared in TypeScript. Old routes become redirects; their now-orphaned components are deleted.

**Tech Stack:** Next.js 16 (App Router), React, TypeScript, Tailwind (existing `fm*` design tokens), Vitest for pure-function tests. No new dependencies — charts are hand-rolled SVG/CSS, consistent with the existing `MiniGantt`.

---

## Task 1: Types — declare `sprints`/`blockers`/`completedAt`/`epic`

**Files:**
- Modify: `src/lib/os/types.ts`

- [ ] **Step 1: Add `OsSprint` and `OsBlocker` interfaces, extend `OsTask`/`OsDeadline`/`OsGraph`**

In `src/lib/os/types.ts`, replace the `OsTask` and `OsDeadline` interfaces (lines 144–161) with:

```typescript
export interface OsTask {
  id: string;
  label: string;
  project?: string;
  owner?: string;
  due?: string;
  done: boolean;
  /** Horodatage ISO posé au moment où `done` passe à true — effacé si la tâche est réouverte. */
  completedAt?: string;
  /** Sous-thème libre à l'intérieur d'un projet (ex: "Phase Socle") — regroupement visuel, pas une entité. */
  epic?: string;
}

export interface OsDeadline {
  id: string;
  date: string;
  label: string;
  project?: string;
  critical?: boolean;
  owner?: string;
  done?: boolean;
  epic?: string;
}

export type SprintStatus = "planned" | "active" | "completed" | (string & {});

export interface OsSprint {
  id: string;
  start: string;
  end: string;
  goal: string;
  status: SprintStatus;
  tasks: string[];
  notes?: string;
  notes_cloture?: string;
  reviewed?: string;
  velocity?: string;
  velocity_partial?: boolean;
}

export type BlockerSeverity = "low" | "medium" | "high" | "critical" | (string & {});

export interface OsBlocker {
  id: string;
  label: string;
  project?: string | null;
  task?: string | null;
  owner?: string;
  detected: string;
  resolved: boolean;
  severity: BlockerSeverity;
  resolved_date?: string;
}
```

Then add `sprints?: OsSprint[];` and `blockers?: OsBlocker[];` to the `OsGraph` interface, next to the existing `deadlines: OsDeadline[];` line.

- [ ] **Step 2: Typecheck**

Run: `cd "E:/FMRXR/CLAUDE PRO/fmrxr-web" && npx tsc --noEmit`
Expected: no new errors (existing code reads these fields via `[k: string]: unknown` today, so nothing should break).

- [ ] **Step 3: Commit**

```bash
cd "E:/FMRXR/CLAUDE PRO/fmrxr-web"
git add src/lib/os/types.ts
git commit -m "feat(os/types): declare sprints, blockers, task.completedAt, epic fields"
```

---

## Task 2: `compute.ts` — `projectPulse`

**Files:**
- Modify: `src/lib/os/compute.ts`
- Test: `src/test/os-compute.test.ts`

- [ ] **Step 1: Write the failing test**

Add to `src/test/os-compute.test.ts` (add `projectPulse` to the existing import list at the top, then add this `describe` block anywhere after the imports):

```typescript
describe("projectPulse", () => {
  const NOW2 = new Date("2026-08-05T12:00:00.000Z");
  const baseProject: OsProject = { id: "p1", name: "P1", type: "project", status: "active" };

  it("is hot when a deadline is due within 7 days", () => {
    const deadlines = [{ id: "d1", date: "2026-08-10", label: "L", project: "p1", done: false }];
    expect(projectPulse(baseProject, deadlines, [], NOW2)).toBe("hot");
  });

  it("is hot when there is an unresolved blocker", () => {
    const blockers = [{ id: "b1", label: "L", project: "p1", detected: "2026-08-01", resolved: false, severity: "high" as const }];
    expect(projectPulse(baseProject, [], blockers, NOW2)).toBe("hot");
  });

  it("is hot when priority is critical, even with no deadline/blocker", () => {
    expect(projectPulse({ ...baseProject, priority: "critical" }, [], [], NOW2)).toBe("hot");
  });

  it("is warm when a deadline is within 30 days but not 7", () => {
    const deadlines = [{ id: "d1", date: "2026-08-25", label: "L", project: "p1", done: false }];
    expect(projectPulse(baseProject, deadlines, [], NOW2)).toBe("warm");
  });

  it("is cold with no deadline, no blocker, no critical priority", () => {
    expect(projectPulse(baseProject, [], [], NOW2)).toBe("cold");
  });

  it("ignores done deadlines and resolved blockers", () => {
    const deadlines = [{ id: "d1", date: "2026-08-06", label: "L", project: "p1", done: true }];
    const blockers = [{ id: "b1", label: "L", project: "p1", detected: "2026-08-01", resolved: true, severity: "high" as const }];
    expect(projectPulse(baseProject, deadlines, blockers, NOW2)).toBe("cold");
  });

  it("ignores deadlines/blockers belonging to a different project", () => {
    const deadlines = [{ id: "d1", date: "2026-08-06", label: "L", project: "other", done: false }];
    expect(projectPulse(baseProject, deadlines, [], NOW2)).toBe("cold");
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `cd "E:/FMRXR/CLAUDE PRO/fmrxr-web" && npx vitest run src/test/os-compute.test.ts -t projectPulse`
Expected: FAIL — `projectPulse is not defined` (or import error).

- [ ] **Step 3: Implement `projectPulse`**

First, add `OsBlocker` to the type-only import at the top of `src/lib/os/compute.ts` (the existing line starting `import type { AssetKind, Currency, OsAsset, ... } from "./types";`) — insert it alphabetically: `..., OsAsset, OsBlocker, OsCfBatch, ...`.

Then add to `src/lib/os/compute.ts` (near `ganttItems`, using the existing `daysUntil` and the newly-typed `OsBlocker`/`OsDeadline`/`OsProject`):

```typescript
export type ProjectPulse = "hot" | "warm" | "cold";

/**
 * Score d'urgence d'un projet actif — hot = attention requise cette semaine, warm = à surveiller
 * ce mois-ci, cold = dormant. Utilisé pour trier la liste de projets du cockpit Work.
 */
export function projectPulse(
  project: Pick<OsProject, "id" | "priority">,
  deadlines: Pick<OsDeadline, "project" | "date" | "done">[],
  blockers: Pick<OsBlocker, "project" | "resolved">[],
  now: Date = new Date(),
): ProjectPulse {
  const openDeadlineDays = deadlines
    .filter((d) => d.project === project.id && !d.done)
    .map((d) => daysUntil(d.date, now))
    .filter((n): n is number => n !== null && n >= 0);
  const hasUnresolvedBlocker = blockers.some((b) => b.project === project.id && !b.resolved);
  const nearestDeadline = openDeadlineDays.length ? Math.min(...openDeadlineDays) : null;

  if (hasUnresolvedBlocker || project.priority === "critical" || (nearestDeadline !== null && nearestDeadline <= 7)) {
    return "hot";
  }
  if (nearestDeadline !== null && nearestDeadline <= 30) {
    return "warm";
  }
  return "cold";
}
```

- [ ] **Step 4: Run test to verify it passes**

Run: `cd "E:/FMRXR/CLAUDE PRO/fmrxr-web" && npx vitest run src/test/os-compute.test.ts -t projectPulse`
Expected: PASS (7 tests).

- [ ] **Step 5: Commit**

```bash
cd "E:/FMRXR/CLAUDE PRO/fmrxr-web"
git add src/lib/os/compute.ts src/test/os-compute.test.ts
git commit -m "feat(os/compute): add projectPulse hot/warm/cold scoring"
```

---

## Task 3: `compute.ts` — `activeSprint`

**Files:**
- Modify: `src/lib/os/compute.ts`
- Test: `src/test/os-compute.test.ts`

- [ ] **Step 1: Write the failing test**

Add `activeSprint` to the compute.ts import list in the test file, then add:

```typescript
describe("activeSprint", () => {
  const NOW3 = new Date("2026-08-05T12:00:00.000Z");
  const sprints: OsSprint[] = [
    { id: "s1", start: "2026-07-06", end: "2026-07-12", goal: "G1", status: "completed", tasks: [] },
    { id: "s2", start: "2026-07-27", end: "2026-07-31", goal: "G2", status: "completed", tasks: [] },
    { id: "s3", start: "2026-08-03", end: "2026-08-07", goal: "G3", status: "planned", tasks: [] },
  ];

  it("returns the sprint whose status is active", () => {
    const withActive = [...sprints, { id: "s4", start: "2026-08-01", end: "2026-08-05", goal: "G4", status: "active" as const, tasks: [] }];
    expect(activeSprint(withActive, NOW3)?.id).toBe("s4");
  });

  it("falls back to the most recent non-completed sprint when none is active", () => {
    expect(activeSprint(sprints, NOW3)?.id).toBe("s3");
  });

  it("returns null when there are no sprints", () => {
    expect(activeSprint([], NOW3)).toBeNull();
  });

  it("returns null when every sprint is completed", () => {
    expect(activeSprint(sprints.slice(0, 2), NOW3)).toBeNull();
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `cd "E:/FMRXR/CLAUDE PRO/fmrxr-web" && npx vitest run src/test/os-compute.test.ts -t activeSprint`
Expected: FAIL — `activeSprint is not defined`.

- [ ] **Step 3: Implement `activeSprint`**

Add to `src/lib/os/compute.ts`:

```typescript
/**
 * Le sprint en cours pour la bande "Sprint actuel" du cockpit Work : celui marqué `active`,
 * sinon le plus récent (par date de début) qui n'est pas `completed`. `null` s'il n'y en a aucun.
 */
export function activeSprint(sprints: OsSprint[] = [], now: Date = new Date()): OsSprint | null {
  const active = sprints.find((s) => s.status === "active");
  if (active) return active;
  const candidates = sprints.filter((s) => s.status !== "completed");
  if (!candidates.length) return null;
  return [...candidates].sort((a, b) => Date.parse(b.start) - Date.parse(a.start))[0];
}
```

Add `OsSprint` to the type imports at the top of `compute.ts` (extend the existing `import type { ... } from "./types"` line).

- [ ] **Step 4: Run test to verify it passes**

Run: `cd "E:/FMRXR/CLAUDE PRO/fmrxr-web" && npx vitest run src/test/os-compute.test.ts -t activeSprint`
Expected: PASS (4 tests).

- [ ] **Step 5: Commit**

```bash
cd "E:/FMRXR/CLAUDE PRO/fmrxr-web"
git add src/lib/os/compute.ts src/test/os-compute.test.ts
git commit -m "feat(os/compute): add activeSprint selector"
```

---

## Task 4: `compute.ts` — `burndownSeries`

**Files:**
- Modify: `src/lib/os/compute.ts`
- Test: `src/test/os-compute.test.ts`

- [ ] **Step 1: Write the failing test**

Add `burndownSeries` to the import list, then:

```typescript
describe("burndownSeries", () => {
  const sprint: OsSprint = { id: "s1", start: "2026-08-01", end: "2026-08-05", goal: "G", status: "active", tasks: ["t1", "t2", "t3", "t4"] };
  const tasks: OsTask[] = [
    { id: "t1", label: "T1", done: true, completedAt: "2026-08-02T10:00:00.000Z" },
    { id: "t2", label: "T2", done: true, completedAt: "2026-08-03T10:00:00.000Z" },
    { id: "t3", label: "T3", done: false },
    { id: "t4", label: "T4", done: true }, // done before this feature existed: no completedAt
  ];

  it("builds one point per day from sprint.start to min(now, sprint.end), remaining = not-yet-completed-by-that-day", () => {
    const now = new Date("2026-08-04T12:00:00.000Z");
    const series = burndownSeries(sprint, tasks, now);
    expect(series.ideal[0]).toEqual({ date: "2026-08-01", value: 4 });
    expect(series.ideal[series.ideal.length - 1]).toEqual({ date: "2026-08-05", value: 0 });
    expect(series.actual.map((p) => p.date)).toEqual(["2026-08-01", "2026-08-02", "2026-08-03", "2026-08-04"]);
    // t4 has no completedAt (pre-existing done) -> counts as already-not-remaining from day 0
    expect(series.actual[0].value).toBe(3);
    // t1 completes on the 2nd -> remaining drops to 2
    expect(series.actual[1].value).toBe(2);
    // t2 completes on the 3rd -> remaining drops to 1
    expect(series.actual[2].value).toBe(1);
    expect(series.actual[3].value).toBe(1);
  });

  it("stops the actual series at sprint.end even if now is later", () => {
    const now = new Date("2026-08-20T12:00:00.000Z");
    const series = burndownSeries(sprint, tasks, now);
    expect(series.actual[series.actual.length - 1].date).toBe("2026-08-05");
  });

  it("returns a single point when the sprint just started (start === today)", () => {
    const now = new Date("2026-08-01T09:00:00.000Z");
    const series = burndownSeries(sprint, tasks, now);
    expect(series.actual).toHaveLength(1);
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `cd "E:/FMRXR/CLAUDE PRO/fmrxr-web" && npx vitest run src/test/os-compute.test.ts -t burndownSeries`
Expected: FAIL — `burndownSeries is not defined`.

- [ ] **Step 3: Implement `burndownSeries`**

Add to `src/lib/os/compute.ts`:

```typescript
export interface BurndownPoint {
  date: string;
  value: number;
}

export interface BurndownSeries {
  ideal: BurndownPoint[];
  actual: BurndownPoint[];
}

function isoDay(d: Date): string {
  return d.toISOString().slice(0, 10);
}

/**
 * Séries idéale/réelle pour le burndown du sprint actif. La série "réelle" ne remonte pas dans le
 * passé au-delà de ce que `completedAt` permet de savoir : une tâche cochée avant l'introduction de
 * ce champ compte comme "déjà faite" dès le jour 0, faute d'horodatage exact.
 */
export function burndownSeries(sprint: Pick<OsSprint, "start" | "end" | "tasks">, tasks: OsTask[], now: Date = new Date()): BurndownSeries {
  const scoped = tasks.filter((t) => sprint.tasks.includes(t.id));
  const total = scoped.length;
  const start = new Date(sprint.start + "T00:00:00.000Z");
  const end = new Date(sprint.end + "T00:00:00.000Z");
  const lastDay = new Date(Math.min(now.getTime(), end.getTime()));

  const spanDays = Math.max(1, Math.round((end.getTime() - start.getTime()) / 86_400_000));
  const ideal: BurndownPoint[] = [];
  for (let i = 0; i <= spanDays; i++) {
    const d = new Date(start.getTime() + i * 86_400_000);
    ideal.push({ date: isoDay(d), value: Math.max(0, Math.round(total - (total * i) / spanDays)) });
  }

  const actual: BurndownPoint[] = [];
  for (let d = new Date(start); d.getTime() <= lastDay.getTime(); d = new Date(d.getTime() + 86_400_000)) {
    const dayStr = isoDay(d);
    const remaining = scoped.filter((t) => {
      if (!t.done) return true;
      if (!t.completedAt) return false; // completed before completedAt existed: not remaining from day 0
      return isoDay(new Date(t.completedAt)) > dayStr;
    }).length;
    actual.push({ date: dayStr, value: remaining });
  }

  return { ideal, actual };
}
```

Add `OsSprint` to the `compute.ts` type imports (already added in Task 3 — no duplicate import needed).

- [ ] **Step 4: Run test to verify it passes**

Run: `cd "E:/FMRXR/CLAUDE PRO/fmrxr-web" && npx vitest run src/test/os-compute.test.ts -t burndownSeries`
Expected: PASS (3 tests).

- [ ] **Step 5: Commit**

```bash
cd "E:/FMRXR/CLAUDE PRO/fmrxr-web"
git add src/lib/os/compute.ts src/test/os-compute.test.ts
git commit -m "feat(os/compute): add burndownSeries (ideal + actual from completedAt)"
```

---

## Task 5: `compute.ts` — `ganttByProject`

**Files:**
- Modify: `src/lib/os/compute.ts`
- Test: `src/test/os-compute.test.ts`

- [ ] **Step 1: Write the failing test**

Add `ganttByProject` to the import list, then:

```typescript
describe("ganttByProject", () => {
  const NOW5 = new Date("2026-08-05T00:00:00.000Z");
  const deadlines: OsDeadline[] = [
    { id: "d1", date: "2026-08-10", label: "D1", project: "p1", done: false },
    { id: "d2", date: "2026-08-20", label: "D2", project: "p2", done: false },
  ];

  it("returns one lane per requested project, sharing a single timeline span", () => {
    const result = ganttByProject(deadlines, [], ["p1", "p2"], NOW5);
    expect(result.lanes.map((l) => l.projectId)).toEqual(["p1", "p2"]);
    // Same nowPct on every lane -> proof they share one timeline, not one per project
    expect(result.lanes[0].nowPct).toBe(result.lanes[1].nowPct);
  });

  it("gives an empty items array (not an error) for a project with no dated milestones", () => {
    const result = ganttByProject(deadlines, [], ["p1", "p3"], NOW5);
    expect(result.lanes.find((l) => l.projectId === "p3")?.items).toEqual([]);
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `cd "E:/FMRXR/CLAUDE PRO/fmrxr-web" && npx vitest run src/test/os-compute.test.ts -t ganttByProject`
Expected: FAIL — `ganttByProject is not defined`.

- [ ] **Step 3: Implement `ganttByProject`**

Add to `src/lib/os/compute.ts`, right after `ganttItems`:

```typescript
export interface ProjectGanttLane {
  projectId: string;
  items: GanttItem[];
  nowPct: number;
}

export interface MultiProjectGantt {
  lanes: ProjectGanttLane[];
}

/**
 * Un couloir par projet, tous positionnés sur LA MÊME frise temporelle (contrairement à
 * `ganttItems` appelé isolément par projet, qui recalculerait une frise différente pour chacun) —
 * nécessaire pour que les couloirs du cockpit Work restent alignés verticalement.
 */
export function ganttByProject(deadlines: OsDeadline[], tasks: OsTask[], projectIds: string[], now: Date = new Date()): MultiProjectGantt {
  const allDated = [
    ...deadlines.filter((d) => d.project && projectIds.includes(d.project)).map((d) => Date.parse(d.date)),
    ...tasks.filter((t) => t.project && projectIds.includes(t.project) && t.due).map((t) => Date.parse(t.due as string)),
  ].filter((n) => !Number.isNaN(n));

  if (!allDated.length) {
    return { lanes: projectIds.map((projectId) => ({ projectId, items: [], nowPct: 0 })) };
  }

  const t0 = Math.min(now.getTime(), ...allDated);
  const t1 = Math.max(...allDated);
  const span = Math.max(1, (t1 - t0) / 86_400_000);
  const pos = (ms: number) => Math.max(0, Math.min(100, ((ms - t0) / 86_400_000 / span) * 100));
  const nowPct = pos(now.getTime());

  const lanes = projectIds.map((projectId) => {
    const fromDeadlines: Omit<GanttItem, "pct">[] = deadlines
      .filter((d) => d.project === projectId)
      .map((d) => ({ id: d.id, label: d.label, date: d.date, done: !!d.done, critical: !!d.critical }));
    const fromTasks: Omit<GanttItem, "pct">[] = tasks
      .filter((t) => t.project === projectId && t.due)
      .map((t) => ({ id: t.id, label: t.label, date: t.due as string, done: t.done, critical: false }));
    const items = [...fromDeadlines, ...fromTasks]
      .sort((a, b) => Date.parse(a.date) - Date.parse(b.date))
      .map((i) => ({ ...i, pct: pos(Date.parse(i.date)) }));
    return { projectId, items, nowPct };
  });

  return { lanes };
}
```

- [ ] **Step 4: Run test to verify it passes**

Run: `cd "E:/FMRXR/CLAUDE PRO/fmrxr-web" && npx vitest run src/test/os-compute.test.ts -t ganttByProject`
Expected: PASS (2 tests).

- [ ] **Step 5: Run the full compute test suite**

Run: `cd "E:/FMRXR/CLAUDE PRO/fmrxr-web" && npx vitest run src/test/os-compute.test.ts`
Expected: all tests pass (existing + new).

- [ ] **Step 6: Commit**

```bash
cd "E:/FMRXR/CLAUDE PRO/fmrxr-web"
git add src/lib/os/compute.ts src/test/os-compute.test.ts
git commit -m "feat(os/compute): add ganttByProject shared-timeline swimlanes"
```

---

## Task 6: Extract `TaskRow` into a shared component

**Files:**
- Create: `src/components/os/TaskRow.tsx`
- Modify: `src/components/os/taches/TaskGroupList.tsx`

- [ ] **Step 1: Create the shared component**

`PinnedProjectCard` (Task 8) needs the same checkbox-row rendering `TaskGroupList` already has inline. Extract it verbatim into its own file:

```typescript
"use client";

import { daysUntil } from "@/lib/os/compute";
import type { OsTask } from "@/lib/os/types";

interface TaskRowProps {
  task: OsTask;
  now: Date;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
}

/** Ligne tâche réutilisable : case à cocher, libellé, propriétaire/échéance, suppression. */
export function TaskRow({ task, now, onToggle, onDelete }: TaskRowProps) {
  const late = task.due && !task.done && (daysUntil(task.due, now) ?? 0) < 0;
  const dueDays = task.due ? daysUntil(task.due, now) : null;
  const hasMeta = task.owner || task.due;
  return (
    <div className="flex items-start gap-2.5 py-2">
      <button
        type="button"
        onClick={() => onToggle(task.id)}
        className={`mt-0.5 shrink-0 font-grotesk text-base leading-none ${task.done ? "text-fmaccent" : "text-fmmuted"}`}
      >
        {task.done ? "☑" : "☐"}
      </button>
      <div className="min-w-0 flex-1">
        <div className={`font-grotesk text-sm ${task.done ? "text-fmmuted line-through" : "text-fmfg"}`}>{task.label}</div>
        {hasMeta && (
          <div className="mt-0.5 font-mono text-[10.5px] text-fmmuted">
            {task.owner}
            {task.due ? `${task.owner ? " · " : ""}${task.due}${late ? " retard" : !task.done && (dueDays ?? 0) >= 0 ? ` · J-${dueDays}` : ""}` : ""}
          </div>
        )}
      </div>
      <button type="button" onClick={() => onDelete(task.id)} title="Supprimer" className="shrink-0 px-0.5 text-fmmuted hover:text-[#ff4d5e]">
        ✕
      </button>
    </div>
  );
}
```

- [ ] **Step 2: Update `TaskGroupList.tsx` to import the shared component**

In `src/components/os/taches/TaskGroupList.tsx`, delete the local `TaskRow` function (lines 8–43) and its now-unused `daysUntil` import, and add at the top:

```typescript
import { TaskRow } from "../TaskRow";
```

- [ ] **Step 3: Typecheck**

Run: `cd "E:/FMRXR/CLAUDE PRO/fmrxr-web" && npx tsc --noEmit`
Expected: no errors.

- [ ] **Step 4: Commit**

```bash
cd "E:/FMRXR/CLAUDE PRO/fmrxr-web"
git add src/components/os/TaskRow.tsx src/components/os/taches/TaskGroupList.tsx
git commit -m "refactor(os): extract TaskRow into a shared component"
```

---

## Task 7: Navigation — collapse Work to one entry

**Files:**
- Modify: `src/lib/os/nav.ts`

- [ ] **Step 1: Replace the 3 Work entries with 1**

In `src/lib/os/nav.ts`, replace these 3 lines:

```typescript
  { id: "projets", label: "Projets", group: "Work", phase: "B", native: true, href: "/os/projets" },
  { id: "taches", label: "Tâches", group: "Work", phase: "B", native: true, href: "/os/taches" },
  { id: "agenda", label: "Agenda", group: "Work", phase: "B", native: true, href: "/os/agenda" },
```

with:

```typescript
  { id: "work", label: "Work", group: "Work", phase: "B", native: true, href: "/os/work" },
```

- [ ] **Step 2: Typecheck**

Run: `cd "E:/FMRXR/CLAUDE PRO/fmrxr-web" && npx tsc --noEmit`
Expected: no errors (the `id`s "projets"/"taches"/"agenda" aren't referenced elsewhere by string — confirmed by the Task 13 dead-code grep).

- [ ] **Step 3: Commit**

```bash
cd "E:/FMRXR/CLAUDE PRO/fmrxr-web"
git add src/lib/os/nav.ts
git commit -m "feat(os/nav): collapse Projets/Tâches/Agenda into one Work entry"
```

---

## Task 8: `ProjectListRow` component

**Files:**
- Create: `src/components/os/work/ProjectListRow.tsx`

- [ ] **Step 1: Create the component**

```typescript
"use client";

import { daysUntil } from "@/lib/os/compute";
import type { ProjectPulse } from "@/lib/os/compute";
import type { OsClient, OsDeadline, OsProject } from "@/lib/os/types";

const PULSE_DOT: Record<ProjectPulse, string> = {
  hot: "bg-[#ff4d5e] shadow-[0_0_6px_#ff4d5e]",
  warm: "bg-[#d9a441]",
  cold: "bg-fmmuted",
};

const PRIORITY_BADGE: Record<string, string> = {
  critical: "border-[#ff4d5e]/40 text-[#ff4d5e]",
  high: "border-[#d9a441]/40 text-[#d9a441]",
};

interface ProjectListRowProps {
  project: OsProject;
  pulse: ProjectPulse;
  client?: OsClient;
  deadlines: OsDeadline[];
  pinned: boolean;
  now: Date;
  onTogglePin: (id: string) => void;
}

/** Ligne de la liste de gauche du cockpit Work — clic = épingle/désépingle (pas de sélection exclusive). */
export function ProjectListRow({ project, pulse, client, deadlines, pinned, now, onTogglePin }: ProjectListRowProps) {
  const nextDeadline = deadlines
    .filter((d) => d.project === project.id && !d.done)
    .sort((a, b) => Date.parse(a.date) - Date.parse(b.date))[0];
  const days = nextDeadline ? daysUntil(nextDeadline.date, now) : null;

  return (
    <button
      type="button"
      onClick={() => onTogglePin(project.id)}
      className={`flex w-full items-center gap-2 rounded-lg border px-2.5 py-2 text-left transition-colors ${
        pinned ? "border-fmaccent/40 bg-fmmutedbg" : "border-transparent hover:border-fmborder"
      }`}
    >
      <span className={`h-1.5 w-1.5 shrink-0 rounded-full ${PULSE_DOT[pulse]}`} aria-hidden="true" />
      <span className="min-w-0 flex-1">
        <span className="block truncate font-grotesk text-sm font-semibold text-fmfg">{project.name}</span>
        <span className="block truncate font-grotesk text-xs text-fmmuted">
          {project.category || ""}
          {client ? ` · ${client.name}` : ""}
        </span>
      </span>
      {project.priority && PRIORITY_BADGE[project.priority] && (
        <span className={`shrink-0 rounded-full border px-2 py-0.5 font-grotesk text-[9px] uppercase tracking-[0.1em] ${PRIORITY_BADGE[project.priority]}`}>
          {project.priority}
        </span>
      )}
      {days !== null && (
        <span className={`shrink-0 font-mono text-[10px] ${days <= 7 ? "text-[#ff4d5e]" : "text-fmmuted"}`}>J-{days}</span>
      )}
      <span className={`shrink-0 text-xs ${pinned ? "text-fmaccent" : "text-fmmuted"}`}>{pinned ? "📌" : "☆"}</span>
    </button>
  );
}
```

- [ ] **Step 2: Typecheck**

Run: `cd "E:/FMRXR/CLAUDE PRO/fmrxr-web" && npx tsc --noEmit`
Expected: no errors.

- [ ] **Step 3: Commit**

```bash
cd "E:/FMRXR/CLAUDE PRO/fmrxr-web"
git add src/components/os/work/ProjectListRow.tsx
git commit -m "feat(os/work): add ProjectListRow"
```

---

## Task 9: `PinnedProjectCard` component

**Files:**
- Create: `src/components/os/work/PinnedProjectCard.tsx`

- [ ] **Step 1: Create the component**

```typescript
"use client";

import { Section } from "../Section";
import { TaskRow } from "../TaskRow";
import { Badge } from "../Badge";
import { daysUntil } from "@/lib/os/compute";
import type { ProjectPulse } from "@/lib/os/compute";
import type { OsBlocker, OsClient, OsDeadline, OsProject, OsTask } from "@/lib/os/types";

const PULSE_DOT: Record<ProjectPulse, string> = {
  hot: "bg-[#ff4d5e] shadow-[0_0_6px_#ff4d5e]",
  warm: "bg-[#d9a441]",
  cold: "bg-fmmuted",
};

interface PinnedProjectCardProps {
  project: OsProject;
  pulse: ProjectPulse;
  client?: OsClient;
  tasks: OsTask[];
  deadlines: OsDeadline[];
  blockers: OsBlocker[];
  now: Date;
  onUnpin: (id: string) => void;
  onToggleTask: (id: string) => void;
  onDeleteTask: (id: string) => void;
}

/** Carte détail d'un projet épinglé — tâches groupées par epic, blockers, prochaine deadline. */
export function PinnedProjectCard({
  project,
  pulse,
  client,
  tasks,
  deadlines,
  blockers,
  now,
  onUnpin,
  onToggleTask,
  onDeleteTask,
}: PinnedProjectCardProps) {
  const projectTasks = tasks.filter((t) => t.project === project.id);
  const nextDeadline = deadlines
    .filter((d) => d.project === project.id && !d.done)
    .sort((a, b) => Date.parse(a.date) - Date.parse(b.date))[0];
  const days = nextDeadline ? daysUntil(nextDeadline.date, now) : null;
  const openBlockers = blockers.filter((b) => b.project === project.id && !b.resolved);

  const epicNames = Array.from(new Set(projectTasks.filter((t) => t.epic).map((t) => t.epic as string)));
  const generalTasks = projectTasks.filter((t) => !t.epic);

  return (
    <div className="fm-glass-card rounded-2xl border border-fmborder">
      <div className="flex items-center gap-2 border-b border-fmborder bg-fmmutedbg/60 px-4 py-2.5 rounded-t-2xl">
        <span className={`h-1.5 w-1.5 shrink-0 rounded-full ${PULSE_DOT[pulse]}`} aria-hidden="true" />
        <span className="min-w-0 flex-1 truncate font-grotesk text-sm font-semibold text-fmfg">{project.name}</span>
        {days !== null && <span className="shrink-0 font-mono text-[10px] text-fmmuted">J-{days}</span>}
        <button type="button" onClick={() => onUnpin(project.id)} title="Désépingler" className="shrink-0 text-fmmuted hover:text-[#ff4d5e]">
          ✕
        </button>
      </div>
      <div className="px-4 py-3">
        <div className="mb-2 font-grotesk text-xs text-fmmuted">
          {client?.name}
          {project.category ? ` · ${project.category}` : ""}
        </div>

        {openBlockers.length > 0 && (
          <div className="mb-3 flex flex-col gap-1">
            {openBlockers.map((b) => (
              <div key={b.id} className="font-grotesk text-xs text-[#ff4d5e]">
                ⚠ {b.label}
              </div>
            ))}
          </div>
        )}

        {generalTasks.length > 0 && (
          <div>
            {generalTasks.map((t) => (
              <TaskRow key={t.id} task={t} now={now} onToggle={onToggleTask} onDelete={onDeleteTask} />
            ))}
          </div>
        )}

        {epicNames.map((epic) => (
          <Section key={epic} id={`work-pin-${project.id}-${epic}`} title={epic}>
            {projectTasks
              .filter((t) => t.epic === epic)
              .map((t) => (
                <TaskRow key={t.id} task={t} now={now} onToggle={onToggleTask} onDelete={onDeleteTask} />
              ))}
          </Section>
        ))}

        {projectTasks.length === 0 && <p className="font-grotesk text-xs text-fmmuted">Aucune tâche sur ce projet.</p>}

        {project.status === "active" && <Badge tone="default">actif</Badge>}
      </div>
    </div>
  );
}
```

- [ ] **Step 2: Typecheck**

Run: `cd "E:/FMRXR/CLAUDE PRO/fmrxr-web" && npx tsc --noEmit`
Expected: no errors.

- [ ] **Step 3: Commit**

```bash
cd "E:/FMRXR/CLAUDE PRO/fmrxr-web"
git add src/components/os/work/PinnedProjectCard.tsx
git commit -m "feat(os/work): add PinnedProjectCard with epic grouping and blockers"
```

---

## Task 10: `MultiProjectTimeline` component

**Files:**
- Create: `src/components/os/work/MultiProjectTimeline.tsx`

- [ ] **Step 1: Create the component**

Reuses `MiniGantt` per lane (it already renders one project's `GanttItem[]` + shared `nowPct` — exactly what `ganttByProject` produces per lane):

```typescript
"use client";

import { MiniGantt } from "../agenda/MiniGantt";
import type { MultiProjectGantt } from "@/lib/os/compute";
import type { OsProject } from "@/lib/os/types";

interface MultiProjectTimelineProps {
  gantt: MultiProjectGantt;
  projects: OsProject[];
}

/** Bandeau timeline — un couloir MiniGantt par projet actif, alignés sur une frise partagée. */
export function MultiProjectTimeline({ gantt, projects }: MultiProjectTimelineProps) {
  const lanesWithItems = gantt.lanes.filter((l) => l.items.length > 0);
  if (!lanesWithItems.length) {
    return <p className="font-grotesk text-sm text-fmmuted">Aucun jalon daté sur les projets actifs.</p>;
  }
  return (
    <div className="flex flex-col gap-4">
      {lanesWithItems.map((lane) => {
        const project = projects.find((p) => p.id === lane.projectId);
        return (
          <div key={lane.projectId}>
            <div className="mb-1.5 font-grotesk text-[11px] uppercase tracking-[0.12em] text-fmmuted">{project?.name ?? lane.projectId}</div>
            <MiniGantt items={lane.items} nowPct={lane.nowPct} />
          </div>
        );
      })}
    </div>
  );
}
```

- [ ] **Step 2: Typecheck**

Run: `cd "E:/FMRXR/CLAUDE PRO/fmrxr-web" && npx tsc --noEmit`
Expected: no errors.

- [ ] **Step 3: Commit**

```bash
cd "E:/FMRXR/CLAUDE PRO/fmrxr-web"
git add src/components/os/work/MultiProjectTimeline.tsx
git commit -m "feat(os/work): add MultiProjectTimeline (swimlanes over MiniGantt)"
```

---

## Task 11: `SprintBanner` component (with burndown SVG)

**Files:**
- Create: `src/components/os/work/SprintBanner.tsx`

- [ ] **Step 1: Create the component**

```typescript
"use client";

import { Badge } from "../Badge";
import { daysUntil, burndownSeries } from "@/lib/os/compute";
import type { OsSprint, OsTask } from "@/lib/os/types";

interface SprintBannerProps {
  sprint: OsSprint;
  tasks: OsTask[];
  now: Date;
}

const CHART_W = 320;
const CHART_H = 48;

function toPolyline(points: { date: string; value: number }[], maxValue: number): string {
  if (points.length < 2) return "";
  return points
    .map((p, i) => {
      const x = (i / (points.length - 1)) * CHART_W;
      const y = CHART_H - (maxValue ? (p.value / maxValue) * CHART_H : 0);
      return `${x},${y}`;
    })
    .join(" ");
}

/** Bande "Sprint actuel" — objectif, vélocité, jours restants, burndown (idéal vs réel). */
export function SprintBanner({ sprint, tasks, now }: SprintBannerProps) {
  const days = daysUntil(sprint.end, now);
  const series = burndownSeries(sprint, tasks, now);
  const maxValue = Math.max(1, series.ideal[0]?.value ?? 0);

  return (
    <div className="fm-glass-card flex flex-wrap items-center gap-4 rounded-2xl p-4">
      <div className="min-w-0 flex-1">
        <div className="flex items-center gap-2">
          <span className="font-grotesk text-xs uppercase tracking-[0.14em] text-fmmuted">Sprint actuel</span>
          {sprint.velocity && <Badge tone="accent">{sprint.velocity}</Badge>}
          {days !== null && <Badge tone={days < 0 ? "danger" : "default"}>{days < 0 ? "clôture en retard" : `J-${days}`}</Badge>}
        </div>
        <p className="mt-1 truncate font-grotesk text-sm text-fmfg">{sprint.goal}</p>
      </div>
      {series.actual.length >= 2 && (
        <svg width={CHART_W} height={CHART_H} viewBox={`0 0 ${CHART_W} ${CHART_H}`} className="shrink-0">
          <polyline points={toPolyline(series.ideal, maxValue)} fill="none" stroke="var(--color-fmborder)" strokeWidth={1.5} />
          <polyline points={toPolyline(series.actual, maxValue)} fill="none" stroke="var(--color-fmaccent)" strokeWidth={2} />
        </svg>
      )}
    </div>
  );
}
```

- [ ] **Step 2: Typecheck**

Run: `cd "E:/FMRXR/CLAUDE PRO/fmrxr-web" && npx tsc --noEmit`
Expected: no errors.

- [ ] **Step 3: Commit**

```bash
cd "E:/FMRXR/CLAUDE PRO/fmrxr-web"
git add src/components/os/work/SprintBanner.tsx
git commit -m "feat(os/work): add SprintBanner with hand-rolled SVG burndown"
```

---

## Task 12: `app/os/work/page.tsx` — the cockpit page

**Files:**
- Create: `src/app/os/work/page.tsx`

- [ ] **Step 1: Create the page**

```typescript
"use client";

import { useEffect, useMemo, useState } from "react";
import { useOs } from "@/lib/os/store";
import { activeSprint, daysUntil, ganttByProject, projectPulse } from "@/lib/os/compute";
import type { ProjectPulse } from "@/lib/os/compute";
import type { ProjectStatus } from "@/lib/os/types";
import { NewTaskForm, buildTaskTargets } from "@/components/os/taches/NewTaskForm";
import { ProjectFilterBar } from "@/components/os/projets/ProjectFilterBar";
import { ProjectListRow } from "@/components/os/work/ProjectListRow";
import { PinnedProjectCard } from "@/components/os/work/PinnedProjectCard";
import { MultiProjectTimeline } from "@/components/os/work/MultiProjectTimeline";
import { SprintBanner } from "@/components/os/work/SprintBanner";

const PIN_STORAGE_KEY = "fmrxr-os-work-pinned";
const PULSE_ORDER: Record<ProjectPulse, number> = { hot: 0, warm: 1, cold: 2 };

function readPinned(): string[] {
  try {
    const raw = localStorage.getItem(PIN_STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

function writePinned(ids: string[]) {
  try {
    localStorage.setItem(PIN_STORAGE_KEY, JSON.stringify(ids));
  } catch {
    // localStorage indisponible — la préférence ne persiste juste pas
  }
}

function slugify(s: string): string {
  return s.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "").slice(0, 40);
}

export default function WorkPage() {
  const { graph, loading, error, mutate, logChange } = useOs();
  const [query, setQuery] = useState("");
  const [identityFilter, setIdentityFilter] = useState("");
  const [statusFilter, setStatusFilter] = useState<ProjectStatus>("active");
  const [pinned, setPinned] = useState<string[]>([]);
  const [pinnedInitialized, setPinnedInitialized] = useState(false);
  const [creating, setCreating] = useState(false);
  const [name, setName] = useState("");

  const now = useMemo(() => new Date(), []);

  useEffect(() => {
    const saved = readPinned();
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setPinned(saved);
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setPinnedInitialized(true);
  }, []);

  // Pré-épingle les 2 projets les plus "hot" au tout premier chargement (aucune préférence sauvegardée).
  useEffect(() => {
    if (!pinnedInitialized || !graph || readPinned().length > 0) return;
    const hottest = graph.projects
      .filter((p) => p.status === "active")
      .map((p) => ({ p, pulse: projectPulse(p, graph.deadlines, graph.blockers ?? [], now) }))
      .filter((x) => x.pulse === "hot")
      .slice(0, 2)
      .map((x) => x.p.id);
    if (hottest.length) {
      setPinned(hottest);
      writePinned(hottest);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pinnedInitialized, graph]);

  useEffect(() => {
    function onKeydown(e: KeyboardEvent) {
      const target = e.target as HTMLElement;
      if (target.tagName === "INPUT" || target.tagName === "TEXTAREA" || target.isContentEditable) return;
      if (e.key === "n" || e.key === "t") {
        e.preventDefault();
        document.getElementById("work-new-task-label")?.focus();
      }
    }
    window.addEventListener("keydown", onKeydown);
    return () => window.removeEventListener("keydown", onKeydown);
  }, []);

  if (loading) return <p className="fm-rise font-grotesk text-sm text-fmmuted">Chargement du graphe…</p>;
  if (error && !graph) return <p className="fm-rise font-grotesk text-sm text-[#ff4d5e]">{error}</p>;
  if (!graph) return null;

  function togglePin(id: string) {
    setPinned((prev) => {
      const next = prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id];
      writePinned(next);
      return next;
    });
  }

  const filtered = graph.projects.filter((p) => {
    if (p.status !== statusFilter) return false;
    if (identityFilter && !(p.identity || []).includes(identityFilter)) return false;
    if (!query) return true;
    const c = graph.clients?.find((x) => x.id === p.client);
    return `${p.name} ${p.category || ""} ${c?.name || ""}`.toLowerCase().includes(query);
  });

  function nearestDeadlineDays(p: (typeof filtered)[number]): number {
    const days = graph!.deadlines
      .filter((d) => d.project === p.id && !d.done)
      .map((d) => daysUntil(d.date, now))
      .filter((n): n is number => n !== null && n >= 0);
    return days.length ? Math.min(...days) : Infinity;
  }

  const sorted = [...filtered].sort((a, b) => {
    const pa = projectPulse(a, graph.deadlines, graph.blockers ?? [], now);
    const pb = projectPulse(b, graph.deadlines, graph.blockers ?? [], now);
    if (PULSE_ORDER[pa] !== PULSE_ORDER[pb]) return PULSE_ORDER[pa] - PULSE_ORDER[pb];
    const diff = nearestDeadlineDays(a) - nearestDeadlineDays(b);
    if (diff !== 0) return diff;
    return a.name.localeCompare(b.name);
  });

  const activeProjectIds = graph.projects.filter((p) => p.status === "active").map((p) => p.id);
  const gantt = ganttByProject(graph.deadlines, graph.tasks, activeProjectIds, now);
  const sprint = activeSprint(graph.sprints ?? [], now);

  function toggleTask(id: string) {
    const before = graph!.tasks.find((x) => x.id === id);
    if (!before) return;
    const nowDone = !before.done;
    mutate((draft) => {
      const t = draft.tasks.find((x) => x.id === id);
      if (t) {
        t.done = nowDone;
        t.completedAt = nowDone ? new Date().toISOString() : undefined;
      }
    });
    logChange("update", id, `tâche ${nowDone ? "✓ faite" : "réouverte"} : ${before.label}`, {
      entityType: "task",
      snapshot: { before, after: { ...before, done: nowDone } },
    });
  }

  function deleteTask(id: string) {
    const t = graph!.tasks.find((x) => x.id === id);
    if (!t) return;
    if (!confirm(`Supprimer la tâche « ${t.label} » ?`)) return;
    mutate((draft) => {
      draft.trash = draft.trash || [];
      draft.trash.unshift({ ts: new Date().toISOString(), kind: "task", data: t });
      draft.tasks = draft.tasks.filter((x) => x.id !== id);
    });
    logChange("delete", id, `tâche supprimée (→ corbeille) : ${t.label}`, { entityType: "task", snapshot: t });
  }

  function addTask(label: string, project: string, owner: string, due: string) {
    let id = `t-${slugify(label)}`;
    let i = 2;
    while (graph!.tasks.find((t) => t.id === id)) id = `t-${slugify(label).slice(0, 30)}-${i++}`;
    const created = { id, label, done: false, ...(project ? { project } : {}), ...(owner ? { owner } : {}), ...(due ? { due } : {}) };
    mutate((draft) => {
      draft.tasks.push(created);
    });
    logChange("create", id, `nouvelle tâche : ${label}`, { entityType: "task", snapshot: created });
  }

  function markDelivered(projectId: string) {
    const before = graph!.projects.find((x) => x.id === projectId);
    if (!before || before.status === "delivered") return;
    mutate((draft) => {
      const p = draft.projects.find((x) => x.id === projectId);
      if (p) p.status = "delivered";
    });
    logChange("update", projectId, `${before.name} : status ${before.status} → delivered`, {
      entityType: "project",
      snapshot: { before, after: { ...before, status: "delivered" } },
    });
    togglePin(projectId); // un projet livré ne reste pas épinglé dans la vue "Actif"
  }

  function createProject() {
    if (!name.trim()) return;
    const id = `proj-${slugify(name)}-${Date.now().toString(36)}`;
    mutate((draft) => {
      draft.projects.push({ id, name: name.trim(), type: "project", status: "active", identity: [] });
    });
    logChange("create", id, `nouveau projet : ${name.trim()}`, { entityType: "project" });
    setName("");
    setCreating(false);
  }

  return (
    <div className="fm-rise flex flex-col gap-4">
      {sprint && <SprintBanner sprint={sprint} tasks={graph.tasks} now={now} />}

      <MultiProjectTimeline gantt={gantt} projects={graph.projects} />

      <ProjectFilterBar
        identities={graph.identities}
        query={query}
        onQueryChange={setQuery}
        identityFilter={identityFilter}
        onIdentityFilterChange={setIdentityFilter}
        onNewProject={() => setCreating((c) => !c)}
      />

      <div className="flex gap-2">
        {(["active", "delivered", "archived"] as ProjectStatus[]).map((s) => (
          <button
            key={s}
            type="button"
            onClick={() => setStatusFilter(s)}
            className={`rounded-full border px-3 py-1 font-grotesk text-xs ${statusFilter === s ? "border-fmaccent/50 text-fmaccent" : "border-fmborder text-fmmuted"}`}
          >
            {s === "active" ? "Actif" : s === "delivered" ? "Livrés" : "Archives"}
          </button>
        ))}
      </div>

      {creating && (
        <div className="fm-glass-card flex items-center gap-2 rounded-2xl p-4">
          <input
            className="min-w-[200px] flex-1 rounded border border-fmborder bg-fmmutedbg px-3 py-1.5 font-grotesk text-sm text-fmfg"
            placeholder="Nom du projet"
            value={name}
            autoFocus
            onChange={(e) => setName(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && createProject()}
          />
          <button type="button" className="fm-link font-grotesk text-sm text-fmaccent" onClick={createProject}>
            Créer
          </button>
        </div>
      )}

      <NewTaskForm targets={buildTaskTargets(graph)} onAdd={addTask} />

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.3fr)]">
        <div className="flex flex-col gap-1.5">
          {sorted.map((p) => (
            <ProjectListRow
              key={p.id}
              project={p}
              pulse={projectPulse(p, graph.deadlines, graph.blockers ?? [], now)}
              client={graph.clients?.find((c) => c.id === p.client)}
              deadlines={graph.deadlines}
              pinned={pinned.includes(p.id)}
              now={now}
              onTogglePin={togglePin}
            />
          ))}
        </div>
        <div className="flex flex-col gap-3">
          {pinned
            .map((id) => graph.projects.find((p) => p.id === id))
            .filter((p): p is NonNullable<typeof p> => !!p)
            .map((p) => (
              <PinnedProjectCard
                key={p.id}
                project={p}
                pulse={projectPulse(p, graph.deadlines, graph.blockers ?? [], now)}
                client={graph.clients?.find((c) => c.id === p.client)}
                tasks={graph.tasks}
                deadlines={graph.deadlines}
                blockers={graph.blockers ?? []}
                now={now}
                onUnpin={togglePin}
                onToggleTask={toggleTask}
                onDeleteTask={deleteTask}
              />
            ))}
          {pinned.length === 0 && <p className="font-grotesk text-sm text-fmmuted">Clique un projet à gauche pour l&apos;épingler ici.</p>}
        </div>
      </div>
      {/* markDelivered et un input#work-new-task-label sont utilisés par PinnedProjectCard / le raccourci clavier —
          câblés au Task 13 une fois NewTaskForm ajusté pour exposer un id sur son champ libellé. */}
      <button type="button" className="hidden" onClick={() => markDelivered("")} aria-hidden="true" />
    </div>
  );
}
```

- [ ] **Step 2: Wire the keyboard-shortcut target id into `NewTaskForm`**

The `n`/`t` shortcut in `page.tsx` focuses `#work-new-task-label`, but `NewTaskForm`'s label `<input>` has no `id`. In `src/components/os/taches/NewTaskForm.tsx`, add `id="work-new-task-label"` to the first `<input>` (the "Quoi faire…" field):

```typescript
<input
  id="work-new-task-label"
  className="min-w-[200px] flex-[2] rounded border border-fmborder bg-fmmutedbg px-3 py-1.5 font-grotesk text-sm text-fmfg"
  placeholder="Quoi faire…"
  value={label}
  onChange={(e) => setLabel(e.target.value)}
  onKeyDown={(e) => e.key === "Enter" && submit()}
/>
```

(This `id` is also used by `app/os/taches/page.tsx` today, but that page is deleted in Task 13, so no collision.)

- [ ] **Step 3: Remove the placeholder `markDelivered` button and wire it into `PinnedProjectCard`**

Replace the last line of `page.tsx` (`<button type="button" className="hidden" ...`) — delete it entirely — and instead pass `onMarkDelivered={markDelivered}` as a new prop to `PinnedProjectCard` in the JSX above. Then in `src/components/os/work/PinnedProjectCard.tsx`: remove the now-unused `import { Badge } from "../Badge";` line, update `PinnedProjectCardProps` to accept `onMarkDelivered: (id: string) => void`, and replace the closing `{project.status === "active" && <Badge tone="default">actif</Badge>}` line with:

```typescript
{project.status === "active" && (
  <button
    type="button"
    onClick={() => onMarkDelivered(project.id)}
    className="mt-2 rounded border border-fmborder px-2.5 py-1 font-grotesk text-[11px] text-fmmuted hover:border-fmaccent/40 hover:text-fmaccent"
  >
    ✓ Marquer livré
  </button>
)}
```

And in `page.tsx`, add `onMarkDelivered={markDelivered}` to the `<PinnedProjectCard ... />` call.

- [ ] **Step 4: Typecheck**

Run: `cd "E:/FMRXR/CLAUDE PRO/fmrxr-web" && npx tsc --noEmit`
Expected: no errors.

- [ ] **Step 5: Commit**

```bash
cd "E:/FMRXR/CLAUDE PRO/fmrxr-web"
git add src/app/os/work/page.tsx src/components/os/taches/NewTaskForm.tsx src/components/os/work/PinnedProjectCard.tsx
git commit -m "feat(os/work): add the Work cockpit page"
```

---

## Task 13: Redirect old routes, delete orphaned components

**Files:**
- Modify: `src/app/os/projets/page.tsx`, `src/app/os/taches/page.tsx`, `src/app/os/agenda/page.tsx`
- Delete: `src/components/os/projets/KanbanBoard.tsx`, `src/components/os/projets/ProjectCard.tsx`, `src/components/os/taches/TaskGroupList.tsx`, `src/components/os/agenda/DeadlineTimeline.tsx`, `src/components/os/agenda/AgendaOverview.tsx`

- [ ] **Step 1: Confirm nothing else imports the components about to be deleted**

Run: `cd "E:/FMRXR/CLAUDE PRO/fmrxr-web" && grep -rln "KanbanBoard\|ProjectCard\|TaskGroupList\|DeadlineTimeline\|AgendaOverview" src --include=*.tsx --include=*.ts`
Expected: only the 3 old page files (`projets/page.tsx`, `taches/page.tsx`, `agenda/page.tsx`) and the component files themselves. If anything else shows up, stop and re-check the plan before deleting.

- [ ] **Step 2: Replace the 3 old pages with redirects**

Replace the full contents of `src/app/os/projets/page.tsx` with:

```typescript
import { redirect } from "next/navigation";

export default function ProjetsRedirect() {
  redirect("/os/work");
}
```

Replace the full contents of `src/app/os/taches/page.tsx` with:

```typescript
import { redirect } from "next/navigation";

export default function TachesRedirect() {
  redirect("/os/work");
}
```

Replace the full contents of `src/app/os/agenda/page.tsx` with:

```typescript
import { redirect } from "next/navigation";

export default function AgendaRedirect() {
  redirect("/os/work");
}
```

- [ ] **Step 3: Delete the orphaned components**

```bash
cd "E:/FMRXR/CLAUDE PRO/fmrxr-web"
git rm src/components/os/projets/KanbanBoard.tsx src/components/os/projets/ProjectCard.tsx src/components/os/taches/TaskGroupList.tsx src/components/os/agenda/DeadlineTimeline.tsx src/components/os/agenda/AgendaOverview.tsx
```

Note: `ProjectFilterBar.tsx`, `NewTaskForm.tsx`, `TaskStatsRow.tsx`, and `MiniGantt.tsx` are **not** deleted — they're reused by the new `/os/work` page (or, for `TaskStatsRow`, kept for a future task since it isn't wired into `page.tsx` yet in this plan — see "Follow-ups" below).

- [ ] **Step 4: Typecheck and build**

Run: `cd "E:/FMRXR/CLAUDE PRO/fmrxr-web" && npx tsc --noEmit && npx next build`
Expected: both succeed with no errors (the redirects mean the old routes still resolve, so no 404s for any bookmarked links).

- [ ] **Step 5: Commit**

```bash
cd "E:/FMRXR/CLAUDE PRO/fmrxr-web"
git add src/app/os/projets/page.tsx src/app/os/taches/page.tsx src/app/os/agenda/page.tsx
git commit -m "refactor(os): redirect Projets/Tâches/Agenda to /os/work, delete orphaned components"
```

---

## Task 14: Manual verification in the browser

**Files:** none (verification only)

- [ ] **Step 1: Start the dev server**

Run: `cd "E:/FMRXR/CLAUDE PRO/fmrxr-web" && npm run dev`

- [ ] **Step 2: Log in and open the cockpit**

Navigate to `http://localhost:3000/os/work` (log in with the admin account if prompted). Confirm:
- The nav sidebar shows one "Work" entry (not three).
- `/os/projets`, `/os/taches`, `/os/agenda` redirect to `/os/work`.

- [ ] **Step 3: Verify the sprint banner and burndown**

If `graph.sprints` has an entry with `status: "active"` (or a non-completed one), confirm the banner shows its goal, velocity, days remaining, and a 2-line SVG chart. If there's no active/non-completed sprint, confirm the banner is simply absent (no broken layout).

- [ ] **Step 4: Verify the multi-project timeline**

Confirm one lane per active project with dated milestones, all sharing the same "Aujourd'hui" marker position.

- [ ] **Step 5: Verify pinning**

Click 2-3 projects in the left list — confirm each becomes `📌` and a card appears on the right, and that they **all stay visible simultaneously** (this is the core fix for "plusieurs projets ouverts en même temps"). Click ✕ on a card — confirm it disappears from the right and reverts to `☆` on the left. Reload the page — confirm the same projects stay pinned (localStorage persistence).

- [ ] **Step 6: Verify task interactions from within a pinned card**

Check a task off from inside a pinned card — confirm it strikes through and (per Task 1) gets a `completedAt` (verify via the Network tab / the saved `os_graph` row, or by checking the task in Supabase after a save). Add a new task via the bottom form, targeting a pinned project — confirm it appears in that project's card.

- [ ] **Step 7: Verify epics grouping**

Manually set `epic: "Test epic"` on 2 tasks of a pinned project (via `mutate` in the browser console, or by editing one task through the form once an epic input exists — if Task 12 didn't add an epic input to `NewTaskForm`, this step just confirms grouping renders correctly for tasks that already have `epic` set some other way, e.g. seeded directly in Supabase). Confirm those 2 tasks render under a collapsible "Test epic" section instead of the flat list.

- [ ] **Step 8: Verify "marquer livré"**

Click "✓ Marquer livré" on a pinned active project — confirm it disappears from the "Actif" filter, unpins itself, and reappears when switching the status filter to "Livrés".

- [ ] **Step 9: Run the full test suite one more time**

Run: `cd "E:/FMRXR/CLAUDE PRO/fmrxr-web" && npx vitest run`
Expected: all tests pass.

---

## Follow-ups (explicitly not in this plan)

- `TaskStatsRow` (open/late/done/EXPLAB counts) isn't wired into `/os/work` — either add it as a small stats row at the top of the page, or confirm with Haïfa it's not missed before deleting it too.
- No dedicated UI to *set* `epic` on a task yet (Task 12 doesn't add an epic input to `NewTaskForm`) — tasks only pick up `epic` if set directly in Supabase/the legacy monolith. Add an epic text input (with autocomplete over existing epics in the current project) as a fast follow-up once the base cockpit is validated.
