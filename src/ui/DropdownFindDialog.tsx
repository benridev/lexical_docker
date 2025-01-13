

import * as React from 'react';
import { FindTextDialog } from '../plugins/FindAndReplacePlugin/FindTextDialog';
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';
import { Dispatch, useEffect, useState } from 'react';
import DropUp from './DropUp';

type Props = {
  buttonAriaLabel?: string;
  buttonClassName: string;
  buttonIconClassName?: string;
  buttonLabel?: string;
  title?: string;
  stopCloseOnClickSelf?: boolean;
  onChange: Dispatch<string>;
  onChangeReplaceText:Dispatch<string>;
  doReplace:Dispatch<number>;
  doReplaceOnce:Dispatch<number>;
  findPrevious:()=> void;
  findNext:()=> void;
};

export default function DropdownFindDialog({
  stopCloseOnClickSelf = true,
  onChange,
  onChangeReplaceText,
  doReplace,
  doReplaceOnce,
  findPrevious,
  findNext,
  ...rest
}: Props) {
  const [editor] = useLexicalComposerContext();
  const [showDialog, setShowDialog] = useState(false);
  const [previousSearchText, setPreviousSearchText] = useState('');
  const [previousReplaceText, setPreviousReplaceText] = useState('');
  useEffect(() => {
    editor.setEditable(!showDialog);
    if (!showDialog) {
      onChange('');
    }
  }, [showDialog])
  return (
    <DropUp
      {...rest}
      stopCloseOnClickSelf={stopCloseOnClickSelf}
      setShow={setShowDialog}
    >

      <FindTextDialog
        previousSearchText={previousSearchText} 
        setPreviousSearchText={setPreviousSearchText}
        previousReplaceText={previousReplaceText}
        setPreviousReplaceText={setPreviousReplaceText}
        onChange={onChange}
        onChangeReplaceText={onChangeReplaceText}
        onClickReplace={doReplace}
        onClickReplaceOnce={doReplaceOnce}
        onClickPrevious={findPrevious}
        onClickNext={findNext}
         />
    </DropUp>
  );
}
