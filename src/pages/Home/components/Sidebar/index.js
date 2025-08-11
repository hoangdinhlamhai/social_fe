import styles from './Sidebar.module.scss';
import classNames from 'classnames/bind';
import SidebarProfile from './SidebarProfile';
import SidebarMenu from './SidebarMenu';

const cx = classNames.bind(styles);

//không có {} thì sẽ lấy toàn bộ object { profileData: { name: 'Nam' } }
function Sidebar({ profileData }) {
    return (
        <div className={cx('sidebar')}>
            <SidebarProfile profileData={profileData} />
            <SidebarMenu />
        </div>
    );
}

export default Sidebar;
