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
          <div><a href="#"><UnderlineAnimation>About Us</UnderlineAnimation></a></div>
          <div><a href="#"><UnderlineAnimation>Term and conditions</UnderlineAnimation></a></div>
          <div><a href="#"><UnderlineAnimation>Privacy Statement</UnderlineAnimation></a></div>
          <div>©️2023 QuickService. All right reserved.</div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
