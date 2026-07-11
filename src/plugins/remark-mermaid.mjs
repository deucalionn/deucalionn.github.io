import { visit } from 'unist-util-visit';

/** Turn ```mermaid fences into <pre class="mermaid"> for client rendering. */
export function remarkMermaid() {
  return (tree) => {
    visit(tree, 'code', (node, index, parent) => {
      if (!parent || index == null) return;
      if (node.lang !== 'mermaid') return;

      parent.children[index] = {
        type: 'html',
        value: `<pre class="mermaid">${node.value.replace(/</g, '&lt;')}</pre>`,
      };
    });
  };
}
