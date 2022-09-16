import React, { Component } from 'react';
import 'draft-js/dist/Draft.css';
import {
  Editor,
  EditorState,
  RichUtils,
  convertFromRaw,
  convertToRaw,
} from 'draft-js';

const MAX_LENGTH = 10;

class TitleInputComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      titleEditorState: EditorState.createEmpty(),
    };

    this.onChange = this.onChange.bind(this);
    this._getLengthOfSelectedText = this._getLengthOfSelectedText.bind(this);
    this._handleBeforeInput = this._handleBeforeInput.bind(this);

    this.handleKeyCommand = (command) => this._handleKeyCommand(command);
    this.onTab = (e) => this._onTab(e);
    this.toggleBlockType = (type) => this._toggleBlockType(type);
    this.toggleInlineStyle = (style) => this._toggleInlineStyle(style);
  }

  onChange = (titleEditorState) => {
    const titleState = titleEditorState.getCurrentContent();
    //          console.log('content state', convertToRaw(titleState));

    this.props.handletopicTitleChange(convertToRaw(titleState));

    this.saveContent(titleState);
    this.setState({ titleEditorState });
  };

  componentDidMount() {
    const rawContent = window.localStorage.getItem('UF_TITLE_INPUT');
    const savedContent = EditorState.createWithContent(
      convertFromRaw(JSON.parse(rawContent))
    );
    if (rawContent) {
      this.setState({ titleEditorState: savedContent });
    } else {
      this.setState({ titleEditorState: EditorState.createEmpty() });
    }
  }

  saveContent = (content) => {
    const rawContent = convertToRaw(content);
    window.localStorage.setItem('UF_TITLE_INPUT', JSON.stringify(rawContent));
  };

  // saveContent = (content) => {
  //   window.localStorage.setItem('content', JSON.stringify(convertToRaw(content)));
  // }

  _getLengthOfSelectedText = () => {
    console.log('say');
    const currentSelection = this.state.titleEditorState.getSelection();
    const isCollapsed = currentSelection.isCollapsed();

    let length = 0;

    if (!isCollapsed) {
      const currentContent = this.state.titleEditorState.getCurrentContent();
      const startKey = currentSelection.getStartKey();
      const endKey = currentSelection.getEndKey();
      const isBackward = currentSelection.getIsBackward();
      const blockMap = currentContent.getBlockMap();
      const startBlock = currentContent.getBlockForKey(startKey);
      const endBlock = currentContent.getBlockForKey(endKey);
      const isStartAndEndBlockAreTheSame = startKey === endKey;
      const startBlockTextLength = startBlock.getLength();
      const endBlockTextLength = endBlock.getLength();
      const startSelectedTextLength =
        startBlockTextLength - currentSelection.getStartOffset();
      const endSelectedTextLength = currentSelection.getEndOffset();
      const keyAfterEnd = currentContent.getKeyAfter(endKey);

      if (isStartAndEndBlockAreTheSame) {
        length +=
          currentSelection.getEndOffset() - currentSelection.getStartOffset();
      } else {
        let currentKey = startKey;
        let counter = 0;

        while (currentKey && currentKey !== keyAfterEnd) {
          if (currentKey === startKey) {
            length += startSelectedTextLength + 1;
          } else if (currentKey === endKey) {
            length += endSelectedTextLength;
          } else {
            length += currentContent.getBlockForKey(currentKey).getLength() + 1;
          }

          currentKey = currentContent.getKeyAfter(currentKey);
        }
      }
    }

    return length;
  };

  _handleBeforeInput = () => {
    console.log('hello');
    const currentContent = this.state.titleEditorState.getCurrentContent();
    const currentContentLength = currentContent.getPlainText('').length;

    if (currentContentLength > MAX_LENGTH - 1) {
      console.log('you can type max ten characters');

      return 'handled';
    }
  };

  _handlePastedText = (pastedText) => {
    const currentContent = this.state.titleEditorState.getCurrentContent();
    const currentContentLength = currentContent.getPlainText('').length;
    const selectedTextLength = this._getLengthOfSelectedText();

    if (
      currentContentLength + pastedText.length - selectedTextLength >
      MAX_LENGTH
    ) {
      console.log('you can type max ten characters');

      return 'handled';
    }
  };

  _handleKeyCommand(command) {
    const { titleEditorState } = this.state;
    const newState = RichUtils.handleKeyCommand(titleEditorState, command);
    if (newState) {
      this.onChange(newState);
      return true;
    }
    return false;
  }

  _onTab(e) {
    const maxDepth = 4;
    this.onChange(RichUtils.onTab(e, this.state.titleEditorState, maxDepth));
  }

  render() {
    const { titleEditorState } = this.state;

    // If the user changes block type before entering any text, we can
    // either style the placeholder or hide it. Let's just hide it now.
    let className = 'RichEditor-editor';
    var titleState = titleEditorState.getCurrentContent();
    if (!titleState.hasText()) {
      if (titleState.getBlockMap().first().getType() !== 'unstyled') {
        className += ' RichEditor-hidePlaceholder';
      }
    }

    if (!this.state.titleEditorState) {
      return <h3 className='loading'>Loading...</h3>;
    }
    return (
      <div>
        <div className='text-2xl font-bold min-h-[25px] my-[10px] p-[3px]  '>
          <div className={className}>
            <Editor
              editorState={titleEditorState}
              handleKeyCommand={this.handleKeyCommand}
              onChange={this.onChange}
              onTab={this.onTab}
              placeholder='Your Title Here...'
              spellCheck={true}
            />
          </div>
        </div>
      </div>
    );
  }
}


export default TitleInputComponent;