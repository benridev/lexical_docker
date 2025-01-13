import { useCallback } from 'react';
/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import {registerCodeHighlighting} from '@lexical/code';
import {useLexicalComposerContext} from '@lexical/react/LexicalComposerContext';
import {useEffect} from 'react';

export default function CodeHighlightPlugin(): JSX.Element | null {
  const [editor] = useLexicalComposerContext();

  const debounceRegisterCodeHighlighting = useCallback(
    debounce(() => {
      return registerCodeHighlighting(editor);
    }, 5000),
    []
  );

  useEffect(() => {
    debounceRegisterCodeHighlighting()
  }, [editor]);

  return null;
}

function debounce(func, timeout = 300) {
  let timer;
  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => {
      func.apply(this, args);
    }, timeout);
  };
}
