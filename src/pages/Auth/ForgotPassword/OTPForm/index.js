import classNames from 'classnames/bind';
import styles from './OTPForm.module.scss';
import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';

const cx = classNames.bind(styles);

function OTPForm() {
    const navigate = useNavigate();
    const [otp, setOtp] = useState('');
    const [timeLeft, setTimeLeft] = useState(60);
    const [disabled, setDisabled] = useState(true);
    const [error, setError] = useState('');
    const dispatch = useDispatch();

    const handleVerify = async () => {
        try {
            navigate('/');
        } catch (err) {
            console.log('Lỗi khi login:', err);
            setError(err.response?.data?.message || 'Login failed!');
        }
    };

    //setInterval nhận callback function
    useEffect(() => {
        let timer = setInterval(() => {
            setTimeLeft((prev) => prev - 1);
        }, 1000);

        if (timeLeft <= 0) {
            clearInterval(timer);
            setDisabled(false);
        }

        return () => {
            clearInterval(timer); // cleanup khi unmount
        };
    }, [timeLeft]);

    return (
        <div className={cx('container')}>
            <div className={cx('card')}>
                <h1 className={cx('title')}>Verify OTP</h1>

                <input
                    className={cx('input')}
                    placeholder="Enter OTP"
                    value={otp}
                    onChange={(e) => setOtp(e.target.value)}
                />

                <button className={cx('send-btn')} onClick={handleVerify}>
                    Verify
                </button>

                <button className={cx('resend-btn')} disabled={disabled}>
                    {disabled ? `Resend OTP in ${timeLeft}s` : 'Click to resend OTP'}
                </button>

                <Link className={cx('join-now')} to="/forgot-password">
                    Back
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

export default OTPForm;

// Gọi `setState()` một lần duy nhất : Dùng trực tiếp state (`...formData`)
// Gọi `setState()` nhiều lần liền nhau : Dùng callback với `prev` (`...prev`)
