import React, { useState } from 'react';
import FormInput from '../components/formInputComponent/forminput.component';
import Header from '../components/headerComponent/header.component';
import { BsGoogle, BsFacebook } from 'react-icons/bs';
import Link from 'next/link';

export default function Login() {
  const initialValues = {
    email: '',
    password: '',
  };
  const [formValues, setFormValues] = useState(initialValues);

  const handleChange = (event) => {
    console.log(formValues, 'oop');
    const { name, value } = event.target;
    console.log(name, value);
    setFormValues({ ...formValues, [name]: value });
  };

  const handleSubmmit = async (event) => {
    // console.log(formValues);
    event.preventDefault();
    const data = formValues;
    console.log(data, 'ooo');
    const JSONdata = JSON.stringify(data);

    const endPoint = 'http://localhost:4000/api/users/login';
    const options = {
      method: 'post',
      headers: {
        'content-Type': 'application/json',
      },
      body: JSONdata,
    };

    const response = await fetch(endPoint, options);
    const result = await response.json();
    console.log(result.message);
    // alert(`${result.message}`);
    // return result.message;
  };

  return (
    <>
      <Header />
      <div className='flex flex-col md:justify-center  items-center bg-[#000000] w-full h-screen '>
        <div className='flex flex-col justify-center mb-3 mt-12 items-center '>
          <h2 className='text-[#F1CB97] text-5xl font-bold '>Wellcome Back!</h2>
          <span className='font-bold text-[#F1CB97] text-sm mt-2'>
            please login into your Forum Account
          </span>
        </div>
        <div className='bg-[#01183a] bg-gradient-to-l w-[361px] rounded-sm sm:mx-2 from-[#c6d7f4] px-10 mt-4 pt-2 h-min '>
          <form
            onSubmit={handleSubmmit}
            className='flex flex-col justify-between items-center mt-7'
          >
            <FormInput
              name='email'
              type='email'
              value={initialValues.email}
              required
              handleChange={handleChange}
              placeholder='Enter e-mail or Username'
            />
            <FormInput
              name='password'
              type='password'
              value={initialValues.password}
              handleChange={handleChange}
              required
              placeholder='Enter password'
            />
            <input
              className=' font-bold text-center text-[#faf9f9] w-[240px] h-[40px] bg-[#002D72] mt-8 cursor-pointer rounded-full border-2 '
              type='submit'
              value='Login'
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
            <div className='flex flex-col justify-center items-center space-y-7 mt-4'>
              <div className='text-[#e5e3e1] font-bold'>
                Or did you{' '}
                <span className='text-[#120339] font-bold'>
                  {' '}
                  <Link href='/forgotpassword'>forgot password?</Link>
                </span>
              </div>
              <div className=' mb-5 pb-6 text-[#e5e3e1] font-bold'>
                are you new here?{' '}
                <span className='text-[#120339] font-bold'>
                  <Link href='/sign-up'>sign up</Link>
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

// import React, { Component } from 'react';
// import FormInput from '../components/formInputComponent/forminput.component';
// import Header from '../components/headerComponent/header.component';
// import { BsGoogle, BsFacebook } from 'react-icons/bs';
// import Link from 'next/link';

// const SocialLogin = {
//   color: '#ffffff',
//   size: '15px',
// };

// const styles = {
//   mainContainer:
//     'flex flex-col md:justify-center  items-center bg-[#000000] w-full h-screen ',
//   wellcomeTextContainer:
//     'flex flex-col justify-center mb-3 mt-12 items-center ',
// };

// export default class Login extends Component {
//   constructor(props) {
//     super(props);

//     this.state = {
//       email: '',
//       password: '',
//     };
//   }
//   handleSubmmit = (event) => {
//     event.preventDefault();
//     this.setState({ email: '', password: '' });
//   };
//   handleChange = (event) => {
//     const { value, name } = event.target;
//     this.setState({ [name]: value });
//   };

//   render() {
//     return (
//       <>
//         <Header />
//         <div className='flex flex-col md:justify-center  items-center bg-[#000000] w-full h-screen '>
//           <div className='flex flex-col justify-center mb-3 mt-12 items-center '>
//             <h2 className='text-[#F1CB97] text-5xl font-bold '>
//               Wellcome Back!
//             </h2>
//             <span className='font-bold text-[#F1CB97] text-sm mt-2'>
//               please login into your Forum Account
//             </span>
//           </div>
//           <div className='bg-[#01183a] bg-gradient-to-l w-[361px] rounded-sm sm:mx-2 from-[#c6d7f4] px-10 mt-4 pt-2 h-min '>
//             <form
//               onSubmit={this.handleSubmmit}
//               className='flex flex-col justify-between items-center mt-7'
//             >
//               <FormInput
//                 name='email'
//                 type='email'
//                 value={this.state.email}
//                 required
//                 handleChange={this.handleChange}
//                 placeholder='Enter e-mail or Username'
//               />
//               <FormInput
//                 name='password'
//                 type='password'
//                 value={this.state.password}
//                 handleChange={this.handleChange}
//                 required
//                 placeholder='Enter password'
//               />
//               <input
//                 className=' font-bold text-center text-[#faf9f9] w-[240px] h-[40px] bg-[#002D72] mt-8 cursor-pointer rounded-full border-2 '
//                 type='submit'
//                 value='Login'
//               />
//             </form>
//             <div className='flex flex-col justify-items-center '>
//               <span className='mt-6 text-center font-bold text-[#f4f2ef] '>
//                 or sign up with Google
//               </span>
//               <div className='flex justify-center space-x-4 mt-6 justify-self-center '>
//                 <span className='cursor-pointer bg-[#002d72] p-2 rounded-md '>
//                   <BsGoogle style={SocialLogin} />
//                 </span>
//                 <span className='cursor-pointer bg-[#002d72] p-2  rounded-md '>
//                   <BsFacebook style={SocialLogin} />
//                 </span>
//               </div>
//               <div className='flex flex-col justify-center items-center space-y-7 mt-4'>
//                 <div className='text-[#e5e3e1] font-bold'>
//                   Or did you{' '}
//                   <span className='text-[#120339] font-bold'>
//                     {' '}
//                     <Link href='/forgotpassword'>forgot password?</Link>
//                   </span>
//                 </div>
//                 <div className=' mb-5 pb-6 text-[#e5e3e1] font-bold'>
//                   are you new here?{' '}
//                   <span className='text-[#120339] font-bold'>
//                     <Link href='/sign-up'>sign up</Link>
//                   </span>{' '}
//                   Instead
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </>
//     );
//   }
// }
