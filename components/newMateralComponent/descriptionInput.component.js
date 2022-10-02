import React, { Component } from 'react';
import 'draft-js/dist/Draft.css';
import draftToHTML from 'draftjs-to-html';
import {
  Editor,
  EditorState,
  RichUtils,
  convertFromRaw,
  convertToRaw,
} from 'draft-js';
import {
  FaBold,
  FaUnderline,
  FaItalic,
  FaAnchor,
  FaHeading,
  FaQuoteLeft,
  FaListOl,
  FaListUl,
} from 'react-icons/fa';

const MAX_LENGTH = 10;

class DiscriptionInputComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      editorState: EditorState.createEmpty(),
    };

    this.onChange = this.onChange.bind(this);
    this._getLengthOfSelectedText = this._getLengthOfSelectedText.bind(this);
    this._handleBeforeInput = this._handleBeforeInput.bind(this);

    this.setDomEditorRef = (ref) => (this.domEditor = ref);
    this.focus = () => this.domEditor.focus();

    this.handleKeyCommand = (command) => this._handleKeyCommand(command);
    this.onTab = (e) => this._onTab(e);
    this.toggleBlockType = (type) => this._toggleBlockType(type);
    this.toggleInlineStyle = (style) => this._toggleInlineStyle(style);
  }

  onChange = (editorState) => {
    const contentState = editorState.getCurrentContent();

    this.props.handletopicContentChange(convertToRaw(contentState));

    this.saveContent(contentState);
    this.setState({ editorState });
  };

  componentDidMount() {
    const rawContent = JSON.parse(
      window.localStorage.getItem('UF_MATERIAL_DISC_CONTENT')
    );
    if (rawContent !== null) {
      const savedContent = EditorState.createWithContent(
        convertFromRaw(rawContent)
      );
      if (rawContent) {
        this.setState({ editorState: savedContent });
      } else {
        this.setState({ editorState: EditorState.createEmpty() });
      }
    }
  }

  saveContent = (content) => {
    const rawContent = convertToRaw(content);
    window.localStorage.setItem('UF_MATERIAL_DISC_CONTENT', JSON.stringify(rawContent));
  };

  // saveContent = (content) => {
  //   window.localStorage.setItem('content', JSON.stringify(convertToRaw(content)));
  // }

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

  _toggleBlockType(blockType) {
    this.onChange(RichUtils.toggleBlockType(this.state.editorState, blockType));
  }

  _toggleInlineStyle(inlineStyle) {
    this.onChange(
      RichUtils.toggleInlineStyle(this.state.editorState, inlineStyle)
    );
  }

  render() {
    const { editorState } = this.state;

    // If the user changes block type before entering any text, we can
    // either style the placeholder or hide it. Let's just hide it now.
    let className = 'RichEditor-editor px-1 ';
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
      <div>
        <div className=' z-0 min-w-screens '>
          {/* <div className='flex px-2 bg-[#fdfafa] h-[50px]  space-x-[20px] items-center'>
            <InlineStyleControls
              editorState={editorState}
              onToggle={this.toggleInlineStyle}
            />
            <BlockStyleControls
              editorState={editorState}
              onToggle={this.toggleBlockType}
            />
          </div> */}
          <div className={className} onClick={this.focus}>
            <Editor
              blockStyleFn={getBlockStyle}
              customStyleMap={styleMap}
              editorState={editorState}
              handleKeyCommand={this.handleKeyCommand}
              onChange={this.onChange}
              onTab={this.onTab}
              placeholder='write your Material discription here'
              ref={this.setDomEditorRef}
              spellCheck={true}
            />
          </div>
        </div>
      </div>
    );
  }
}

// Custom overrides for "code" style.
const styleMap = {
  CODE: {
    backgroundColor: 'rgba(0, 0, 0, 0.05)',
    fontFamily: '"Inconsolata", "Menlo", "Consolas", monospace',
    fontSize: 16,
    padding: 2,
  },
};

function getBlockStyle(block) {
  switch (block.getType()) {
    case 'blockquote':
      return 'RichEditor-blockquote';
    default:
      return null;
  }
}

class StyleButton extends React.Component {
  constructor() {
    super();
    this.onToggle = (e) => {
      e.preventDefault();
      this.props.onToggle(this.props.style);
    };
  }

  render() {
    let className = 'RichEditor-styleButton ui button';
    if (this.props.active) {
      className += ' RichEditor-activeButton';
    }

    return (
      <span className={className} onMouseDown={this.onToggle}>
        {this.props.label}
      </span>
    );
  }
}

const BLOCK_TYPES = [
  //   { label: 'H1', style: 'header-one' },
  { label: <FaListUl />, style: 'unordered-list-item', key: 'ul' },
  { label: <FaListOl />, style: 'ordered-list-item', key: 'ol' },
  { label: <FaQuoteLeft />, style: 'blockquote', key: 'qu' },
  { label: 'H2', style: 'header-two', key: 'h2' },
  { label: 'H3', style: 'header-three', key: 'h3' },
  { label: 'H4', style: 'header-four', key: 'h4' },
  //   { label: 'H5', style: 'header-five' },
  //   { label: 'H6', style: 'header-six' },

  //   { label: 'Code Block', style: 'code-block' },
];
const BlockStyleControls = (props) => {
  const { editorState } = props;
  const selection = editorState.getSelection();
  const blockType = editorState
    .getCurrentContent()
    .getBlockForKey(selection.getStartKey())
    .getType();

  return (
    <div className='flex  font-bold cursor-pointer  space-x-[20px]'>
      {BLOCK_TYPES.map((type) => (
        <StyleButton
          key={type.key}
          active={type.style === blockType}
          label={type.label}
          onToggle={props.onToggle}
          style={type.style}
        />
      ))}
    </div>
  );
};

var INLINE_STYLES = [
  ,
  // { label: 'Monospace', style: 'CODE' },
  {
    label: 'bold',
    style: 'BOLD',
    icon: <FaBold />,
  },
  {
    label: 'italic',
    style: 'ITALIC',
    icon: <FaItalic />,
  },
  {
    label: 'Underline',
    style: 'UNDERLINE',
    icon: <FaUnderline />,
  },
];

const InlineStyleControls = (props) => {
  var currentStyle = props.editorState.getCurrentInlineStyle();
  return (
    <div className=' flex cursor-pointer space-x-[20px] '>
      {INLINE_STYLES.map((type) => (
        <StyleButton
          key={type.label}
          active={currentStyle.has(type.style)}
          label={type.icon}
          onToggle={props.onToggle}
          style={type.style}
        />
      ))}
    </div>
  );
};

export default DiscriptionInputComponent;
