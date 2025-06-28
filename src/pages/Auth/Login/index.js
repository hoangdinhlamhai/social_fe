import classNames from 'classnames/bind';
import styles from './Login.module.scss';
import { FaApple, FaGoogle } from 'react-icons/fa';
import { useState } from 'react';
import { loginApi } from '~/services/auth.service';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setAuth } from '~/redux/slices/authSlice';

const cx = classNames.bind(styles);

function Login() {
    const navigate = useNavigate();
    const [inputData, setInputData] = useState({ email: '', password: '' });
    const [error, setError] = useState('');

    const dispatch = useDispatch();

    const handleLogin = async () => {
        try {
            const res = await loginApi(inputData.email, inputData.password);

            // Lưu accessToken và userLogin
            dispatch(setAuth({ accessToken: res.accessToken, accountLogin: res.accountLogin }));

            navigate('/');
        } catch (err) {
            console.log('Lỗi khi login:', err);
            setError(err.response?.data?.message || 'Login failed!');
        }
    };

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

                <input
                    className={cx('input')}
                    placeholder="Email or phone"
                    value={inputData.email}
                    onChange={(e) =>
                        setInputData((prev) => ({
                            ...prev,
                            email: e.target.value,
                        }))
                    }
                />
                <div className={cx('password-container')}>
                    <input
                        className={cx('input')}
                        value={inputData.password}
                        type="password"
                        placeholder="Password"
                        onChange={(e) =>
                            setInputData((prev) => ({
                                ...prev,
                                password: e.target.value,
                            }))
                        }
                    />
                    <button className={cx('show-btn')}>Show</button>
                </div>

                <a href="#" className={cx('forgot-password')}>
                    Forgot password?
                </a>

                <button className={cx('sign-in-btn')} onClick={handleLogin}>
                    Sign in
                </button>

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

// Gọi `setState()` một lần duy nhất : Dùng trực tiếp state (`...formData`)
// Gọi `setState()` nhiều lần liền nhau : Dùng callback với `prev` (`...prev`)
