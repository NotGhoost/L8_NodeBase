import fs from 'fs';
import fsp from 'fs/promises';
import path from 'path';

const ALLOWED_EXTS = new Set(['.txt', '.json', '.rtf']);
const SERVICE_NAMES = new Set([
  'node_modules', '.git', '.github', '.gitignore',
  '.env', 'package.json', 'package-lock.json'
]);

function ensureAllowedExt(filePath) {
  const ext = path.extname(filePath).toLowerCase();
  if (!ALLOWED_EXTS.has(ext)) {
    throw new Error(`Disallowed extension: ${ext}. Allowed: ${[...ALLOWED_EXTS].join(', ')}`);
  }
}

export function writeFileSync(filePath, data) {
  ensureAllowedExt(filePath);
  fs.mkdirSync(path.dirname(filePath), { recursive: true });
  fs.writeFileSync(filePath, String(data), { encoding: 'utf8' });
}

export function readFileSync(filePath) {
  ensureAllowedExt(filePath);
  return fs.readFileSync(filePath, { encoding: 'utf8' });
}

export function replaceFileContentSync(filePath, data) {
  ensureAllowedExt(filePath);
  fs.mkdirSync(path.dirname(filePath), { recursive: true });
  fs.writeFileSync(filePath, '', { encoding: 'utf8' });
  fs.writeFileSync(filePath, String(data), { encoding: 'utf8' });
}

export function clearFileSync(filePath) {
  ensureAllowedExt(filePath);
  fs.writeFileSync(filePath, '', { encoding: 'utf8' });
}

export function removeNoiseSync(filePath) {
  ensureAllowedExt(filePath);
  const content = fs.readFileSync(filePath, { encoding: 'utf8' });
  const cleaned = content.replace(/\d+/g, '').toLowerCase();
  fs.writeFileSync(filePath, cleaned, { encoding: 'utf8' });
}

export function copyFileSync(srcPath, destPath) {
  ensureAllowedExt(srcPath);
  ensureAllowedExt(destPath);
  fs.mkdirSync(path.dirname(destPath), { recursive: true });
  fs.copyFileSync(srcPath, destPath);
}

export function createFolderSync(dirPath) {
  fs.mkdirSync(dirPath, { recursive: true });
}

export function deleteFolderSync(dirPath) {
  fs.rmSync(dirPath, { recursive: true, force: true });
}

export function listProjectFilesSync(rootDir = process.cwd()) {
  const results = [];
  function walk(current) {
    const items = fs.readdirSync(current, { withFileTypes: true });
    for (const item of items) {
      const full = path.join(current, item.name);
      if (SERVICE_NAMES.has(item.name)) continue;
      if (item.isDirectory()) {
        walk(full);
      } else {
        results.push(full);
      }
    }
  }
  walk(rootDir);
  return results;
}

export function purgeProjectSync(rootDir = process.cwd()) {
  const items = fs.readdirSync(rootDir, { withFileTypes: true });
  for (const item of items) {
    if (SERVICE_NAMES.has(item.name)) continue;
    const full = path.join(rootDir, item.name);
    fs.rmSync(full, { recursive: true, force: true });
  }
}

export async function writeFile(filePath, data) {
  ensureAllowedExt(filePath);
  await fsp.mkdir(path.dirname(filePath), { recursive: true });
  await fsp.writeFile(filePath, String(data), 'utf8');
}

export async function readFile(filePath) {
  ensureAllowedExt(filePath);
  return fsp.readFile(filePath, 'utf8');
}

export async function replaceFileContent(filePath, data) {
  ensureAllowedExt(filePath);
  await fsp.mkdir(path.dirname(filePath), { recursive: true });
  await fsp.writeFile(filePath, '', 'utf8');
  await fsp.writeFile(filePath, String(data), 'utf8');
}

export async function clearFile(filePath) {
  ensureAllowedExt(filePath);
  await fsp.writeFile(filePath, '', 'utf8');
}

export async function removeNoise(filePath) {
  ensureAllowedExt(filePath);
  const content = await fsp.readFile(filePath, 'utf8');
  const cleaned = content.replace(/\d+/g, '').toLowerCase();
  await fsp.writeFile(filePath, cleaned, 'utf8');
}

export async function copyFile(srcPath, destPath) {
  ensureAllowedExt(srcPath);
  ensureAllowedExt(destPath);
  await fsp.mkdir(path.dirname(destPath), { recursive: true });
  await fsp.copyFile(srcPath, destPath);
}

export async function createFolder(dirPath) {
  await fsp.mkdir(dirPath, { recursive: true });
}

export async function deleteFolder(dirPath) {
  await fsp.rm(dirPath, { recursive: true, force: true });
}

export async function listProjectFiles(rootDir = process.cwd()) {
  const results = [];
  async function walk(current) {
    const items = await fsp.readdir(current, { withFileTypes: true });
    for (const item of items) {
      const full = path.join(current, item.name);
      if (SERVICE_NAMES.has(item.name)) continue;
      if (item.isDirectory()) {
        await walk(full);
      } else {
        results.push(full);
      }
    }
  }
  await walk(rootDir);
  return results;
}

export async function purgeProject(rootDir = process.cwd()) {
  const items = await fsp.readdir(rootDir, { withFileTypes: true });
  await Promise.all(items.map(async item => {
    if (SERVICE_NAMES.has(item.name)) return;
    const full = path.join(rootDir, item.name);
    await fsp.rm(full, { recursive: true, force: true });
  }));
}
