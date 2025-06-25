import classNames from 'classnames/bind';
import styles from './Register.module.scss';
import { FaApple, FaGoogle } from 'react-icons/fa';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { registerApi } from '~/services/auth.service';

const cx = classNames.bind(styles);

function Register() {
    const navigate = useNavigate();
    const [inputData, setInputData] = useState({
        email: '',
        password: '',
        firstName: '',
        lastName: '',
        accountType: 'PERSONAL',
    });
    const [error, setError] = useState('');

    const handleRegister = async () => {
        try {
            await registerApi(
                inputData.email,
                inputData.password,
                inputData.accountType,
                inputData.firstName,
                inputData.lastName,
            );

            navigate('/login');
        } catch (err) {
            console.log('Lỗi khi register:', err);
            setError(err.response?.data?.message || 'Register failed!');
        }
    };

    return (
        <div className={cx('container')}>
            <div className={cx('card')}>
                <h1 className={cx('title')}>Sign up</h1>

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
                    placeholder="Họ"
                    value={inputData.lastName}
                    onChange={(e) =>
                        setInputData((prev) => ({
                            ...prev,
                            lastName: e.target.value,
                        }))
                    }
                />

                <input
                    className={cx('input')}
                    placeholder="Tên"
                    value={inputData.firstName}
                    onChange={(e) =>
                        setInputData((prev) => ({
                            ...prev,
                            firstName: e.target.value,
                        }))
                    }
                />

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

                <select
                    className={cx('input')}
                    value={inputData.accountType}
                    onChange={(e) =>
                        setInputData((prev) => ({
                            ...prev,
                            accountType: e.target.value,
                        }))
                    }
                >
                    <option value="PERSONAL">Personal</option>
                    <option value="COMPANY">Company</option>
                </select>

                <button className={cx('sign-in-btn')} onClick={handleRegister}>
                    Sign up
                </button>

                <div className={cx('join-now')}>
                    Have an account? <a href="/login">Sign in</a>
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

export default Register;

// Gọi `setState()` một lần duy nhất : Dùng trực tiếp state (`...formData`)
// Gọi `setState()` nhiều lần liền nhau : Dùng callback với `prev` (`...prev`)
