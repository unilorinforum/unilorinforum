
      <Header/>
        <HomePageStyle>
          <div className=' mb-6'>
            <HomePageHeade />
          </div>
          <div>
            {this.state.me.map(
              ({
                topicId,
                topicTitle,
                topicExcerpt,
                topicTime,
                topicLikes,
                topicViwes,
                topicAuthor,
                topicAvatarImg,
              }) => (
                <TopicContainer
                  key={topicId}
                  title={topicTitle}
                  excerpt={topicExcerpt}
                  time={topicTime}
                  likes={topicLikes}
                  viwes={topicViwes}
                  author={topicAuthor}
                  image={topicAvatarImg}
                />
              )
            )}
          </div>
        </HomePageStyle>

        <style>
@import url('https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,400;1,500;1,600;1,700;1,800;1,900&display=swap');
</style>
npm install @draft-js-plugins/mention
npm i @draft-js-plugins/editor

class ContentInputComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      editorState: EditorState.createEmpty(),
    };

    this.onChange = (editorState) => this.setState({ editorState });
  }
  onBoldClick = () => {
    this.onChange(RichUtils.toggleInlineStyle(this.state.editorState, 'BOLD'));
  };
  onItalicClick = () => {
    this.onChange(
      RichUtils.toggleInlineStyle(this.state.editorState, 'ITALIC')
    );
  };
  onUnderLineClick = () => {
    this.onChange(
      RichUtils.toggleInlineStyle(this.state.editorState, 'UNDERLINE')
    );
  };

  render() {
    return (
      <div>
        <div className='flex space-x-3 rounded-lg my-2 w-fit bg-[#f4f3f3] p-2'>
          <FaBold className={style.iconStyle} onMouseDown={this.onBoldClick} />
          <FaItalic className={style.iconStyle} onMouseDown={this.onItalicClick} />
          <FaListOl className={style.iconStyle} />
          <FaListUl className={style.iconStyle} />
          <FaUnderline
            className={style.iconStyle}
            onMouseDown={this.onUnderLineClick}
          />
          <FaImage className={style.iconStyle} />
          <FaPhotoVideo className={style.iconStyle} />
          <FaHeading className={style.iconStyle} />
        </div>

        <div className={style.inputStyle}>
          <Editor
            editorState={this.state.editorState}
            onChange={this.onChange}
            placeholder='Write your topic content here..'
            customStyleMap={style}
          />
        </div>
      </div>
    );
  }
}

export default ContentInputComponent;
import React, { Component } from 'react';
import { Editor, EditorState, RichUtils } from 'draft-js';
import 'draft-js/dist/Draft.css';
import {
  FaBold,
  FaItalic,
  FaListOl,
  FaListUl,
  FaUnderline,
  FaImage,
  FaPhotoVideo,
  FaHeading,
} from 'react-icons/fa';
const style = {
  inputStyle: 'mb-4 text-2xl md:text-xl ',
  iconStyle:'text-3xl m-0 '
};

toolbar={{
      inline: {
        bold: { icon: , className: 'demo-option-custom' },
        
      },
      
    }}

    italic: { icon: Icons.italic, className: 'demo-option-custom' },
        underline: { icon: Icons.underline, className: 'demo-option-custom' },
        strikethrough: { icon: Icons.strikethrough, className: 'demo-option-custom' },
        monospace: { className: 'demo-option-custom' },
        superscript: { icon: Icons.superscript, className: 'demo-option-custom' },
        subscript: { icon: Icons.subscript, className: 'demo-option-custom' },

        import React, { Component } from 'react';
import {
  FaBold,
  FaItalic,
  FaListOl,
  FaListUl,
  FaUnderline,
  FaImage,
  FaPhotoVideo,
  FaHeading,
} from 'react-icons/fa';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import dynamic from 'next/dynamic';
import {EditorState} from 'draft-js';
const Editor = dynamic(
  () => {
    return import('react-draft-wysiwyg').then((mod) => mod.Editor);
  },
  { ssr: false }
);

class ContentInputComponent extends Component {
  state = {
    editorState: EditorState.createEmpty()
  }

