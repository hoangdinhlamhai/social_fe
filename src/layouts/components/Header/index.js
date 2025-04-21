import styles from './Header.module.scss';
import classNames from 'classnames/bind';
import { Home, Users, Briefcase, MessageSquare, Bell, User, Search } from 'lucide-react';

const cx = classNames.bind(styles);

const navItems = [
    { icon: <Home size={20} />, label: 'Home' },
    { icon: <Users size={20} />, label: 'My Network' },
    { icon: <Briefcase size={20} />, label: 'Jobs' },
    { icon: <MessageSquare size={20} />, label: 'Messaging' },
    { icon: <Bell size={20} />, label: 'Notifications' },
    { icon: <User size={20} />, label: 'Me' },
];

function Header() {
    return (
        <header className={cx('header')}>
            <div className={cx('container')}>
                <div className={cx('left')}>
                    <img
                        src="https://upload.wikimedia.org/wikipedia/commons/c/ca/LinkedIn_logo_initials.png"
                        alt="LinkedIn"
                        className={cx('logo')}
                    />
                    <span className={cx('brand')}>LinkedIn</span>
                </div>

                <div className={cx('center')}>
                    <div className={cx('searchBox')}>
                        <Search size={16} className={cx('searchIcon')} />
                        <input type="text" placeholder="Search" className={cx('searchInput')} />
                    </div>
                </div>

                <nav className={cx('right')}>
                    {navItems.map((item, idx) => (
                        <div key={idx} className={cx('navItem')}>
                            {item.icon}
                            <span>{item.label}</span>
                        </div>
                    ))}
                </nav>
            </div>
        </header>
    );
}

export default Header;
