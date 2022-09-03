import React, { Component } from 'react';
import { Editor, EditorState, convertFromRaw, convertToRaw } from 'draft-js';
import { convertToHTML, convertFromHTML } from 'draft-convert';
import 'draft-js/dist/Draft.css';
const style = {
  inputStyle:
    'mb-2  my-2 p-2 text-xl text-bold md:text-3xl font-bold whitespace-pre-wrap',
};
class TitleInputComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      editorState: EditorState.createEmpty(),
    };
    // this.onChange = (editorState) => this.setState({ editorState });
  }
  saveContent = (content) => {
    window.localStorage.setItem(
      'content',
      JSON.stringify(convertToRaw(content))
    );
  };

  onChange = (editorState) => {
  const contentState = editorState.getCurrentContent();
  // console.log('content vvvstate', convertToHTML(contentState));

  // this.props.handleTopicTitleChanage(convertToRaw(contentState));
  this.props.handleTopicTitleChanage(convertToHTML(contentState));

  this.saveContent(contentState);
  this.setState({ editorState });
  };
  

  render() {
    return (
      <div className={style.inputStyle}>
        <Editor
          editorState={this.state.editorState}
          onChange={this.onChange}
          placeholder='New post title here...'
          handleKeyCommand={this.handleKeyCommand}
          onTab={this.onTab}
          spellCheck={true}
        />
      </div>
    );
  }
}

export default TitleInputComponent;
