import React from 'react'
import { GoogleLogin } from '@react-oauth/google';
import loginBackground from '../assets/login-background.jpeg';
import logo from '../assets/logo-white.png';
import { useNavigate } from 'react-router-dom';
import jwt_decode from 'jwt-decode';
import { client } from '../client'

function Login() {

  const navigate = useNavigate();

  const responseGoogle = (response) => {

      const userResponse = jwt_decode(response.credential);

      localStorage.setItem('user', JSON.stringify(userResponse));
      const { name, sub, picture } = userResponse;

      const doc = {
          _id: sub,
          _type: 'user',
          userName: name,
          image: picture
      }
    
      client.createIfNotExists(doc).then(()=>{
        navigate('/', {replace: true})
    });

  };

  return (
    <div className='flex justify-start items-center flex-col h-screen'>
      <div className='relative w-full h-full'>
          <img className='w-full h-full object-cover' src={loginBackground} alt='background' />
          <div className='absolute flex flex-col justify-center items-center top-0 right-0 left-0 bottom-0 bg-blackOverlay'>
            <div className='p-5'>
              <img src={logo} width='400px' alt='logo'/>
            </div>
            <div className='shadow-2xl'>
              <GoogleLogin
                onSuccess={responseGoogle}
                onError={responseGoogle}
              />
            </div>
          </div>
      </div>
    </div>
  )
}

export default Login;