import classNames from 'classnames/bind';
import styles from './Login.module.scss';
import React from 'react'


const cx = classNames.bind(styles);

const Login = () => {
  return (
    <div className={cx('login-container')}>
      <div className={cx('content')}>Content</div>
      <div className={cx('separate')}></div>
    </div>
  )
}

export default Login
