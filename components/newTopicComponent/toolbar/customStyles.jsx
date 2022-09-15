import React from 'react';
import createStyles from 'draft-js-custom-styles';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { FaAnchor } from 'react-icons/fa';
import { Container, ToolbarItem } from './common';

//STYLES THAT WILL BE TOGGELED
const { styles, customStyleFn, exporter } = createStyles(

  ['font-size', 'color'],
  'CUSTOM_'
);

const customStyles = [
  {
    label: 'red-color',
    icon: <FaAnchor />,
    styler: (editorState) => {
      return styles.color.toggle(editorState, 'red');
    },
  },
  
];

export { customStyles, customStyleFn };

export function RenderCustomStyles(props) {
  const { editorState, updateEditorState } = props;

  const applyCustomStyle = (item) => {
    if (item) {
      const newEditorState = item.styler(editorState);
      updateEditorState(newEditorState);
    }
  };

  return (
    <Container>
      {customStyles.map((item, idx) => {
        return (
          <ToolbarItem
            key={`${item.label}-${idx}`}
            onClick={(e) => applyCustomStyle(item)}
          >
            {item.icon || item.label}
          </ToolbarItem>
        );
      })}
    </Container>
  );
}
