import { remark } from "remark";
import remarkGfm from "remark-gfm";
import remarkBreaks from "remark-breaks";
import remarkHtml from "remark-html";

/**
 * Render Markdown to HTML.
 *
 * `remark-breaks` is deliberate: Facebook posts use single newlines as real
 * line breaks, and standard Markdown would collapse them into one paragraph,
 * destroying the shape of imported posts.
 */
export async function renderMarkdown(markdown: string): Promise<string> {
  const file = await remark()
    .use(remarkGfm)
    .use(remarkBreaks)
    .use(remarkHtml, { sanitize: false })
    .process(markdown);

  return String(file);
}
