import classNames from 'classnames/bind';
import styles from './Login.module.scss';
import { FaApple, FaGoogle } from 'react-icons/fa';

const cx = classNames.bind(styles);

function Login() {
    return (
        <div className={cx('container')}>
            <div className={cx('card')}>
                <h1 className={cx('title')}>Sign in</h1>

                <button className={cx('oauth-btn')}>
                    <FaGoogle /> Continue as Hải
                </button>

                <button className={cx('oauth-btn')}>
                    <FaApple /> Sign in with Apple
                </button>

                <div className={cx('divider')}>
                    <span>or</span>
                </div>

                <input className={cx('input')} placeholder="Email or phone" />
                <div className={cx('password-container')}>
                    <input className={cx('input')} type="password" placeholder="Password" />
                    <button className={cx('show-btn')}>Show</button>
                </div>

                <a href="#" className={cx('forgot-password')}>
                    Forgot password?
                </a>

                <button className={cx('sign-in-btn')}>Sign in</button>

                <div className={cx('join-now')}>
                    New to LinkedIn? <a href="#">Join now</a>
                </div>
            </div>

            <footer className={cx('footer')}>
                <span>LinkedIn © 2025</span>
                <a href="#">User Agreement</a>
                <a href="#">Privacy Policy</a>
                <a href="#">Community Guidelines</a>
                <a href="#">Cookie Policy</a>
                <a href="#">Copyright Policy</a>
                <a href="#">Send Feedback</a>
                <a href="#">Language</a>
            </footer>
        </div>
    );
}

export default Login;
