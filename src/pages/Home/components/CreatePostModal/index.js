import Modal from 'react-modal';
import classNames from 'classnames/bind';
import styles from './CreatePostModal.module.scss';
import { FaImage } from 'react-icons/fa';
import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { getMeProfileApi } from '~/services/user.service';
import { createPostApi } from '~/services/post.service';

const cx = classNames.bind(styles);

//chỉ định phần tử gốc của ứng dụng React (thường là #root) để khi mở modal,
//nội dung bên ngoài modal sẽ bị ẩn khỏi trình đọc màn hình (screen readers).
Modal.setAppElement('#root');

function CreatePostModal({ isOpen, onRequestClose }) {
    const [postData, setPostData] = useState(null);
    const [profileData, setProfileData] = useState(null);
    const { accessToken, accountLogin } = useSelector((state) => state.auth);

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const data = await getMeProfileApi({ accessToken });
                setProfileData(data);
            } catch (err) {
                console.error('Lỗi khi lấy profile:', err);
            }
        };

        fetchProfile();
    });

    const handleCreatePost = async () => {
        try {
            await createPostApi(postData, accessToken);
            onRequestClose(); // Đóng modal sau khi tạo bài viết thành công
        } catch (error) {
            console.error('Tạo bài viết thất bại:', error);
        }
    };

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

            <textarea
                className={cx('contentInput')}
                placeholder="Bạn muốn nói về chủ đề gì?"
                onChange={(e) => {
                    setPostData((prev) => ({
                        ...prev,
                        content: e.target.value,
                    }));
                }}
            />

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
                    <button className={cx('postBtn')} onClick={handleCreatePost}>
                        Đăng bài
                    </button>
                </div>
            </div>
        </Modal>
    );
}

export default CreatePostModal;
