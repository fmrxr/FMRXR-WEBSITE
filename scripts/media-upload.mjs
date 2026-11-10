// Envoie un fichier dans le bucket public « media » de Supabase.
//
//   node scripts/media-upload.mjs <fichier> [nom-dans-le-bucket] [...]
//
// Les vidéos et les affiches du site ne vivent pas dans le dépôt : elles
// sont servies depuis ce bucket (voir MEDIA dans src/lib/service-films.ts).
// Un MP4 de 25 Mo dans git alourdirait chaque clone pour toujours.
//
// La clé service-role est lue dans .env.local et n'est jamais affichée.

import { readFile } from "node:fs/promises";
import { basename, extname } from "node:path";

const BUCKET = "media";
const TYPES = {
  ".mp4": "video/mp4", ".webm": "video/webm", ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg", ".png": "image/png", ".webp": "image/webp",
};

const env = Object.fromEntries(
  (await readFile(new URL("../.env.local", import.meta.url), "utf8"))
    .split("\n")
    .map((l) => l.match(/^\s*([A-Z0-9_]+)\s*=\s*(.*)$/))
    .filter(Boolean)
    .map(([, k, v]) => [k, v.trim().replace(/^["']|["']$/g, "")]),
);

const SUPA = env.NEXT_PUBLIC_SUPABASE_URL;
const KEY = env.SUPABASE_SERVICE_ROLE_KEY || env.SUPABASE_SERVICE_ROLE;
if (!SUPA || !KEY) {
  console.error("NEXT_PUBLIC_SUPABASE_URL ou la clé service-role manque dans .env.local");
  process.exit(1);
}

const args = process.argv.slice(2);
if (!args.length) {
  console.error("usage : node scripts/media-upload.mjs <fichier> [nom] [<fichier> [nom]...]");
  console.error("        node scripts/media-upload.mjs --rm <nom> [...]   retire du bucket");
  process.exit(1);
}

// --rm retire des fichiers du bucket, pour ne pas y laisser trainer les
// versions remplacees.
if (args[0] === "--rm") {
  for (const name of args.slice(1)) {
    const res = await fetch(`${SUPA}/storage/v1/object/${BUCKET}/${encodeURIComponent(name)}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${KEY}` },
    });
    console.log(`${res.ok ? "RETIRE" : "ECHEC " + res.status} ${name}`);
  }
  process.exit(0);
}

// Chaque argument est un fichier ; s'il est suivi d'un nom sans séparateur
// de chemin et sans extension connue, ce nom est celui du bucket.
const jobs = [];
for (let i = 0; i < args.length; i++) {
  const file = args[i];
  const next = args[i + 1];
  const named = next && !next.includes("/") && !next.includes("\\") && TYPES[extname(next)];
  jobs.push({ file, name: named ? next : basename(file) });
  if (named) i++;
}

for (const { file, name } of jobs) {
  const body = await readFile(file);
  const type = TYPES[extname(name).toLowerCase()];
  if (!type) { console.error(`type inconnu pour ${name}`); process.exit(1); }

  const res = await fetch(`${SUPA}/storage/v1/object/${BUCKET}/${encodeURIComponent(name)}`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${KEY}`,
      "Content-Type": type,
      // Remplace le fichier s'il existe déjà, pour pouvoir republier.
      "x-upsert": "true",
    },
    body,
  });
  if (!res.ok) {
    console.error(`ECHEC ${name} : ${res.status} ${(await res.text()).slice(0, 200)}`);
    process.exit(1);
  }
  const mo = (body.length / 1048576).toFixed(1);
  console.log(`OK ${name} · ${mo} Mo · ${SUPA}/storage/v1/object/public/${BUCKET}/${name}`);
}
