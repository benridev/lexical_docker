/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import type {
    EditorConfig,
    LexicalNode,
    NodeKey,
    SerializedTextNode,
  } from 'lexical';
  
  import {addClassNamesToElement} from '@lexical/utils';
  import {TextNode} from 'lexical';
  
  export class SearchNode extends TextNode {
    static getType(): string {
      return 'searchNode';
    }
  
    static clone(node: SearchNode): SearchNode {
      return new SearchNode(node.__text, node.__key);
    }
  
    constructor(text: string, key?: NodeKey) {
      super(text, key);
    }
  
    createDOM(config: EditorConfig): HTMLElement {
      const element = super.createDOM(config);
      addClassNamesToElement(element, config.theme.search);
      return element;
    }
  
    static importJSON(serializedNode: SerializedTextNode): SearchNode {
      const node = $createSearchNode(serializedNode.text);
      node.setFormat(serializedNode.format);
      node.setDetail(serializedNode.detail);
      node.setMode(serializedNode.mode);
      node.setStyle(serializedNode.style);
      return node;
    }
  
    exportJSON(): SerializedTextNode {
      return {
        ...super.exportJSON(),
        type: 'searchNode',
      };
    }
  
    canInsertTextBefore(): boolean {
      return false;
    }
  
    isTextEntity(): true {
      return true;
    }
  }
  
  export function $createSearchNode(text: string): SearchNode {
    return new SearchNode(text);
  }
  
  export function $isSearchNode(
    node: LexicalNode | null | undefined,
  ): node is SearchNode {
    return node instanceof SearchNode;
  }