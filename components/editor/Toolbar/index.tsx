import { FC } from 'react';
import { Editor } from '@tiptap/react';

import { AiFillCaretDown } from 'react-icons/ai';
import { BsBraces, BsCode, BsImageFill, BsLink45Deg, BsListOl, BsListUl, BsTypeBold, BsTypeItalic, BsTypeStrikethrough, BsTypeUnderline, BsYoutube } from 'react-icons/bs';
import DropdownOptions from '@/components/common/DropdownOptions';
import { getFocusedEditor } from '../EditorUtils';
import Button from './Button';
import { RiDoubleQuotesL } from 'react-icons/ri';
import InsertLink from '../Link/InsertLink';
import { linkOption } from '../Link/LinkForm';
// import Underline from '@tiptap/extension-underline';

interface Props {
  editor: Editor | null;
}

const Toolbar: FC<Props> = ({ editor }): JSX.Element | null => {
  if (!editor) return null;

  const options = [
    {
      label: 'Paragraph',
      onClick: () => getFocusedEditor(editor).setParagraph().run(),
    },
    { label: 'Heading 1', onClick: () => getFocusedEditor(editor).toggleHeading({ level: 1 }).run() },
    { label: 'Heading 2', onClick: () => getFocusedEditor(editor).toggleHeading({ level: 2 }).run() },
    { label: 'Heading 3', onClick: () => getFocusedEditor(editor).toggleHeading({ level: 3 }).run() },
  ];

  const getLabel = (): string => {
    if (editor.isActive('heading', { level: 1 })) return 'Heading 1';
    if (editor.isActive('heading', { level: 2 })) return 'Heading 2';
    if (editor.isActive('heading', { level: 3 })) return 'Heading 3';

    return 'Paragraph';
  };

  const handleLinkSubmit = ({ url, openInNewTab }: linkOption) => {
    const { commands } = editor;
    if (openInNewTab)
      commands.setLink({
        href: url,
        target: '_blank',
      });
    else
      commands.setLink({
        href: url,
      });
  };

  return (
    <div className="flex items-center">
      {/* Paragraph */}
      <DropdownOptions
        options={options}
        head={
          <div className="flex items-center space-x-2 text-primary-dark dark:text-primary">
            <p>{getLabel()}</p>
            <AiFillCaretDown />
          </div>
        }
      />

      <div className="h-4 w-[1px] bg-secondary-dark dark:bg-secondary-light mx-8" />
      <div className="flex items-center space-x-2">
        <Button active={editor.isActive('bold')} onClick={() => getFocusedEditor(editor).toggleBold().run()}>
          <BsTypeBold />
        </Button>
        <Button active={editor.isActive('italic')}>
          <BsTypeItalic onClick={() => getFocusedEditor(editor).toggleItalic().run()} />
        </Button>
        <Button active={editor.isActive('underline')}>
          <BsTypeUnderline onClick={() => getFocusedEditor(editor).toggleUnderline().run()} />
        </Button>
        <Button active={editor.isActive('strike')} onClick={() => getFocusedEditor(editor).toggleStrike().run()}>
          <BsTypeStrikethrough />
        </Button>
      </div>
      <div className="h-4 w-[1px] bg-secondary-dark dark:bg-secondary-light mx-8" />
      <div className="flex items-center space-x-2">
        <Button active={editor.isActive('blockquote')} onClick={() => getFocusedEditor(editor).toggleBlockquote().run()}>
          <RiDoubleQuotesL />
        </Button>
        <Button active={editor.isActive('code')} onClick={() => getFocusedEditor(editor).toggleCode().run()}>
          <BsCode />
        </Button>
        <Button active={editor.isActive('codeBlock')} onClick={() => getFocusedEditor(editor).toggleCodeBlock().run()}>
          <BsBraces />
        </Button>
        <InsertLink onSubmit={handleLinkSubmit} />
        <Button active={editor.isActive('orderedList')} onClick={() => getFocusedEditor(editor).toggleOrderedList().run()}>
          <BsListOl />
        </Button>
        <Button active={editor.isActive('bulletList')} onClick={() => getFocusedEditor(editor).toggleBulletList().run()}>
          <BsListUl />
        </Button>
      </div>
      <div className="h-4 w-[1px] bg-secondary-dark dark:bg-secondary-light mx-8" />
      <div className="flex items-center space-x-2">
        <Button>
          <BsYoutube />
        </Button>
        <Button>
          <BsImageFill />
        </Button>
      </div>
    </div>
  );
};

export default Toolbar;
