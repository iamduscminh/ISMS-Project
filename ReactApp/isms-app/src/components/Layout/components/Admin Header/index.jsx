import React from 'react'
import classNames from 'classnames/bind';
import styles from './AdminHeader.module.scss';
import image from '../../../../assets/images';
import { AiFillSetting } from 'react-icons/ai';
import { IoMdNotifications } from 'react-icons/io';
import Tippy from '@tippyjs/react/headless';
import TippyItem from '../../../Elements/TippyItem';

const cx = classNames.bind(styles);

const AdminHeader = () => {
  return (
    <div className={cx('h-[7%] w-full bg-[#7F91B0] flex')}>
      <div className={cx('w-[10%] h-full flex justify-center items-center')}>
        <img src={image.logo} alt="" className={cx('w-[100%] h-[100%] ml-[2rem]')} />
      </div>
      <div className={cx('w-[40%] flex justify-center items-center bg-[#7F91B0] ml-[3rem]')}>
        <div className={cx('selection')}>
          <div className={cx('item')}>
            <span className={cx('item-top')}>Analysis</span>
            <span className={cx('item-bot')}>Data and Report</span>
          </div>
          <div className={cx('item-border')}>
            <span className={cx('item-top')}>Groups</span>
            <span className={cx('item-bot')}>Users and Roles </span>
          </div>
          <div className={cx('item-border')}>
            <span className={cx('item-top')}>Knowledge</span>
            <span className={cx('item-bot')}>Base and Report</span>
          </div>
        </div>
      </div>
      <div className={cx('ml-auto flex justify-center items-center mr-4')}>
        <Tippy
          interactive
          visible
          placement='bottom-end'
          render={attrs => (
            <div className={cx('tippy-wrapper')} tabIndex="-1" {...attrs}>
              <h1 className='w-full h-[10%] text-[0.75rem] text-[#172b4d] font-medium '>Settings</h1>
              <div>
                <h2 className='text-[0.6rem] text-[#172b4d] '>QuickService Settings</h2>
                <TippyItem/>
              </div>
              <div>
                <h2 className='text-[0.6rem] text-[#172b4d] '>Personal Settings</h2>
              </div>
            </div>
          )}
        >
          <div className="h-[50%] aspect-square m-[0.5rem] cursor-pointer">
            <AiFillSetting className='w-full h-full text-[#fff]' />
          </div>
        </Tippy>

        <div className="h-[50%] aspect-square m-[0.5rem] cursor-pointer">
          <IoMdNotifications className='w-full h-full text-[#fff]' />
        </div>
      </div>
    </div>
  )
}

export default AdminHeader