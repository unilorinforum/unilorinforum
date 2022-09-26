import React, { Component } from 'react';
import dynamic from 'next/dynamic';
import Image from 'next/image';
import Select from 'react-select';
import axios from 'axios';
import Link from 'next/link';
import draftToHTML from 'draftjs-to-html';
import NewTopicSidebarComponent from '../sideBarComponent/newTopicSidebar.component';
import { wordCount, getLoggedInUser, getSavedTitle } from '../../functions';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useDropzone } from 'react-dropzone';
import { adminCategories, categories } from '../../common/categories';

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
      coverImage: '',
      coverImageUrl: '',
      isFetching: false,
      multiple: true,
      category: 0,
      user: {},
      errmsg: null,
      titleCount: 0,
      contentCount: 0,
      isOpen: false,
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
  // componentWillMount() {
  //   const rawContent = JSON.parse(localStorage.getItem('UF_TITLE_INPUT'));
  //   if (rawContent !== null) {
  //     this.setState({ topicTitle: draftToHTML(rawContent) });
  //   }
  // }
  handletopicContentChange = (editorState) => {
    this.setState({
      topicContent: editorState,
    });
    const contentHtml = draftToHTML(editorState);
    const contentCount = wordCount(contentHtml);
    this.setState({ contentCount: contentCount });

    if (contentCount < 30) {
      this.setState({ errmsg: 'Content is too short' });
    }
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
    const titleCount = wordCount(titleHtml);
    this.setState({ titleCount: titleCount });
    // console.log(this.state.titleCount);
  };

  handleCategorySelect = (category) => {
    this.setState({ category });
    window.localStorage.setItem('UF_SAVED_CAT', JSON.stringify(category));
  };

  handleFormSubmit = async (e) => {
    e.preventDefault();
    if (this.state.titleCount < 4) {
      this.setState({
        errmsg: 'Title is to short, make your title discriptive',
      });
      this.showErrorMessage(this.state.errmsg);
    } else if (this.state.contentCount < 6) {
      this.setState({
        errmsg: 'Your Content is too short',
      });
      this.showErrorMessage(this.state.errmsg);
    } else if (this.state.category == 0) {
      this.setState({
        errmsg: 'Pls Select a category',
      });
      this.showErrorMessage(this.state.errmsg);
    } else {
      const titleHtml = draftToHTML(this.state.topicTitle);
      const contentHtml = draftToHTML(this.state.topicContent);
      let payload = {
        title: titleHtml,
        articleCategory: this.state.category.value,
        topicContent: contentHtml,
        coverImageUrl: this.state.coverImage,
        user_id: this.state.user.user_id,
        author: this.state.user.username,
      };

      console.log('payload:', payload);

      try {
        const respones = await axios.post('/api/topics/create', payload);
        console.log(respones.data);
      } catch (error) {
        console.log('error', error.respones);
      }
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
  showErrorMessage = (message) => {
    toast.error(message, {
      position: toast.POSITION.TOP_RIGHT,
    });
  };
  uploadhandler = async (event) => {
    const image = event.target.files[0];
    console.log(image);
    image.isUploading = true;
    this.setState({
      coverImage: URL.createObjectURL(image),
    });
    const removeImage = () => {
      this.setState({
        coverImage: false,
      });
    };

    try {
      const formData = new FormData();

      formData.append('image', image, image.name);
      const response = await axios.post('/images/cover-upload', formData);
      image.isUploading = false;
      console.log('response', response);
      this.setState({
        coverImageUrl: `hhh`,
        cover: true,
      });
    } catch (error) {
      console.log(error);
      removeImage();
    }
  };

  render() {
    const { category, coverImage } = this.state;
    return (
      <div>
        <ToastContainer />
        <div className='pt-2 items-center bg-gray-light'>
          <div className='flex items-center p-2 pt-0 justify-between '>
            <div className='flex items-center cursor-pointer space-x-3'>
              <span className=' md:text-3xl flex items-center text-center py-1 px-3 rounded-lg  text-[#ffff] bg-[#000000] '>
                <Link href='/'>
                  <a>App</a>
                </Link>
              </span>
              <span className='text-xl font-bold'>Create Post</span>
            </div>
            <div className='space-x-2'>
              <button>Edit</button>
              <button> Preview</button>
            </div>
            <button>x</button>
          </div>
        </div>

        <div className='flex  min-h-screen bg-gray-light pt-2 justify-around  '>
          <div className='flex overflow-scroll mx-0 p-2  mt-6 bg-[#ffff] rounded-md text-[#000] justify-around min-h-[560px] md:h-[560px] w-[700px] max-w-[750px]  space-y-2 '>
            <form onSubmit={this.handleFormSubmit} className='w-full'>
              <div className='flex flex-col w-full '>
                <div className={`${coverImage ? 'block' : 'hidden'}`}>
                  <Image
                    src={this.state.coverImage}
                    height={100}
                    width={300}
                    alt='cover'
                    className='object-cover rounded-md'
                  />
                </div>
                <div
                  className={` relative p-1 w-[200px] justify-center text-center border rounded-md items-center mt-2  ${
                    coverImage ? 'hidden' : 'block'
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
                    coverImage ? 'block' : 'hidden'
                  }`}
                >
                  <div
                    onClick={(e) => {
                      e.preventDefault;
                      this.setState({
                        coverImage: '',
                      });
                    }}
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
              <div className='flex cursor-pointer space-x-2'>
                <div className='text-lg font-bold border-2 w-fit px-8 py-1 rounded-lg bg-[#030010] text-[#ffffff]'>
                  <input type='submit' value='Publish' />
                </div>
                <div className='text-xm font-bold  py-1  '>
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
