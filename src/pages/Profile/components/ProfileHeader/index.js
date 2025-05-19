import classNames from 'classnames/bind';
import styles from './ProfileHeader.module.scss';

const cx = classNames.bind(styles);

function ProfileHeader() {
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
                        <button className={cx('outlined-button')}>Phần Thêm hồ sơ</button>
                        <button className={cx('outlined-button')}>Cải thiện hồ sơ</button>
                        <button className={cx('outlined-button')}>Tải nguyên</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ProfileHeader;
