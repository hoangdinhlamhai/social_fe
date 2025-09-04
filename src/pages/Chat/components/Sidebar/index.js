import classNames from 'classnames/bind';
import styles from './Sidebar.module.scss';

const cx = classNames.bind(styles);

function Sidebar() {
    const chats = [
        { id: 1, name: 'smite như', lastMsg: 'ừm', time: '1 ngày', avatar: '' },
        { id: 2, name: 'Hoàng Hiếu', lastMsg: 'Ko biết m răng luôn á', time: '5 giờ', avatar: '' },
        { id: 3, name: 'anjhet e lai', lastMsg: 'ơi có rồi á', time: '2 ngày', avatar: '' },
    ];

    return (
        <div className={cx('sidebar-container')}>
            {/* Header */}
            <div className={cx('sidebar-header')}>
                <h2>Đoạn chat</h2>
            </div>

            {/* Search */}
            <div className={cx('search-box')}>
                <input type="text" placeholder="Tìm kiếm trên Messenger" />
            </div>

            {/* Tabs */}
            <div className={cx('tabs')}>
                <button className={cx('active')}>Tất cả</button>
                <button>Chưa đọc</button>
                <button>Nhóm</button>
            </div>

            {/* Chat list */}
            <div className={cx('chat-list')}>
                {chats.map((chat) => (
                    <div key={chat.id} className={cx('chat-item')}>
                        <div className={cx('avatar')}></div>
                        <div className={cx('chat-content')}>
                            <div className={cx('chat-name')}>{chat.name}</div>
                            <div className={cx('chat-last')}>
                                <span className={cx('last-msg')}>{chat.lastMsg}</span>
                                <span className={cx('time')}> · {chat.time}</span>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Sidebar;