  onEditorStateChange =(editorState) => {
    this.setState({
      editorState
    })
  }
  render() {
    const {editorState} = this.state
    return (
      <div>
        <Editor
          editorState={editorState}
          toolbarClassName='toolbarClassName'
          wrapperClassName='wrapperClassName'
          editorClassName='editorClassName'
          onEditorStateChange={this.onEditorStateChange}
          hashtag={{}}
          
        />
        ;
      </div>
    );
  }
}

export default ContentInputComponent;
import React from 'react';
//Import Editor State and DraftEditor
import { EditorState, Editor as DraftEditor } from 'draft-js';
import styled from 'styled-components';
import Toolbar from './toolbar';
import { customStyleFn } from './toolbar/customStyles';

const EditorWrapper = styled.div`
  min-width: 700px;
  display: flex;
  flex-direction: column;
  height: fit-content;
  margin-top: 3em;
`;

const EditorContainer = styled.div`
  display: flex;
  min-height: 9em;
  border-radius: 0 0 3px 3px;
  background-color: #fff;
  padding: 5px;
  font-size: 17px;
  font-weight: 300;
  box-shadow: 0px 0px 3px 1px rgba(15, 15, 15, 0.17);
`;

//Editor Wrapper Component
export default class Editor extends React.Component {
  constructor(props) {
    super(props);
    //Make sure to create an empty instance of the EditorState
    this.state = {
      editorState: EditorState.createEmpty(),
    };
    //Method for updating the EditorState with a new one
    this.onChange = (editorState) => this.setState({ editorState });
  }
  

  render() {
    const { editorState } = this.state;
    // Debug your Editor and notice that the EditorState gets update on every
    // character you type
    console.log('EditorSTATE: ', this.state.editorState);
    //Render the Draftjs Editor Component
    /*
    The Editor Takes the current editorState and provides
    you with onChange callback to update the current EditorState being stored on your state.
    */
    return (
      <EditorWrapper>
        <Toolbar editorState={editorState} updateEditorState={this.onChange} />
        <EditorContainer>
          <DraftEditor
            editorState={this.state.editorState}
            onChange={this.onChange}
            customStyleFn={customStyleFn}
          />
        </EditorContainer>
      </EditorWrapper>
    );
  }
}
import React, {Component} from 'react';
//Import Editor State and DraftEditor
import { EditorState, Editor} from 'draft-js';
// import styled from 'styled-components';
import Toolbar from './toolbar';
import { customStyleFn } from './toolbar/customStyles';
import {
 
  FaImage,
  FaPhotoVideo,
  FaHeading,
} from 'react-icons/fa';

class ContentInputComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      editorState: EditorState.createEmpty(),
    };

    this.onChange = (editorState) => this.setState({ editorState });
    this.focus = () => this.refs.editor.focus();
  }
  

  render() {
    return (
      <div className=''>
        <div className='flex space-x-3 rounded-lg my-2 items-center bg-[#f4f3f3] p-2'>
          {console.log(this.refs)}
          <Toolbar
            editorState={this.state.editorState}
            updateEditorState={this.onChange}
          />
          <FaImage className='text-5xl text-center ' />
        </div>

        <div className='p-1 text-lg' onClick={this.focus}>
          <Editor
            editorState={this.state.editorState}
            onChange={this.onChange}
            placeholder='Write your topic content here..'
            customStyleFn={customStyleFn}
          />
        </div>
      </div>
    );
  }
}

export default ContentInputComponent;


import Link from 'next/link';
import axios from 'axios';
import React, { useState, useRef, useEffect } from 'react';
// import FormInput from '../components/formInputComponent/forminput.component';
import Header from '../components/headerComponent/header.component';
import { BsGoogle, BsFacebook } from 'react-icons/bs';
const SocialLogin = {
  color: '#ffffff',
  size: '15px',
};

const styles = {
  mainContainer:
    'flex flex-col md:justify-center  items-center bg-[#000000] w-full h-screen ',
  wellcomeTextContainer:
    'flex flex-col justify-center mb-3 mt-12 items-center ',
};

