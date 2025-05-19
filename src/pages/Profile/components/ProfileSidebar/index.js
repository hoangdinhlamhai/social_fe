import styles from './ProfileSidebar.module.scss';
import classNames from 'classnames/bind';

const cx = classNames.bind(styles);

const suggestions = [
    {
        name: 'Ha Thuong Nguyen',
        title: 'UA Marketing _ Mobile App & Games',
        button: 'Nhắn tin',
        image: '/path/to/avatar1.jpg',
    },
    {
        name: 'Puzzle Studio - Tuyển dụng',
        title: 'HR & Recruitment',
        button: 'Nhắn tin',
        image: '/path/to/avatar2.jpg',
    },
    {
        name: 'Bảo Hạnh Nguyễn',
        title: 'User Acquisition at Zitga Game Studio',
        button: 'Nhắn tin',
        image: '/path/to/avatar3.jpg',
    },
    {
        name: 'Hoang Thu Huong (Rosie Hoang)',
        title: '',
        button: 'Nhắn tin',
        image: '/path/to/avatar4.jpg',
    },
];

function ProfileSidebar() {
    return (
        <div className={cx('profile-sidebar')}>
            <h3 className={cx('section-title')}>Các hồ sơ khác dành cho bạn</h3>
            {suggestions.map((user, index) => (
                <div className={cx('user-card')} key={index}>
                    <img src={user.image} alt={user.name} className={cx('avatar')} />
                    <div className={cx('info')}>
                        <p className={cx('name')}>{user.name}</p>
                        <p className={cx('title')}>{user.title}</p>
                        <button className={cx('message-button')}>{user.button}</button>
                    </div>
                </div>
            ))}
        </div>
    );
}

export default ProfileSidebar;
