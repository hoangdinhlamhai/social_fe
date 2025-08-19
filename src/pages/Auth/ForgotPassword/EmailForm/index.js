import classNames from 'classnames/bind';
import styles from './EmailForm.module.scss';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setAuth } from '~/redux/slices/authSlice';
import { checkEmailExistsApi, sendOtpApi } from '~/services/sendOtp.service';

const cx = classNames.bind(styles);

function EmailForm() {
    const navigate = useNavigate();
    const [inputData, setInputData] = useState('');
    const [error, setError] = useState('');
    const dispatch = useDispatch();

    const handleSendOTP = async () => {
        try {
            const emailExists = await checkEmailExistsApi(inputData);

            if (!emailExists) {
                setError('Email does not exist!');
            } else {
                await sendOtpApi(inputData);
                navigate('/verify-otp');
            }
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
                    value={inputData}
                    onChange={(e) => setInputData(e.target.value)}
                />

                {error && <p className={cx('error')}>{error}</p>}

                <button className={cx('send-btn')} onClick={handleSendOTP}>
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
