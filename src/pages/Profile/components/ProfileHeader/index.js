import classNames from 'classnames/bind';
import styles from './ProfileHeader.module.scss';
import EditProfileModal from '../EditProfileModal';
import { useState, useRef } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';

const cx = classNames.bind(styles);

function ProfileHeader({ profileData, onProfileUpdate }) {
    const [isEditModalOpen, setEditModalOpen] = useState(false);

    const { accessToken, accountLogin } = useSelector((state) => state.auth);
    const userId = accountLogin?.id;

    const avatarInputRef = useRef(null);
    const coverInputRef = useRef(null);

    const openModal = () => {
        setEditModalOpen(true);
    };

    const handleImageUpload = async (e, type) => {
        const file = e.target.files[0];
        if (!file) return;

        const formData = new FormData();
        formData.append('file', file);

        try {
            const res = await axios.post(
                `http://localhost:8080/api/images/${type}`, // avatar hoặc cover
                formData,
                {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                        Authorization: `Bearer ${accessToken}`,
                    },
                },
            );

            // Gọi API cập nhật url avatarUrl hoặc coverUrl vào profile người dùng
            const imageUrl = res.data;
            await axios.patch(
                `http://localhost:8080/api/users/${userId}/profile`,
                type === 'avatar' ? { avatarUrl: imageUrl } : { coverPhotoUrl: imageUrl },
                {
                    headers: {
                        Authorization: `Bearer ${accessToken}`,
                    },
                },
            );

            // Load lại thông tin người dùng
            onProfileUpdate();
        } catch (error) {
            console.error('Lỗi upload ảnh:', error);
        }
    };

    if (!profileData) {
        return <div>Đang tải thông tin người dùng...</div>; // hoặc loader component
    }

    return (
        <div className={cx('profile-header')}>
            <div className={cx('cover-photo')}>
                <img src={profileData.coverPhotoUrl} alt="Cover" className={cx('cover-img')} />
                <input
                    type="file"
                    accept="image/*"
                    hidden
                    ref={coverInputRef}
                    onChange={(e) => handleImageUpload(e, 'cover')}
                />
                <div className={cx('camera-icon')} onClick={() => coverInputRef.current.click()}>
                    <span role="img" aria-label="camera">
                        📷
                    </span>
                </div>

                <div className={cx('avatar-wrapper')}>
                    <div className={cx('avatar')}>
                        <img className={cx('avatar-image')} src={profileData.avatarUrl} alt="Avatar" />
                        <input
                            type="file"
                            accept="image/*"
                            hidden
                            ref={avatarInputRef}
                            onChange={(e) => handleImageUpload(e, 'avatar')}
                        />
                        <div className={cx('add-icon')} onClick={() => avatarInputRef.current.click()}>
                            <span>+</span>
                        </div>
                    </div>
                </div>
            </div>

            <div className={cx('profile-info')}>
                <div className={cx('info-section')}>
                    <div className={cx('main-info')}>
                        <h2 className={cx('name')}>
                            {profileData.lastName} {profileData.firstName}
                        </h2>
                        <span className={cx('title')}>{profileData.bio}</span>
                        <div className={cx('location')}>
                            {profileData.cityName}, {profileData.countryName}
                        </div>
                        <span className={cx('title')}>228.204 người theo dõi</span>
                    </div>

                    <div className={cx('actions')}>
                        <button className={cx('primary-button')}>Đang tìm việc</button>
                        <button className={cx('outlined-button')} onClick={openModal}>
                            Chỉnh sửa hồ sơ
                        </button>
                    </div>
                </div>

                <EditProfileModal
                    isOpen={isEditModalOpen}
                    onRequestClose={() => setEditModalOpen(false)}
                    //onProfileUpdated={getMeProfileApi({ accessToken })} // đang truyền vào kết quả của 1 hàm, không phải hàm
                    onProfileUpdated={async () => {
                        try {
                            onProfileUpdate(); // gọi hàm từ cha để cập nhật lại profile, cập nhật lại state → re-render
                        } catch (err) {
                            console.error('Lỗi khi cập nhật lại profile:', err);
                        }
                    }}
                />
            </div>
        </div>
    );
}

export default ProfileHeader;
