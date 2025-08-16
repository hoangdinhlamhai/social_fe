import classNames from 'classnames/bind';
import styles from './EmailForm.module.scss';
import { useState } from 'react';
import { loginApi } from '~/services/auth.service';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setAuth } from '~/redux/slices/authSlice';
import { GoogleLogin } from '@react-oauth/google';
import { jwtDecode } from 'jwt-decode';
import { loginWithGoogleApi } from '~/services/auth.service';

const cx = classNames.bind(styles);

function EmailForm() {
    const navigate = useNavigate();
    const [inputData, setInputData] = useState({ email: '', password: '' });
    const [error, setError] = useState('');
    const dispatch = useDispatch();

    const handleLogin = async () => {
        try {
            navigate('/verify-otp');
        } catch (err) {
            console.log('Lỗi khi login:', err);
            setError(err.response?.data?.message || 'Login failed!');
        }
    };

    return (
        <div className={cx('container')}>
            <div className={cx('card')}>
                <h1 className={cx('title')}>Forgot Password</h1>

                <input
                    className={cx('input')}
                    placeholder="Enter your email"
                    value={inputData.email}
                    onChange={(e) =>
                        setInputData((prev) => ({
                            ...prev,
                            email: e.target.value,
                        }))
                    }
                />

                <button className={cx('send-btn')} onClick={handleLogin}>
                    Send OTP
                </button>

                <Link className={cx('join-now')} to="/login">
                    Login
                </Link>
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

export default EmailForm;

// Gọi `setState()` một lần duy nhất : Dùng trực tiếp state (`...formData`)
// Gọi `setState()` nhiều lần liền nhau : Dùng callback với `prev` (`...prev`)
