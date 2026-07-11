import { visit } from 'unist-util-visit';
import { previewIframeTokensCss } from '../lib/preview-tokens.mjs';

const TOKENS_CSS = previewIframeTokensCss();

const AUTOSIZE_SCRIPT = `<script>
(function(){
  function send(){
    parent.postMessage({ okPreviewHeight: Math.ceil(document.documentElement.scrollHeight) }, '*');
  }
  new ResizeObserver(send).observe(document.documentElement);
  addEventListener('load', send);
  send();
})();
</script>`;

function escapeSrcdoc(html) {
  return html
    .replace(/&/g, '&amp;')
    .replace(/"/g, '&quot;');
}

export function remarkHtmlPreview() {
  return (tree) => {
    visit(tree, 'code', (node, index, parent) => {
      if (!parent || index == null) return;
      if (node.lang !== 'html' || !node.meta?.includes('preview')) return;

      const heightMatch = node.meta.match(/\bh=([^\s]+)/);
      const height = heightMatch?.[1] ?? null;
      const srcdoc = `<style>${TOKENS_CSS}</style>${node.value}${AUTOSIZE_SCRIPT}`;
      const style = height
        ? `width:100%;border:0;height:${height};display:block;`
        : 'width:100%;border:0;min-height:120px;display:block;';

      parent.children[index] = {
        type: 'html',
        value:
          `<iframe class="ok-preview" sandbox="allow-scripts" ` +
          `style="${style}" srcdoc="${escapeSrcdoc(srcdoc)}"></iframe>`,
      };
    });
  };
}
