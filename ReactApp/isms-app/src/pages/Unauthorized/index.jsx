import React from 'react'
import { useNavigate } from "react-router-dom"
import classNames from 'classnames/bind';
import styles from './Unauthorized.module.scss';
import { BsFillSignStopFill } from 'react-icons/bs';
import useAuth from '../../hooks/useAuth';

const cx = classNames.bind(styles);

const Unauthorized = () => {
  const {auth} = useAuth();
  const navigate = useNavigate();
  const goBack = () => {
    if(auth.roletype === "Admin" || auth.roletype === "Agent") navigate('/admin/all/null');
    else navigate('/')
  }

  return (
    <div className='w-full'>
      <div className={cx('error-page')}>
        <div className='mb-[2rem]'>
          <BsFillSignStopFill class={cx('material-icons')} />
        </div>
        <h4 className='text-[2rem] font-medium'>Page Forbidden</h4>
        <p>Sorry, you are not authorized to view this page.</p>
      </div>
      <div className='w-[100%] mt-[10rem]  flex items-center justify-center '>
        <div onClick={goBack} className={cx('w-[15%] px-[1rem] py-[0.5rem] bg-[#2093d6] text-[#fff] text-center font-medium cursor-pointer')}>Back To Home Page</div>
      </div>
      
    </div>
  )
}

export default Unauthorized;