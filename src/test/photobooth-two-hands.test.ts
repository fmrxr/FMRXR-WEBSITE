import { describe, it, expect } from "vitest";
import { decideFromHands, type Point } from "@/lib/photobooth/gestures";
import hands from "./fixtures/hands.json";

// Deux mains suivies : on retient celle qui fait le geste (vraies mains MediaPipe).
const lm = hands.landmarks as Record<string, Point[]>;
// Meme main decalee dans l'image (y + dy), pour simuler une main haute ou basse.
const shift = (pts: Point[], dy: number) => pts.map((p) => ({ ...p, y: p.y + dy }));

describe("plusieurs mains", () => {
  it("main baissee sans geste + main levee qui fait le geste : le geste gagne", () => {
    const r = decideFromHands(
      [[{ categoryName: "None", score: 0.9 }], [{ categoryName: "Open_Palm", score: 0.8 }]],
      [shift(lm.pointing_up, 0.4), shift(lm.open_palm, -0.2)],
    );
    expect(r).toEqual({ gesture: "open_palm", hand: true, index: 1 });
  });
  it("le geste est trouve quel que soit l'ordre des mains", () => {
    const r = decideFromHands(
      [[{ categoryName: "Thumb_Up", score: 0.85 }], [{ categoryName: "None", score: 0.95 }]],
      [lm.thumb_up, lm.pointing_up],
    );
    expect(r.gesture).toBe("thumb_up");
    expect(r.index).toBe(0);
  });
  it("deux gestes a egalite : la main la plus haute", () => {
    const r = decideFromHands(
      [[{ categoryName: "Closed_Fist", score: 0.8 }], [{ categoryName: "Victory", score: 0.82 }]],
      [shift(lm.fist, 0.3), shift(lm.victory, -0.1)],
    );
    expect(r.gesture).toBe("peace");
  });
  it("une main sans geste : main vue, aucun geste", () => {
    expect(decideFromHands([[{ categoryName: "None", score: 0.9 }]], [lm.pointing_up])).toEqual({ gesture: null, hand: true, index: 0 });
  });
  it("aucune main", () => {
    expect(decideFromHands([], [])).toEqual({ gesture: null, hand: false, index: -1 });
  });
});
