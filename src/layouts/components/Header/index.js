import styles from './Header.module.scss';
import classNames from 'classnames/bind';
import { Home, Users, Briefcase, MessageSquare, Bell, User, Search, ChevronDown } from 'lucide-react';
import * as DropdownMenu from '@radix-ui/react-dropdown-menu';
import { logoutApi } from '~/services/auth.service';
import { useNavigate, Link } from 'react-router-dom';

import { useEffect, useState, useMemo } from 'react';
import { useSelector } from 'react-redux';
import { getMeProfileApi } from '~/services/user.service';
import { getListChatRoomByUserId } from '~/services/chat.service';

const cx = classNames.bind(styles);

const navItems = [
    { icon: <Home size={20} />, label: 'Home', link: '/' },
    { icon: <Users size={20} />, label: 'My Network', link: '/network' },
    { icon: <Briefcase size={20} />, label: 'Jobs' },
    { icon: <MessageSquare size={20} />, label: 'Messaging' },
    { icon: <Bell size={20} />, label: 'Notifications' },
];

function Header() {
    const navigate = useNavigate();

    const { accessToken, accountLogin } = useSelector((state) => state.auth);
    const [profileData, setProfileData] = useState(null);
    const [latestRoomId, setLatestRoomId] = useState(null);
    const [hasChats, setHasChats] = useState(false);
    const email = accountLogin?.email;

    const handleLogout = async () => {
        await logoutApi();
        navigate('/login');
    };

    useEffect(() => {
        const fetchProfileData = async () => {
            try {
                const response = await getMeProfileApi({ accessToken });
                setProfileData(response);
                console.log('Profile data fetched:', response);
            } catch (error) {
                console.error('Error fetching profile data:', error);
            }
        };

        const fetchLatestChatRoom = async () => {
            try {
                const rooms = await getListChatRoomByUserId(accessToken, accountLogin.id);
                if (rooms && rooms.length > 0) {
                    setHasChats(true);
                    setLatestRoomId(rooms[0].id);
                } else {
                    setHasChats(false);
                }
            } catch (error) {
                console.error('Error fetching chat rooms:', error);
            }
        };
        fetchProfileData();
        fetchLatestChatRoom();
    }, [accessToken, accountLogin]);

    const navItemsMemo = useMemo(() => {
        return navItems.map((item) => {
            if (item.label === 'Messaging') {
                return {
                    ...item,
                    // Gán link chỉ khi có phòng chat
                    link: hasChats ? `/chat/${latestRoomId}` : undefined,
                };
            }
            return item;
        });
    }, [latestRoomId, hasChats]); // Chỉ tính toán lại khi latestRoomId hoặc hasChats thay đổi

    if (!profileData) {
        return <div className={cx('loading')}>Loading...</div>;
    }

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
                    {navItemsMemo.map((item, idx) => (
                        <Link to={item.link} key={idx} className={cx('navItem')}>
                            {item.icon}
                            <span>{item.label}</span>
                        </Link>
                    ))}

                    <DropdownMenu.Root>
                        <DropdownMenu.Trigger asChild>
                            <div className={cx('navItem', 'meTrigger')}>
                                <User size={20} />
                                <span className={cx('labelMe')}>
                                    Me <ChevronDown size={14} className={cx('chevron')} />
                                </span>
                            </div>
                        </DropdownMenu.Trigger>

                        <DropdownMenu.Content side="bottom" align="end" sideOffset={8} className={cx('meDropdown')}>
                            <div className={cx('profile')}>
                                <div className={cx('infoWrapper')}>
                                    <img
                                        className={cx('avatar')}
                                        src={`${profileData.avatarUrl}?sz=200`}
                                        alt="User Avatar"
                                    />
                                    <div className={cx('info')}>
                                        <p className={cx('name')}>
                                            {profileData.firstName} {profileData.lastName}
                                        </p>
                                        <span className={cx('title')}>{profileData.bio}</span>
                                    </div>
                                </div>

                                <Link to={`/profile/${email}`} className={cx('viewProfile')}>
                                    Xem hồ sơ
                                </Link>
                            </div>

                            <div className={cx('section')}>
                                <p className={cx('sectionTitle')}>Tài khoản</p>
                                <DropdownMenu.Item className={cx('menuItem')}>
                                    Dùng thử 1 tháng Premium cho 0₫
                                </DropdownMenu.Item>
                                <DropdownMenu.Item className={cx('menuItem')}>
                                    Cài đặt và quyền riêng tư
                                </DropdownMenu.Item>
                                <DropdownMenu.Item className={cx('menuItem')}>Ngôn ngữ</DropdownMenu.Item>
                            </div>

                            <div className={cx('section')}>
                                <p className={cx('sectionTitle')}>Quản lý</p>
                                <DropdownMenu.Item className={cx('menuItem')}>Bài đăng và hoạt động</DropdownMenu.Item>
                            </div>

                            <DropdownMenu.Item className={cx('menuItem', 'btnLogout')} onClick={handleLogout}>
                                Đăng xuất
                            </DropdownMenu.Item>
                        </DropdownMenu.Content>
                    </DropdownMenu.Root>
                </nav>
            </div>
        </header>
    );
}

export default Header;
