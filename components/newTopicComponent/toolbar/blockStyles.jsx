import React from 'react';
import { blockTypes } from './constants';
import { ToolbarItem, Container } from './common';
import { RichUtils } from 'draft-js';




export function RenderBlockStyles(props) {
  const { editorState, updateEditorState } = props;
  const applyStyle = (e, style) => {
    e.preventDefault();
    updateEditorState(RichUtils.toggleBlockType(editorState, style));
  };
  const selection = editorState.getSelection();
  const blockType = editorState
    .getCurrentContent()
    .getBlockForKey(selection.getStartKey())
    .getType();

  return (
    <Container>
      {blockTypes.map((item, idx) => {
        return (
          <ToolbarItem
            active={item.style === blockType}
            key={`${item.label}-${idx}`}
            onClick={(e) => applyStyle(e, item.style)}
          >
            {item.icon || item.label}
          </ToolbarItem>
        );
      })}
    </Container>
  );
}
