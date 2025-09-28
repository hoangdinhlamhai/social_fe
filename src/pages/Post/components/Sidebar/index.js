import styles from './Sidebar.module.scss';
import classNames from 'classnames/bind';
import SidebarProfile from './SidebarProfile';
import SidebarMenu from './SidebarMenu';

const cx = classNames.bind(styles);

function Sidebar({ profileData }) {
    return (
        <div className={cx('sidebar')}>
            <SidebarProfile profileData={profileData} />
            <SidebarMenu />
        </div>
    );
}

export default Sidebar;
