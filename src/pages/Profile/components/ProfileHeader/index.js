import classNames from 'classnames/bind';
import styles from './ProfileHeader.module.scss';
import EditProfileModal from '../EditProfileModal';
import { useState } from 'react';

const cx = classNames.bind(styles);

function ProfileHeader() {
    const [isEditModalOpen, setEditModalOpen] = useState(false);

    const openModal = () => {
        setEditModalOpen(true);
    };

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
                        <h2 className={cx('name')}>Hoàng Đình Lâm Hải</h2>
                        <span className={cx('title')}>heri</span>
                        <div className={cx('location')}>Đà Nẵng, Da Nang City, Vietnam</div>
                        <span className={cx('title')}>228.204 người theo dõi</span>
                    </div>

                    <div className={cx('actions')}>
                        <button className={cx('primary-button')}>Đang tìm việc</button>
                        <button className={cx('outlined-button')} onClick={openModal}>
                            Chỉnh sửa hồ sơ
                        </button>
                    </div>
                </div>

                <EditProfileModal isOpen={isEditModalOpen} onRequestClose={() => setEditModalOpen(false)} />
            </div>
        </div>
    );
}

export default ProfileHeader;
