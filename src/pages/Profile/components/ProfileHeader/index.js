import classNames from 'classnames/bind';
import styles from './ProfileHeader.module.scss';
import EditProfileModal from '../EditProfileModal';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { getMeProfileApi } from '~/services/user.service';

const cx = classNames.bind(styles);

function ProfileHeader() {
    const [isEditModalOpen, setEditModalOpen] = useState(false);
    const [profileData, setProfileData] = useState(null);
    const [error, setError] = useState('');

    const { accessToken, accountLogin } = useSelector((state) => state.auth);

    const email = accountLogin?.email;

    //useEffect luôn chạy sau khi render, không đồng bộ với render.
    useEffect(() => {
        axios
            .get(`http://localhost:8080/api/users/${email}`, {
                headers: {
                    Authorization: `Bearer ${accessToken}`, // thêm JWT vào header Authorization
                },
            })
            .then((res) => {
                setProfileData(res.data);
            })
            .catch((err) => {
                console.error(err);
                setError('Không thể tải thông tin người dùng.');
            });
    }, [email]); // Chỉ chạy lại khi email thay đổi

    const openModal = () => {
        setEditModalOpen(true);
    };

    if (!profileData) {
        return <div>Đang tải thông tin người dùng...</div>; // hoặc loader component
    }

    return (
        <div className={cx('profile-header')}>
            <div className={cx('cover-photo')}>
                <div className={cx('camera-icon')}>
                    <span role="img" aria-label="camera">
                        📷
                    </span>
                </div>

                <div className={cx('avatar-wrapper')}>
                    <div className={cx('avatar')}>
                        <img className={cx('avatar-image')} src="/path-to-avatar.jpg" alt="Avatar" />
                        <div className={cx('add-icon')}>
                            <span>+</span>
                        </div>
                    </div>
                </div>
            </div>

            <div className={cx('profile-info')}>
                <div className={cx('info-section')}>
                    <div className={cx('main-info')}>
                        <h2 className={cx('name')}>
                            {profileData.firstName} {profileData.lastName}
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
                            const data = await getMeProfileApi({ accessToken });
                            setProfileData(data); // cập nhật lại state → re-render
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
