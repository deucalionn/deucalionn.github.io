import fs from 'node:fs';
import path from 'node:path';
import matter from 'gray-matter';

function walkMdFiles(dir, files = []) {
  if (!fs.existsSync(dir)) return files;
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) walkMdFiles(full, files);
    else if (entry.name.endsWith('.md')) files.push(full);
  }
  return files;
}

/**
 * @returns {Map<string, { permalink: string, title: string, type: string }>}
 */
export function buildLinkIndex(contentRoot) {
  const absRoot = path.resolve(contentRoot);
  const index = new Map();

  for (const filePath of walkMdFiles(absRoot)) {
    const raw = fs.readFileSync(filePath, 'utf8');
    const { data } = matter(raw);
    if (!data.permalink) continue;

    const permalink = String(data.permalink).replace(/\/+$/, '') || '/';
    const meta = {
      permalink: permalink === '/' ? '/' : `${permalink}/`,
      title: data.title ?? path.basename(filePath, '.md'),
      type: data.type ?? 'post',
    };

    index.set(path.resolve(filePath), meta);

    const rel = path.relative(absRoot, filePath).replace(/\\/g, '/');
    index.set(rel, meta);
    index.set(`/${rel}`, meta);
  }

  return index;
}

/**
 * @param {string} linkUrl
 * @param {string} filePath absolute path of current markdown file
 * @param {string} contentRoot
 * @param {ReturnType<typeof buildLinkIndex>} index
 */
export function resolveMdLink(linkUrl, filePath, contentRoot, index) {
  if (!linkUrl.endsWith('.md') || !index) return null;

  const absRoot = path.resolve(contentRoot);
  const fileDir = path.dirname(filePath);
  const basename = path.basename(linkUrl);

  const candidates = [
    path.resolve(fileDir, linkUrl),
    path.resolve(fileDir, linkUrl.replace(/^\.\.\//, '')),
    path.resolve(fileDir, 'sources', basename),
    path.resolve(absRoot, linkUrl.replace(/^(\.\.\/)+/, '')),
    path.resolve(absRoot, linkUrl),
  ];

  for (const candidate of candidates) {
    const hit = index.get(candidate);
    if (hit) return hit.permalink;
  }

  const rel = linkUrl.replace(/^(\.\.\/)+/, '');
  const relHit = index.get(rel);
  if (relHit) return relHit.permalink;

  const bundleRel = path
    .relative(absRoot, path.resolve(fileDir, 'sources', basename))
    .replace(/\\/g, '/');
  const bundleHit = index.get(bundleRel);
  if (bundleHit) return bundleHit.permalink;

  return null;
}
