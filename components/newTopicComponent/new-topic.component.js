import React, { Component } from 'react';
import dynamic from 'next/dynamic';
import Image from 'next/image';
import axios from 'axios';
import NewTopicSidebarComponent from '../sideBarComponent/newTopicSidebar.component';
const ContentInputComponent = dynamic(
  import('../inputComponent/contentInput.component'),
  {
    ssr: false,
    loading: () => <p>Loading...</p>,
  }
);
const TitleInputComponent = dynamic(
  import('../inputComponent/titleInput.component'),
  {
    ssr: false,
    loading: () => <p>Loading...</p>,
  }
);
const TagInputComponent = dynamic(
  import('../inputComponent/tagInput.component'),
  {
    ssr: false,
    loading: () => <p>Loading...</p>,
  }
);

class NewTopicComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      TopicTitle: '',
      articleDescription: '',
      coverImage: '',
      isFetching: false,
      multiple: true,
      search: true,
      searchQuery: null,
      value: [],
      cover: false
    };
  }

  handleArticleDescriptionChange = (editorState) => {
    this.setState({
      articleDescription: editorState,
    });

    //       this.saveContent(contentState);

    //  this.setState({editorState});
  };
  handleTopicTitleChanage = (editorState) => {
    this.setState({
      TopicTitle: editorState,
    });

    //       this.saveContent(contentState);

    //  this.setState({editorState});
  };

  handleFormSubmit = async (e) => {
    e.preventDefault();

    let payload = {
      title: this.state.TopicTitle,
      articleCategory: this.state.value,
      articleDesc: this.state.articleDescription,
      articleurl: this.state.coverImage,
    };

    console.log('pacy:', payload);
    try{
        const resp = await axios.post('http://localhost:4000/api/topics', payload, )
        console.log(resp.data)
    } catch(error){
      console.log('error',error.respones)

    }

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
    axios
      .post('http://localhost:4000/api/images/upload', formData)
      .then((res) => {
        image.isUploading = false;
        console.log(res.data.url);
        this.setState({
          coverImage: `http://localhost:4000/uploads/${res.data.url}`,
          cover:true
        });
      })
      .catch((error) => {
        console.log(error);
        removeImage(image.name);
      });
  };

  render() {
    const  cover = this.state.cover
    return (
      <div>
        <div className='pt-2 items-center bg-gray-light'>
          <div className='flex items-center p-2 pt-0 justify-between '>
            <div className='flex items-center cursor-pointer space-x-3'>
              <span className=' md:text-3xl flex items-center text-center py-1 px-3 rounded-lg  text-[#ffff] bg-[#000000] '>
                App
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
        <div className='flex  h-screen bg-gray-light pt-2 justify-around  '>
          <div className='flex overflow-scroll mx-0 p-2  mt-6 bg-[#ffff] rounded-md text-[#000] justify-around h-[560px] w-[700px] max-w-[750px]  space-y-2 '>
            <form onSubmit={this.handleFormSubmit} className='w-full'>
              <div className='flex flex-col w-full '>
                <div className={`${cover ? "block" : "hidden"}`}>
                  <Image
                    // loader={myLoader}
                    src={this.state.coverImage}
                    height={100}
                    width={300}
                    alt='man'
                    className='object-contain'
                  />
                </div>
                <div className={` relative p-1 w-[200px] justify-center  items-center text-center border rounded-md mt-2  ${cover ? "hidden" : "block"}`}>
                  <input
                    className='opacity-0 cursor-pointer input-btn  relative '
                    type='file'
                    name='image'
                    onChange={this.uploadhandler}
                  />
                  <span className=' font-semibold cursor-pointer  absolute cover-btn w-1/1 top-0 left-0'>
                    {' '}
                    Add a cover image
                  </span>
                </div>
                <div className={` relative p-1 w-[200px] justify-center  items-center text-center border-2 border-rose-500 rounded-md mt-2  ${cover ? "block" : "hidden"}`}>
                  
                  <button className=' font-bold cursor-pointer cover-btn text-[#ff0000]'>
                    Remove Cover
                  </button>
                </div>

                <TitleInputComponent
                  editorState={this.state.editorState}
                  onChange={this.onChange}
                  handleTopicTitleChanage={this.handleTopicTitleChanage}
                />
                <TagInputComponent />
              </div>
              <ContentInputComponent
                editorState={this.state.editorState}
                onChange={this.onChange}
                handleArticleDescriptionChange={
                  this.handleArticleDescriptionChange
                }
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
