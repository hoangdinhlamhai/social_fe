import styles from './SidebarProfile.module.scss';
import classNames from 'classnames/bind';
import { Plus } from 'lucide-react';

const cx = classNames.bind(styles);

function SidebarProfile({ profileData }) {
    return (
        <div className={cx('card')}>
            <div className={cx('cover')} />
            <div className={cx('avatarWrapper')}>
                <div className={cx('avatar')}>
                    <img className={cx('avatarImg')} src={profileData.avatarUrl} alt="User Avatar" />
                </div>
            </div>

            <div className={cx('info')}>
                <h4 className={cx('name')}>
                    {profileData.lastName} {profileData.firstName}
                </h4>
                <p className={cx('title')}>{profileData.bio}</p>
                <p className={cx('location')}>
                    {[profileData?.cityName, profileData?.countryName]
                        .filter(Boolean) // loại bỏ null, undefined, ""
                        .join(', ')}
                    {/* thêm dấu , nếu trên 2 giá trị */}
                </p>
            </div>
            <button className={cx('button')}>
                <Plus size={16} />
                <span>Kinh nghiệm</span>
            </button>
        </div>
    );
}

export default SidebarProfile;
