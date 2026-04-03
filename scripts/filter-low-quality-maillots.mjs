import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { imageSize } from "image-size";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const repoRoot = path.resolve(__dirname, "..");
const maillotsDir = path.join(repoRoot, "public", "maillots");

// Heuristique "qualité" simple (ajustable)
const MIN_WIDTH = Number(process.env.MIN_WIDTH ?? 500);
const MIN_HEIGHT = Number(process.env.MIN_HEIGHT ?? 500);
const MIN_BYTES = Number(process.env.MIN_BYTES ?? 30_000); // 30KB

function isImageFile(name) {
  return /\.(jpe?g|png|webp|avif)$/i.test(name);
}

function safeStat(p) {
  try {
    return fs.statSync(p);
  } catch {
    return null;
  }
}

function getImageMeta(p) {
  try {
    const buf = fs.readFileSync(p);
    const { width, height, type } = imageSize(buf);
    const st = safeStat(p);
    return {
      width: typeof width === "number" ? width : 0,
      height: typeof height === "number" ? height : 0,
      bytes: st?.size ?? 0,
      type: type ?? "unknown",
    };
  } catch {
    return { width: 0, height: 0, bytes: 0, type: "unknown" };
  }
}

function listFolders(dir) {
  return fs
    .readdirSync(dir, { withFileTypes: true })
    .filter((d) => d.isDirectory())
    .map((d) => d.name);
}

function score(meta) {
  // Score grossier: on favorise résolution, puis poids
  return meta.width * meta.height + Math.min(meta.bytes, 2_000_000);
}

function main() {
  if (!fs.existsSync(maillotsDir)) {
    console.error(`Dossier introuvable: ${maillotsDir}`);
    process.exit(1);
  }

  const folders = listFolders(maillotsDir);
  const toDelete = [];
  const kept = [];

  for (const folder of folders) {
    const folderPath = path.join(maillotsDir, folder);
    const files = fs.readdirSync(folderPath).filter(isImageFile);
    if (files.length === 0) {
      toDelete.push({ folder, reason: "no_images" });
      continue;
    }

    // Prend la "meilleure" image du dossier comme référence
    let best = null;
    let bestFile = null;
    for (const f of files) {
      const p = path.join(folderPath, f);
      const meta = getImageMeta(p);
      if (!best || score(meta) > score(best)) {
        best = meta;
        bestFile = f;
      }
    }

    const ok =
      (best?.width ?? 0) >= MIN_WIDTH &&
      (best?.height ?? 0) >= MIN_HEIGHT &&
      (best?.bytes ?? 0) >= MIN_BYTES;

    if (!ok) {
      toDelete.push({
        folder,
        reason: `low_quality(best=${bestFile}, ${best?.width}x${best?.height}, ${best?.bytes}b)`,
      });
    } else {
      kept.push({ folder, bestFile, best });
    }
  }

  const report = {
    thresholds: { MIN_WIDTH, MIN_HEIGHT, MIN_BYTES },
    totalFolders: folders.length,
    keptFolders: kept.length,
    deletedFolders: toDelete.length,
    deleted: toDelete,
  };

  const outPath = path.join(repoRoot, "scripts", "filter-low-quality-report.json");
  fs.writeFileSync(outPath, JSON.stringify(report, null, 2));

  // Écrit aussi une liste des dossiers à supprimer (1 par ligne) pour exécution shell
  const listPath = path.join(repoRoot, "scripts", "folders-to-delete.txt");
  fs.writeFileSync(listPath, toDelete.map((x) => x.folder).join("\n") + "\n");

  console.log(
    `OK. kept=${kept.length} delete=${toDelete.length} report=${path.relative(
      repoRoot,
      outPath
    )}`
  );
}

main();

