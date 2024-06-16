import MDEditor from '@uiw/react-md-editor';
import { type Dispatch, type SetStateAction } from 'react';

interface MarkdownEditorProps {
  content: string;
  setContent: Dispatch<SetStateAction<string>>;
}
export default function MarkdownEditor({
  content,
  setContent,
}: MarkdownEditorProps) {
  return (
    <div>
      <MDEditor
        height={"500px"}
        value={content}
        onChange={(newVal) => setContent(newVal!)}
      />
    </div>
  );
}
