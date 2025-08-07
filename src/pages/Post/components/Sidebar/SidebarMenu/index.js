import { Bookmark, Users, Newspaper, Calendar } from 'lucide-react';
import styles from './SidebarMenu.module.scss';
import classNames from 'classnames/bind';

const cx = classNames.bind(styles);

const menuItems = [
    { icon: Bookmark, label: 'Các mục đã lưu' },
    { icon: Users, label: 'Nhóm' },
    { icon: Newspaper, label: 'Bản tin' },
    { icon: Calendar, label: 'Sự kiện' },
];

function SidebarMenu() {
    return (
        <div className={cx('menuCard')}>
            {menuItems.map((item, index) => {
                const Icon = item.icon; // lấy component icon
                return (
                    <div key={index} className={cx('menuItem')}>
                        <Icon size={20} className={cx('menuIcon')} />
                        <span className={cx('menuText')}>{item.label}</span>
                    </div>
                );
            })}
        </div>
    );
}

export default SidebarMenu;
