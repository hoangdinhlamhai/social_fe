import styles from './Sidebar.module.scss';
import classNames from 'classnames/bind';
import SidebarProfile from './SidebarProfile';

const cx = classNames.bind(styles);

function Sidebar() {
    return (
        <div className={cx('sidebar')}>
            <SidebarProfile />
        </div>
    );
}

export default Sidebar;
