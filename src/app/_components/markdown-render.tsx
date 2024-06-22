import ReactMarkdown from 'react-markdown';
import rehypeHighlight from 'rehype-highlight';
import gfm from "remark-gfm";

export default function MarkdownRender({ content }: { content: string }) {
  return (
    <div className="prose lg:prose-lg min-w-full">
      <ReactMarkdown
        className="dark:prose-pre:bg-gray-800 dark:text-white dark:prose-h1:text-white
         dark:prose-h2:text-white dark:prose-h3:text-white dark:prose-a:text-white 
         dark:prose-strong:text-white dark:prose-code:text-white"
         rehypePlugins={[rehypeHighlight]}
         remarkPlugins={[gfm]} >{content}</ReactMarkdown>
    </div>
  )
}