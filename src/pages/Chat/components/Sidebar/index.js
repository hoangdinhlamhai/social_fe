import classNames from 'classnames/bind';
import styles from './Sidebar.module.scss';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { useParams } from 'react-router-dom';

//format (npm install dayjs)
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import 'dayjs/locale/vi';

const cx = classNames.bind(styles);

dayjs.extend(relativeTime);
// Tùy biến locale tiếng Việt để bỏ chữ "trước"
dayjs.locale('vi', {
    relativeTime: {
        future: '%s',
        past: '%s',
        s: 'vài giây',
        m: '1 phút',
        mm: '%d phút',
        h: '1 giờ',
        hh: '%d giờ',
        d: '1 ngày',
        dd: '%d ngày',
        M: '1 tháng',
        MM: '%d tháng',
        y: '1 năm',
        yy: '%d năm',
    },
});

function Sidebar({ chatRooms }) {
    const { accountLogin } = useSelector((state) => state.auth);
    const { roomId } = useParams();

    return (
        <div className={cx('sidebar-container')}>
            <div className={cx('sidebar-header')}>
                <h2>Đoạn chat</h2>
            </div>

            <div className={cx('search-box')}>
                <input type="text" placeholder="Tìm kiếm trên Messenger" />
            </div>

            <div className={cx('tabs')}>
                <button className={cx('active')}>Tất cả</button>
                <button>Chưa đọc</button>
                <button>Nhóm</button>
            </div>

            <div className={cx('chat-list')}>
                {/* map(item => ( ... )) với dấu ngoặc đơn `()`, React mong đợi bạn trả về một phần tử JSX. không thể chèn các dòng lệnh khác vào giữa. */}
                {chatRooms
                    .slice() // tạo bản sao mảng để không làm thay đổi mảng gốc
                    .sort((a, b) => new Date(b.lastMessage.sentAt) - new Date(a.lastMessage.sentAt))
                    .map((room) => {
                        const guestUser = room.participantUser.find((user) => user.id !== accountLogin.id);
                        const lastMessage = room.lastMessage;
                        return (
                            <Link
                                key={room.id}
                                to={`/chat/${room.id}`}
                                className={cx('chat-item', {
                                    active: String(room.id) === roomId,
                                })}
                            >
                                <img
                                    src={guestUser.avatar}
                                    alt={`${guestUser.firstName} ${guestUser.lastName}`}
                                    className={cx('avatar')}
                                />
                                <div className={cx('chat-content')}>
                                    <div className={cx('chat-name')}>
                                        {guestUser.lastName} {guestUser.firstName}
                                    </div>
                                    <div className={cx('chat-last')}>
                                        <span className={cx('last-msg')}>
                                            {lastMessage.senderId === accountLogin.id ? 'Bạn: ' : ''}{' '}
                                            {lastMessage.content}
                                        </span>
                                        <span className={cx('time')}>{dayjs(lastMessage.sentAt).fromNow()}</span>
                                    </div>
                                </div>
                            </Link>
                        );
                    })}
            </div>
        </div>
    );
}

export default Sidebar;