export default function SignUp() {
  const [username, setUsername] = useState('');
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errMsg, setErrMsg] = useState('');
  const emailRef = useRef();
  const errRef = useRef();
  const usernameRef = useRef();

  useEffect(() => {
    usernameRef.current.focus();
  }, []);

  useEffect(() => {
    setErrMsg('');
  }, [email, password]);

  const handleSubmmit = async (event) => {
    event.preventDefault();
    const data = { email, password };
    console.log(data, 'ooo');

    try {
      const endPoint = 'http://localhost:4000/api/users/register';
      const response = await axios.post(endPoint, JSON.stringify(data), {
        headers: { 'content-Type': 'application/json' },
        withCredentials: true,
      });
      console.log(JSON.stringify(response));
    } catch (error) {}
  };

  return (
    <>
      <div className='flex flex-col md:justify-center  items-center bg-[#000000] px-2 h-screen '>
        <div className='flex flex-col justify-center mb-3 mt-12 items-center '>
          <h2 className='text-[#F1CB97] text-3xl font-bold '>
            welcome to Forum App
          </h2>
          <span className='font-bold text-[#F1CB97] text-sm mt-2'>
            create an account to connect with students across
          </span>
        </div>
        <div className='bg-[#01183a] bg-gradient-to-l w-[361px] rounded-sm sm:mx-2 from-[#c6d7f4] px-10 mt-4 pt-2 h-min '>
          {' '}
          <div className=' flex items-center justify-center'>
            <span
              ref={errRef}
              className='text-[#ffffff] text-center font-bold text-xl w-[300px] '
            >
              {errMsg}
            </span>
          </div>
          <form
            onSubmit={handleSubmmit}
            className='flex flex-col justify-between items-center mt-7'
          >
            <div className='p-2 px-3 space-y-4 bg-black'>
              <input
                name='username'
                type='text'
                required
                ref={usernameRef}
                value={username}
                // autoComplete='off'
                onChange={(e) => setUsername(e.target.value)}
                placeholder='Chose a username'
                className='flex bg-[#FFFFFF] italic normal px-4 text-[#1D498BAB] rounded-md w-[312px] h-[48px]'
              />
              <input
                name='email'
                type='email'
                required
                value={email}
                // autoComplete='off'
                onChange={(e) => setEmail(e.target.value)}
                placeholder='Enter e-mail'
                ref={emailRef}
                className='flex bg-[#FFFFFF] italic normal px-4 text-[#1D498BAB] rounded-md w-[312px] h-[48px]'
              />
              <input
                name='password'
                type='password'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                minlength='1'
                placeholder='Enter password'
                className='flex bg-[#FFFFFF] italic normal px-4 text-[#1D498BAB] rounded-md w-[312px] h-[48px]'
              />
            </div>
            {/* <p>{result.message}</p> */}
            <input
              className=' font-bold text-center text-[#faf9f9] w-[240px] h-[40px] bg-[#002D72] mt-8 cursor-pointer rounded-full border-2 '
              type='submit'
              value='Sign Up'
            />
          </form>
          <div className='flex flex-col justify-items-center '>
            <span className='mt-6 text-center font-bold text-[#f4f2ef] '>
              or sign up with Google
            </span>
            <div className='flex justify-center space-x-4 mt-6 justify-self-center '>
              <span className='cursor-pointer bg-[#002d72] p-2 rounded-md '>
                <BsGoogle style={SocialLogin} />
              </span>
              <span className='cursor-pointer bg-[#002d72] p-2  rounded-md '>
                <BsFacebook style={SocialLogin} />
              </span>
            </div>
            <div className='flex flex-col justify-center text-sm items-center space-y-7 mt-4'>
              <div className='text-[#e5e3e1] font-bold'>
                By signing up you agree with our{' '}
                <span className='text-[#120339]  font-bold'>
                  {' '}
                  terms of services agrements
                </span>{' '}
                and
                <span className='text-[#120339] font-bold'>
                  {' '}
                  privacy policy
                </span>
              </div>
              <div className=' mb-5 pb-6 text-[#e5e3e1] font-bold'>
                alredy have an account?{' '}
                <span className='text-[#120339] font-bold'>
                  <Link href='/login'>Login</Link>
                </span>{' '}
                Instead
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
SignUp.getLayout = function pageLayout(page) {
  return (
    <>
      {/* <Header /> */}
      {page}
    </>
  );
};
