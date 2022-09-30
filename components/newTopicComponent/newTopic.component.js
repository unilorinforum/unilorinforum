import React, { Component } from 'react';
import dynamic from 'next/dynamic';
import Image from 'next/image';
import Select from 'react-select';
import axios from 'axios';
import Link from 'next/link';
import draftToHTML from 'draftjs-to-html';
import NewTopicSidebarComponent from '../sideBarComponent/newTopicSidebar.component';
import { wordCount, getLoggedInUser, getSavedTitle } from '../../functions';
import { toast, ToastContainer, Slide, Zoom, Flip, Bounce } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { adminCategories, categories } from '../../common/categories';
import {AiFillCloseSquare} from 'react-icons/ai'
import NewPostHeaderComponent from '../headerComponent/newPostHeader.component';

const TitleInputComponent = dynamic(import('./titleInput.component'), {
  ssr: false,
  loading: () => <p>Loading...</p>,
});
const ContentInputComponent = dynamic(import('./contentInput.component'), {
  ssr: false,
  loading: () => <p>Loading...</p>,
});
 

class NewTopicComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      topicTitle: '',
      topicContent: '',
      isUploading: false,
      coverImageUrl: '',
      isFetching: false,
      multiple: true,
      category: 0,
      user: {},
      errmsg: null,
      isOpen: false,
      isSubmiting: false,
    };
  }

  componentDidMount() {
    const savedCat = window.localStorage.getItem('UF_SAVED_CAT');
    if (savedCat) this.setState({ category: JSON.parse(savedCat) });
    const loggedInUser = getLoggedInUser();
    if (loggedInUser !== null) {
      this.setState({ user: loggedInUser });
    }

    console.log(this.state.user);
  }
  handletopicContentChange = (editorState) => {
    this.setState({
      topicContent: editorState,
    });
  };
  handleTitleChange = (e) => {
    this.setState({
      topicTitle: e.target.value,
    });
    console.log(this.state.topicTitle);
  };
  handletopicTitleChange = (titleEditorState) => {
    this.setState({
      topicTitle: titleEditorState,
    });

    const titleHtml = draftToHTML(titleEditorState);
  };

  handleCategorySelect = (category) => {
    this.setState({ category });
    window.localStorage.setItem('UF_SAVED_CAT', JSON.stringify(category));
  };

  uploadhandler = async (event) => {
    const image = event.target.files[0];
    this.setState({
      isUploading: true,
    });
    try {
      const formData = new FormData();
      formData.append('image', image, image.name);
      const response = await axios.post('/images/cover-upload', formData);
      if (response.data.success == 1) {
        this.setState({
          coverImageUrl: `${process.env.NEXT_PUBLIC_API_URL}/${response.data.url}`,
          isUploading: false,
        });
        toast.success(response.data.message, {
          position: toast.POSITION.TOP_RIGHT,
        });
      }
    } catch (error) {
      console.log(error.message);
      toast.error(error.message, {
        position: toast.POSITION.TOP_RIGHT,
        className: 'font-bold text-sm ',
      });
      this.removeCoverImage()
    }
  };
  removeCoverImage = (e) => {
    e.preventDefault();
     this.setState({
       coverImageUrl: '',
       isUploading: false,
     });
        toast.success('cover removed', {
          position: toast.POSITION.TOP_RIGHT,
          className: 'font-bold text-sm ',
        });
  };
  handleFormSubmit = async (e) => {
    e.preventDefault();
    const id = toast.loading('Submiting...', {
      className: 'font-bold text-sm ',
      position: 'top-right',
      transition: Slide,
    });
    const titleHtml = draftToHTML(this.state.topicTitle);
    const contentHtml = draftToHTML(this.state.topicContent);
    let payload = {
      title: titleHtml,
      articleCategory: this.state.category.value,
      topicContent: contentHtml,
      coverImageUrl: this.state.coverImageUrl,
      user_id: this.state.user.user_id,
      author: this.state.user.username,
    };
    console.log('payload:', payload);

    try {
      const response = await axios.post('/topics/create', payload);
      if (response.data.success == 0) {
        toast.update(id, {
          render: response.data.message,
          type: 'error',
          isLoading: false,
          closeButton: true,
          position: 'top-right',
          autoClose: 5000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          transition: Slide,
        });
      }
      if (response.data.success == 1) {
        toast.update(id, {
          render: response.data.message,
          type: 'success',
          isLoading: false,
          closeButton: true,
          position: 'top-right',
          autoClose: 5000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          transition: Slide,
        });
      }
    } catch (error) {
      console.log('error', error.message);
         toast.update(id, {
           render: error.message,
           type: 'error',
           isLoading: false,
           closeButton: true,
           position: 'top-right',
           autoClose: 5000,
           hideProgressBar: true,
           closeOnClick: true,
           pauseOnHover: true,
           draggable: true,
           progress: undefined,
           transition: Slide,
         });
    }
  };

  config = {
    headers: { 'content-type': 'multipart/form-data' },
    onUploadProgress: (event) => {
      console.log(
        `Current progress:`,
        Math.round((event.loaded * 100) / event.total)
      );
    },
  };

  render() {
    const { category, isUploading, coverImageUrl } = this.state;
    return (
      <div>
        <ToastContainer
          className={' w-[20px]'}
          transition={Slide}
          style={{
            width: '300px',
            height: '150px',
            top: '60px',
            left: '15px',
            marginLeft: '20px',
          }}
        />

       <NewPostHeaderComponent />

        <div className='flex  min-h-screen bg-gray-light mx-1 pt-2 justify-around  '>
          <div className='flex overflow-scroll mx-0 p-3  mt-6 bg-[#ffff] rounded-md text-[#000] justify-around min-h-[560px] md:h-[560px] w-[700px] max-w-[750px]  space-y-2 '>
            <form onSubmit={this.handleFormSubmit} className=''>
              <div className='flex flex-col '>
                <div
                  className={`${
                    isUploading ? 'block' : 'hidden'
                  } `}
                >
                  <Image
                    src='/static/spinning-loading.gif'
                    height={200}
                    width={350}
                    alt='cover'
                    className='object-cover  rounded-md'
                  />
                </div>
                <div
                  className={`${
                    coverImageUrl ? 'block' : 'hidden'
                  } `}
                >
                  <Image
                    src={`${coverImageUrl ? coverImageUrl : '/'}`}
                    height={150}
                    width={300}
                    alt='cover'
                    className='object-cover rounded-md'
                  />
                </div>
                <div
                  className={` relative p-1 w-[200px] justify-center text-center border rounded-md items-center mt-2  ${
                    coverImageUrl ? 'hidden' : 'block'
                  }`}
                >
                  <input
                    className='opacity-0 z-10 cursor-pointer input-btn  relative '
                    type='file'
                    name='file'
                    accept='image/*'
                    onChange={this.uploadhandler}
                  />
                  <span className=' mx-4 my-2 font-semibold cursor-pointer  absolute cover-btn max-w-1/1 top-0 left-0'>
                    Add a cover image
                  </span>
                </div>
                <div
                  className={` relative p-1 w-[200px] justify-center  items-center text-center border-2 border-rose-500 rounded-md mt-2  ${
                    coverImageUrl ? 'block' : 'hidden'
                  }`}
                >
                  <div
                    onClick={this.removeCoverImage}
                    className=' font-bold cursor-pointer cover-btn text-[#ff0000]'
                  >
                    Remove Cover
                  </div>
                </div>
                <TitleInputComponent
                  titleEditorState={this.state.titleEditorState}
                  onChange={this.onChange}
                  handletopicTitleChange={this.handletopicTitleChange}
                  wordCount={this.state.titleCount}
                />
                <Select
                  value={category}
                  onChange={this.handleCategorySelect}
                  options={categories}
                  className='w-[300px] z-10  my-5 '
                  placeholder={'Select A Sutable Category'}
                />
                <ContentInputComponent
                  key={'dd'}
                  editorState={this.state.editorState}
                  onChange={this.onChange}
                  handletopicContentChange={this.handletopicContentChange}
                  contentHtml={this.state.contentHtml}
                />
              </div>
              <div className='flex rounded-lg cursor-pointer mx-0 py-1 w-full space-x-3 bg-gray-light px-1'>
                <div className='text-lg font-bold  w-fit px-8 py-1 rounded-lg bg-[#030010] text-[#ffffff]'>
                  <input type='submit' value='Publish' />
                </div>
                <div cl assName='text-xm font-bold text-[#030010] py-1  '>
                  <button>Save draft</button>
                </div>
              </div>
            </form>
          </div>
          <div>
            <NewTopicSidebarComponent />
          </div>
        </div>
      </div>
    );
  }
}

export default NewTopicComponent;
