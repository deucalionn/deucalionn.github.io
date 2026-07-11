import path from 'node:path';
import { visit } from 'unist-util-visit';
import { buildLinkIndex, resolveMdLink } from '../lib/build-link-index.mjs';

export function remarkResolveLinks({ contentRoot }) {
  const absContentRoot = path.resolve(contentRoot);

  return (tree, file) => {
    if (!file?.path || !absContentRoot) return;

    // Rebuilt on each render so dev picks up permalink / file changes without restart.
    let index;
    try {
      index = buildLinkIndex(absContentRoot);
    } catch {
      return;
    }

    visit(tree, 'link', (node) => {
      const resolved = resolveMdLink(node.url, file.path, absContentRoot, index);
      if (resolved) node.url = resolved;
    });
  };
}
