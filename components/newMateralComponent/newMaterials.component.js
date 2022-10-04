import React, {useState} from 'react';
import dynamic from 'next/dynamic';
import { FaUpload } from 'react-icons/fa';
import { AiFillDelete } from 'react-icons/ai';
import Select from 'react-select';
import NewPostHeaderComponent from '../headerComponent/newPostHeader.component';
import NewMaterialSideBarComponent from '../sideBarComponent/newMaterialSideBar.component';
const DiscriptionInputComponent = dynamic(import('./descriptionInput.component'), {
  ssr: false,
  loading: () => <p>Loading...</p>,
});
const MaterialsTitleInputComponent = dynamic(
  import('./MaterialsTitleinput.component'),
  {
    ssr: false,
    loading: () => <p>Loading...</p>,
  }
);

const NewMaterialsComponent = () => {
const [titleEditorState, setTitleEditorState] = useState({}) 
const [discriptionEditorState, setDiscriptionEditorState] = useState({}); 

const onChange = () => {

};
 const handletopicTitleChange = (titleEditorState) => {
   setTitleEditorState(titleEditorState)
    // const titleHtml = draftToHTML(titleEditorState);
  };
  const handleDiscriptionEditorStatetChange = (editorState) => {
    setDiscriptionEditorState(editorState);
  };

    return (
      <>
        <NewPostHeaderComponent />
        <div className='flex justify-between space-x-9  items-center'>
          <div className=' flex flex-col p-2 min-h-screen  md:w-1/2 w-screen text-lg font-normal'>
            <div>
              <div className='rounded-md border border-[#dbccf5] items-center text-center w-full '>
                <MaterialsTitleInputComponent
                  titleEditorState={titleEditorState}
                  handletopicTitleChange={handletopicTitleChange}
                />
              </div>
              <Select
                // value={category}
                // onChange={this.handleCategorySelect}
                // options={categories}
                className='w-full z-10  my-5 '
                placeholder={'Select A Sutable Category'}
              />
              <div className='rounded-md min-h-[100px] border border-[#dbccf5] w-full'>
                <DiscriptionInputComponent
                  editorState={discriptionEditorState}
                  handletopicContentChange={handleDiscriptionEditorStatetChange}
                />
              </div>
            </div>
            <div className='uploadarea w-full bg-[#eeeeee] border border-[#dbccf5] mt-4 px-2 mx-1 rounded-md min-h-[200px] flex flex-col items-center '>
              <div className='bg-[#ffffff] w-1/2  flex flex-col justify-center items-center h-[80px] my-2 relative p-2 rounded-md '>
                <input
                  className='opacity-0 z-10 cursor-pointer input-btn  relative '
                  type='file'
                  name='file'
                />
                <span className=' absolute flex flex-col items-center   max-w-1/1'>
                  <FaUpload className='text-3xl' />
                  <span className=' text-center text-2xl font-bold '>
                    Upload
                  </span>
                </span>
              </div>
              <div className='flex flex-col py-2 space-y-1 w-full items-center '>
                <div className='flex  rounded-sm items-center bg-[#fff] space-x-4 max-w-11/12 x px-2 '>
                  <span className='font-bold whitespace-normal p-1 w-11/12 leading-4 break-words'>
                    tripple hay gns 111
                  </span>
                  <AiFillDelete />
                </div>
              </div>
            </div>
            <div className='flex cursor-pointer my-2 py-1 w-full space-x-3 bg-[#eeeeee] px-1'>
              <div className='text-lg font-bold  w-fit px-8 py-1 rounded-lg bg-[#030010] text-[#ffffff]'>
               
                <span>Publish</span>
              </div>
              <div cl assName='text-xm font-bold text-[#030010] py-1  '>
                <button>Save draft</button>
              </div>
            </div>
          </div>
          <NewMaterialSideBarComponent />
        </div>
      </>
    );
}

export default NewMaterialsComponent;
