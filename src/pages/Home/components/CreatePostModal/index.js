import Modal from 'react-modal';
import classNames from 'classnames/bind';
import styles from './CreatePostModal.module.scss';
import { FaImage } from 'react-icons/fa';
import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import axios from 'axios';

const cx = classNames.bind(styles);

//chỉ định phần tử gốc của ứng dụng React (thường là #root) để khi mở modal,
//nội dung bên ngoài modal sẽ bị ẩn khỏi trình đọc màn hình (screen readers).
Modal.setAppElement('#root');

function CreatePostModal({ isOpen, onRequestClose }) {
    const [postData, setPostData] = useState(null);
    const [profileData, setProfileData] = useState(null);
    const { accessToken, accountLogin } = useSelector((state) => state.auth);

    useEffect(() => {
        axios
            .get(`http://localhost:8080/api/me`, {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
            })
            .then((res) => {
                setProfileData(res.data);
            })
            .catch((err) => {
                console.error(err);
            });
    });

    if (!profileData) {
        return <div>Đang tải thông tin người dùng...</div>; // hoặc loader component
    }

    return (
        <Modal isOpen={isOpen} className={cx('postForm', 'modal')} overlayClassName={cx('overlay')}>
            <div className={cx('header')}>
                <div className={cx('left')}>
                    <img className={cx('avatar')} src={profileData.avatarUrl} alt="avatar" />
                    <div className={cx('userInfo')}>
                        <div className={cx('name')}>
                            {profileData.lastName} {profileData.firstName}
                        </div>
                        <div className={cx('privacy')}>Đăng bài ở chế độ Bất cứ ai ▾</div>
                    </div>
                </div>
                <button className={cx('close-btn')} onClick={onRequestClose}>
                    ×
                </button>
            </div>

            <textarea className={cx('contentInput')} placeholder="Bạn muốn nói về chủ đề gì?" />

            <div className={cx('actions')}>
                <div className={cx('leftIcons')}>
                    <button>
                        <FaImage className={cx('icon')} />
                    </button>
                </div>
                <div className={cx('rightActions')}>
                    <button className={cx('scheduleBtn')}>
                        <i className="far fa-clock"></i>
                    </button>
                    <button className={cx('postBtn')} disabled>
                        Đăng bài
                    </button>
                </div>
            </div>
        </Modal>
    );
}

export default CreatePostModal;
