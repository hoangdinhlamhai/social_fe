import styles from './SidebarProfile.module.scss';
import classNames from 'classnames/bind';
import { Plus } from 'lucide-react';

const cx = classNames.bind(styles);

function SidebarProfile({ profileData }) {
    if (!profileData) {
        return <div className={cx('loading')}>Loading...</div>;
    }

    return (
        <div className={cx('card')}>
            <div className={cx('cover')} />
            <div className={cx('avatarWrapper')}>
                <div className={cx('avatar')}>
                    <img className={cx('avatarImg')} src={profileData.avatarUrl} alt="User Avatar" />
                </div>
                <span className={cx('avatarIcon')}>+</span>
            </div>

            <div className={cx('info')}>
                <h4 className={cx('name')}>
                    {profileData.lastName} {profileData.firstName}
                </h4>
                <p className={cx('title')}>{profileData.bio}</p>
                <p className={cx('location')}>Đà Nang, Da Nang City</p>
            </div>
            <button className={cx('button')}>
                <Plus size={16} />
                <span>Kinh nghiệm</span>
            </button>
        </div>
    );
}

export default SidebarProfile;
