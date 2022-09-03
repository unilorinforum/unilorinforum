import React, { Component } from 'react';
import Editor from '@draft-js-plugins/editor';
import { EditorState, convertFromRaw, convertToRaw } from 'draft-js';
import Toolbar from './toolbar';
import { customStyleFn } from './toolbar/customStyles';
import { convertToHTML, convertFromHTML } from 'draft-convert';

class ContentInputComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      editorState: EditorState.createEmpty(),
    };
    this.setDomEditorRef = (ref) => (this.domEditor = ref);
    this.focus = () => this.domEditor.focus();
    // this.onChange = (editorState) => this.setState({ editorState });
    // this.focus = () => this.refs.editor.focus();
  }
  componentDidMount() {
    this.domEditor.focus();
  }
  // focus = () => this.refs.editor.focus();

  // saveContent = debounce((content) => {
  //   window.localStorage.setItem(
  //     'content',
  //     JSON.stringify(convertToRaw(content))
  //   );
  // }, 1000);
  // exportHTML = () => {
  //   this.setState({
  //     convertedContent: convertToHTML(
  //       this.state.editorState.getCurrentContent()
  //     ),
  //   });
  // };
  saveContent = (content) => {
    window.localStorage.setItem(
      'content',
      JSON.stringify(convertToRaw(content))
    );
  };
  onChange = (editorState) => {
    const contentState = editorState.getCurrentContent();
    // console.log('content hhhh state', convertToHTML(contentState));

    // this.props.handleArticleDescriptionChange(convertToRaw(contentState));
    this.props.handleArticleDescriptionChange(convertToHTML(contentState));

    this.saveContent(contentState);
    this.setState({ editorState });
    // this.setState({
    //   convertedContent: convertToHTML(
    //     this.state.editorState.getCurrentContent()
    //   ),
    // });
  };

  _getLengthOfSelectedText = () => {
    console.log('say');
    const currentSelection = this.state.editorState.getSelection();
    const isCollapsed = currentSelection.isCollapsed();

    let length = 0;

    if (!isCollapsed) {
      const currentContent = this.state.editorState.getCurrentContent();
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
    const currentContent = this.state.editorState.getCurrentContent();
    const currentContentLength = currentContent.getPlainText('').length;

    if (currentContentLength > MAX_LENGTH - 1) {
      console.log('you can type max ten characters');

      return 'handled';
    }
  };

  _handlePastedText = (pastedText) => {
    const currentContent = this.state.editorState.getCurrentContent();
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
    const { editorState } = this.state;
    const newState = RichUtils.handleKeyCommand(editorState, command);
    if (newState) {
      this.onChange(newState);
      return true;
    }
    return false;
  }

  _onTab(e) {
    const maxDepth = 4;
    this.onChange(RichUtils.onTab(e, this.state.editorState, maxDepth));
  }

  render() {
    const { editorState } = this.state;
    let className = 'RichEditor-editor';
    var contentState = editorState.getCurrentContent();
    if (!contentState.hasText()) {
      if (contentState.getBlockMap().first().getType() !== 'unstyled') {
        className += ' RichEditor-hidePlaceholder';
      }
    }

    if (!this.state.editorState) {
      return <h3 className='loading'>Loading...</h3>;
    }
    return (
      <div className='my-5'>
        <div className='flex space-x-3 rounded-lg my-2 items-center bg-[#f4f3f3] p-2'>
          <Toolbar
            onClick={this.focus}
            editorState={editorState}
            updateEditorState={this.onChange}
          />
          {/* <FaImage className='text-5xl text-center ' /> */}
        </div>

        <div className='p-1 text-lg'>
          <Editor
            // editorState={this.state.editorState}
            // onChange={this.onChange}
            placeholder='Write your topic content here..'
            customStyleFn={customStyleFn}
            // ref='editor'
            ref={this.setDomEditorRef}
            editorState={editorState}
            handleKeyCommand={this.handleKeyCommand}
            onChange={this.onChange}
            onTab={this.onTab}
            spellCheck={true}
          />
        </div>
      </div>
    );
  }
}

export default ContentInputComponent;
