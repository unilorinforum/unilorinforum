import React, { Component } from 'react';
import dynamic from 'next/dynamic';
import Image from 'next/image';
import Select from 'react-select';
import axios from 'axios';
import Link from 'next/link';
import draftToHTML from 'draftjs-to-html';
import NewTopicSidebarComponent from '../sideBarComponent/newTopicSidebar.component';
import ContentInputComponent from './contentInput.Component';
import { wordCount, getLoggedInUser } from '../../functions';

const TitleInputComponent = dynamic(import('./titleInput.component'), {
  ssr: false,
  loading: () => <p>Loading...</p>,
});
// const ContentInputComponent = dynamic(import('./contentInput.Component'), {
//   ssr: false,
//   loading: () => <p>Loading...</p>,
// });

const categories = [
  { value: 'Campus Gossip', label: 'Campus Gossip' },
  { value: 'Campus Event', label: 'Campus Event' },
  { value: 'Campus Gist', label: 'Campus Gist' },
  { value: 'Campus Tips', label: 'Campus Tips' },
  { value: 'Campus Stories', label: 'Campus Stories' },
];
const adminCategories = [
  { value: 'Campus Gossip', label: 'Campus Gossip' },
  { value: 'Campus Event', label: 'Campus Event' },
  { value: 'Campus Gist', label: 'Campus Gist' },
  { value: 'Campus Tips', label: 'Campus Tips' },
  { value: 'strawberry', label: 'Strawberry' },
  { value: 'Campus Stories', label: 'Campus Stories' },
  { value: 'News', label: 'News' },
  { value: 'Annoucement', label: 'Annoucement' },
  { value: 'Sponsored', label: 'Sponsored' },
];

class NewTopicComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      topicTitle: '',
      topicContent: '',
      coverImage: '',
      isFetching: false,
      multiple: true,
      category: 0,
      cover: false,
      user: {},
      errmsg: '',
      titleCount: 0,
      contentCount: 0,
    };
  }
  componentDidMount() {
    const savedCat = window.localStorage.getItem('UF_SAVED_CAT');
    if (savedCat) this.setState({ category: JSON.parse(savedCat) });

    const savedTitle = window.localStorage.getItem('UF_TITLE_INPUT');
    if (savedTitle) {
      this.setState({ topicTitle: JSON.parse(savedTitle) });
    }
    const loggedInUser = getLoggedInUser();
    // console.log(loggedInUser);
    if (loggedInUser !== null) {
      this.setState({ user: loggedInUser });
    }
  }
  handletopicContentChange = (editorState) => {
    this.setState({
      topicContent: editorState,
    });
  };

  handletopicTitleChange = (titleEditorState) => {
    this.setState({
      topicTitle: titleEditorState,
    });

    const titleHtml = draftToHTML(this.state.topicTitle);
    const titleCount = wordCount(titleHtml);
    if (titleCount < 6) {
      this.setState({ errmsg: 'Title Must Be More Than 6 Words' });
    }
  };

  handleCategorySelect = (category) => {
    this.setState({ category });
    window.localStorage.setItem('UF_SAVED_CAT', JSON.stringify(category));
  };

  handleFormSubmit = async (e) => {
    e.preventDefault();
    const titleHtml = draftToHTML(this.state.topicTitle);
    console.log('title html', titleHtml);
    const contetntHtml = draftToHTML(this.state.topicContent);
    console.log('content html', contetntHtml);
    console.log(this.state.topicContent);

    const titleCount = wordCount(titleHtml);
    console.log('title count', titleCount);
    const contentCount = wordCount(contetntHtml);
    console.log('content count', contentCount);
    const cat = this.state.topicContent; //make states.

    if (contentCount < 25) {
      this.setState({ errmsg: 'Contetent Must Be More Than 25 Words' });
    } else if (cat) {
      this.setState({ errmsg: 'please kindly select a category' });
    }

    let payload = {
      title: this.state.topicTitle,
      articleCategory: this.state.category.value,
      topicContent: this.state.topicContent,
      coverImageUrl: this.state.coverImage,
      user_id: this.state.user.user_id,
    };

    console.log('payload:', payload);
    console.log('err:', this.state.errmsg);
    // try {
    //   const resp = await axios.post('/api/topics/create', payload);
    //   console.log(resp.data);
    // } catch (error) {
    //   console.log('error', error.respones);
    // }
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

  uploadhandler = (event) => {
    const image = event.target.files[0];
    console.log(image.name);
    image.isUploading = true;
    // this.setState({
    //   coverImage: image.name,
    // });
    const removeImage = () => {
      console.log('removed');
    };
    const formData = new FormData();
    formData.append('image', image, image.name);
    const response = axios
      .post('/api/uploads/imageupload', formData)
      .then((res) => {
        image.isUploading = false;
        console.log(res);
        // this.setState({
        //   coverImage: `hhh`,
        //   cover: true,
        // });
      })
      .catch((error) => {
        console.log(error);
        removeImage(image.name);
      });
  };

  render() {
    const { category, cover } = this.state;
    return (
      <div>
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
                <div className={`${cover ? 'block' : 'hidden'}`}>
                  <Image
                    // loader={myLoader}
                    src={'/'}
                    height={100}
                    width={300}
                    alt='man'
                    className='object-contain'
                  />
                </div>
                <div
                  className={` relative p-1 w-[200px] justify-center  items-center text-center border rounded-md mt-2  ${
                    cover ? 'hidden' : 'block'
                  }`}
                >
                  <input
                    className='opacity-0 cursor-pointer input-btn  relative '
                    type='file'
                    name='file'
                    onChange={this.uploadhandler}
                  />
                  <span className=' font-semibold cursor-pointer  absolute cover-btn w-1/1 top-0 left-0'>
                    {' '}
                    Add a cover image
                  </span>
                </div>
                <div
                  className={` relative p-1 w-[200px] justify-center  items-center text-center border-2 border-rose-500 rounded-md mt-2  ${
                    cover ? 'block' : 'hidden'
                  }`}
                >
                  <button className=' font-bold cursor-pointer cover-btn text-[#ff0000]'>
                    Remove Cover
                  </button>
                </div>
                <TitleInputComponent
                  titleEditorState={this.state.titleEditorState}
                  onChange={this.onChange}
                  handletopicTitleChange={this.handletopicTitleChange}
                />
                <Select
                  value={category}
                  onChange={this.handleCategorySelect}
                  options={categories}
                  className='w-[300px] z-10 my-5 '
                  placeholder={'Select A Sutable Category'}
                />
              </div>

              <ContentInputComponent
                key={'dd'}
                editorState={this.state.editorState}
                onChange={this.onChange}
                handletopicContentChange={this.handletopicContentChange}
              />
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
