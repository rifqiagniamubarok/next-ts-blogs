import { FC } from 'react';
import { Editor } from '@tiptap/react';

import { AiFillCaretDown } from 'react-icons/ai';
import { BsBraces, BsCode, BsImageFill, BsLink45Deg, BsListOl, BsListUl, BsTypeBold, BsTypeItalic, BsTypeStrikethrough, BsTypeUnderline, BsYoutube } from 'react-icons/bs';
import DropdownOptions from '@/components/common/DropdownOptions';
import { getFocusedEditor } from '../EditorUtils';
import Button from './Button';
import { RiDoubleQuotesL } from 'react-icons/ri';
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
        <Button onClick={() => getFocusedEditor(editor).toggleBold().run()}>
          <BsTypeBold />
        </Button>
        <Button>
          <BsTypeItalic onClick={() => getFocusedEditor(editor).toggleItalic().run()} />
        </Button>
        <Button>
          <BsTypeUnderline onClick={() => getFocusedEditor(editor).toggleUnderline().run()} />
        </Button>
        <Button onClick={() => getFocusedEditor(editor).toggleStrike().run()}>
          <BsTypeStrikethrough />
        </Button>
      </div>
      <div className="h-4 w-[1px] bg-secondary-dark dark:bg-secondary-light mx-8" />
      <div className="flex items-center space-x-2">
        <Button onClick={() => getFocusedEditor(editor).toggleBlockquote().run()}>
          <RiDoubleQuotesL />
        </Button>
        <Button onClick={() => getFocusedEditor(editor).toggleCode().run()}>
          <BsCode />
        </Button>
        <Button onClick={() => getFocusedEditor(editor).toggleCodeBlock().run()}>
          <BsBraces />
        </Button>
        <Button>
          <BsLink45Deg />
        </Button>
        <Button onClick={() => getFocusedEditor(editor).toggleOrderedList().run()}>
          <BsListOl />
        </Button>
        <Button onClick={() => getFocusedEditor(editor).toggleBulletList().run()}>
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
