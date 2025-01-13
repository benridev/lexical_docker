/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */
const VERTICAL_GAP = 10;
const HORIZONTAL_OFFSET = 5;
export interface floatingStyle {
  opacity: string,
  width: string,
  height: string,
  transform: string
}

export function getFloatingSearchHighlightPosition(
  targetRect: DOMRect | null,
  anchorElem: HTMLElement,
): floatingStyle {
  const scrollerElem = anchorElem.parentElement;
  if (targetRect === null || !scrollerElem) {

    return {
      opacity: '0',
      transform: 'translate(-10000px, -10000px)',
      width: '0',
      height: '0'
    };
  }

  const anchorElementRect = anchorElem.getBoundingClientRect();

  let top = targetRect.top;
  let left = targetRect.left;

  top -= anchorElementRect.top;
  left -= anchorElementRect.left;

  return {
    opacity: '1',
    width: `${targetRect.width}px`,
    height: `${targetRect.height}px`,
    transform: `translate(${left}px, ${top}px)`
  }

}
