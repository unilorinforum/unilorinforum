import React from 'react';
import styled from 'styled-components';
import { blockTypes } from './constants';
import { RenderInlineStyles } from './inlineStyle';
import { RenderCustomStyles } from './customStyles';
import { RenderBlockStyles} from './blockStyles'
import { FaImage, FaPhotoVideo, FaHeading } from 'react-icons/fa';

const ToolbarContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  min-height: 48px;
  padding: 5px 7px;
  margin-bottom: 8px;
  border-radius: 2px 2px 0 0;
  box-shadow: 0px 0px 3px 1px rgba(15, 15, 15, 0.17);
`;

export default class Toolbar extends React.Component {
  render() {
    return (
      <div className='toolbar'>
        <RenderInlineStyles
          editorState={this.props.editorState}
          updateEditorState={this.props.updateEditorState}
        />
        <RenderCustomStyles
          editorState={this.props.editorState}
          updateEditorState={this.props.updateEditorState}
        />
        <RenderBlockStyles
          editorState={this.props.editorState}
          updateEditorState={this.props.updateEditorState}
        />
      </div>
    );
  }
}
