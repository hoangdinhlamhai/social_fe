import styles from './SidebarProfile.module.scss';
import classNames from 'classnames/bind';
import { Plus } from 'lucide-react';
import avatar from '~/assets/images/bld.jpeg';

const cx = classNames.bind(styles);

function SidebarProfile() {
    return (
        <div className={cx('card')}>
            <div className={cx('cover')} />
            <div className={cx('avatarWrapper')}>
                <div className={cx('avatar')}>
                    <img className={cx('avatarImg')} src={avatar} alt="User Avatar" />
                </div>
                <span className={cx('avatarIcon')}>+</span>
            </div>

            <div className={cx('info')}>
                <h4 className={cx('name')}>Hoàng Đình Lâm Hải</h4>
                <p className={cx('title')}>heri</p>
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
