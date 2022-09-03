import React from 'react';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  FaBold,
  FaUnderline,
  FaItalic,
  FaAnchor,
  FaHeading
} from 'react-icons/fa';

const blockTypes = [
  {
    label: 'H2',
    style: 'header-two',
  },
  {
    label: 'H3',
    style: 'header-three',
  },
  {
    label: 'H3',
    style: 'header-four',
  },
];

const inlineStyles = [
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

export { blockTypes, inlineStyles };
