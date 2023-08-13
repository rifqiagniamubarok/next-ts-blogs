import { FC } from 'react';
import { EditorContent, useEditor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Toolbar from './Toolbar';
import Underline from '@tiptap/extension-underline';
import Placeholder from '@tiptap/extension-placeholder';

interface Props {}

const Editor: FC<Props> = (props): JSX.Element => {
  const editor = useEditor({
    extensions: [
      StarterKit,
      Underline,
      Placeholder.configure({
        placeholder: 'Type something...',
      }),
    ],
    editorProps: {
      attributes: {
        class: 'prose prose-lg focus:outline-none dark:prose-invert max-w-full mx-auto h-full',
      },
    },
  });
  return (
    <div className="p-3 dark:bg-primary-dark bg-primary transition">
      <Toolbar editor={editor} />
      <div className="h-[1px] w-full bg-secondary-dark dark:bg-secondary-light my-3"></div>
      <EditorContent editor={editor} />
    </div>
  );
};

export default Editor;
