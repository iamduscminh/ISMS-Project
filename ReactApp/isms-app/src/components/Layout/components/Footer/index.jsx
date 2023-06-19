import classNames from 'classnames/bind';
import styles from './Footer.module.scss';
import image from '../../../../assets/images';
import UnderlineAnimation from '../../../Animation/UnderlineText';

//Initialize the binding object corresponding to the classes on the scss file
const cx = classNames.bind(styles);

function Footer() {
  return (
    <footer className = {cx('footer')}>
      <div className={cx('footer-inner-container')}>
        <div className={cx('footer-logo')}>
          <img src={image.shortLogo} alt="" />
          <div><span>Boost Productivity, choose QuickService</span></div>
        </div>
        <div className={cx('footer-link')}>
          <div><UnderlineAnimation><a href="#">About Us</a></UnderlineAnimation></div>
          <div><UnderlineAnimation><a href="#">Term and conditions</a></UnderlineAnimation></div>
          <div><UnderlineAnimation><a href="#">Privacy Statement</a></UnderlineAnimation></div>
          <div>©️2023 QuickService. All right reserved.</div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
