import * as React from 'react';
import { createPortal } from 'react-dom';
import './SearchHighlight.css';
import { Dispatch, useCallback, useEffect, useRef, useState } from 'react';
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';
import { getFirstChild } from '../../utils/common';
import { NodekeyOffset } from '.';
import { floatingStyle, getFloatingSearchHighlightPosition } from '../../utils/getFloatingSearchHighlightStyle';


export default function SearchHighlight({
  anchorElem = document.body,
  // rangeRect,
  listOffset,
  setStyles
}: {
  anchorElem?: HTMLElement;
  // rangeRect: DOMRect;
  listOffset: NodekeyOffset[];
  setStyles: Dispatch<floatingStyle[]>
}): null {
  const [editor] = useLexicalComposerContext();
  const stateListOffsetRef = useRef<floatingStyle[]>([]);
  const updateTextFormatFloatingToolbar = useCallback((listOffset: NodekeyOffset[]) => {
    const newStyles: {style:floatingStyle,idx:number|undefined}[] = [];
    console.log(listOffset);
    var idx = 0;
    var previousKey:number|undefined = 0;
    listOffset.map((offset: NodekeyOffset) => {
      const htmlEl = getFirstChild(editor.getElementByKey(offset.key)?.firstChild);
      var added = false;
      if(!htmlEl) return;
      let range = document.createRange();
      try {
        range.setStart(htmlEl, offset.offset.start);
        range.setEnd(htmlEl, offset.offset.end);
        const rects = range.getClientRects();
        [...rects].map((rect) => {
          const newStyle = getFloatingSearchHighlightPosition(
            rect,
            anchorElem
          );
          var styleWidth = newStyle.width;
          if(parseInt(styleWidth.substring(0,styleWidth.length -2)) != 4){// exclude line wraping rects
            newStyles.push({style:newStyle,idx:offset.pairKey});
            // console.log(offset.key, offset.offset.isReplace,previousKey);
            // added = true && ((offset.pairKey != previousKey) );
            // previousKey = offset.pairKey
          };
        });
        // console.log(idx,added ,offset.key,previousKey);
        // if(added ){
        //   idx += 1;
        // }
      }catch(error){
        console.log(error);
      }
    });
    // console.log(newStyles);
    setStyles(newStyles);

  }, [anchorElem]);

  useEffect(() => {
    const scrollerElem = anchorElem.parentElement;

    const update = () => {
      if (stateListOffsetRef.current) {
        editor.getEditorState().read(() => {
          updateTextFormatFloatingToolbar(stateListOffsetRef.current);
        });
      }
    };

    window.addEventListener('resize', update);
    if (scrollerElem) {
      scrollerElem.addEventListener('scroll', update);
    }

    return () => {
      window.removeEventListener('resize', update);
      if (scrollerElem) {
        scrollerElem.removeEventListener('scroll', update);
      }
    };
  }, [anchorElem, listOffset]);

  useEffect(() => {
    stateListOffsetRef.current = listOffset;
    updateTextFormatFloatingToolbar(listOffset);
  }, [listOffset])

  return null;

}

export function FloatingSearchHighlight({
  anchorElem = document.body,
  styles,
}: {
  anchorElem?: HTMLElement;
  styles: {style:floatingStyle,idx:number}[];
}): JSX.Element | null {

  return (styles.length > 0 && styles.map((style, index) =>
    createPortal(
      <div style={style.style} className={`search-highlight-bg  ${style.idx == 1 ? 'search-highlight-current' : ''}`} />,
      anchorElem,
    )))
}
