import React, { Component } from 'react';
import { Editor, EditorState } from 'draft-js';
import 'draft-js/dist/Draft.css';
const style = {
  inputStyle: 'text-lg p-2 mt-2 md:text-xl font-bold',
};
class TagInputComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      editorState: EditorState.createEmpty(),
    };
    this.onChange = (editorState) => this.setState({ editorState });
  }
  render() {
    return (
      <div className={style.inputStyle}>
        <Editor
          editorState={this.state.editorState}
          onChange={this.onChange}
          placeholder='Add upto 4 Tags '
          customStyleMap={style}
        />
      </div>
    );
  }
}

export default TagInputComponent;
