import classNames from 'classnames/bind';
import styles from './ConnectionRequests.module.scss';

const cx = classNames.bind(styles);

const requests = [
    {
        id: 1,
        name: 'Nguyễn Văn A',
        title: 'Frontend Developer tại ABC Corp',
        avatar: 'https://via.placeholder.com/48',
    },
    {
        id: 2,
        name: 'Trần Thị B',
        title: 'Sinh viên Đại học Đà Nẵng',
        avatar: 'https://via.placeholder.com/48',
    },
];

function ConnectionRequests() {
    return (
        <div className={cx('requests-wrapper')}>
            <h2 className={cx('title')}>Lời mời kết nối</h2>
            {requests.length === 0 ? (
                <p className={cx('empty')}>Không có lời mời nào đang chờ</p>
            ) : (
                <ul className={cx('list')}>
                    {requests.map((req) => (
                        <li key={req.id} className={cx('item')}>
                            <img src={req.avatar} alt={req.name} className={cx('avatar')} />
                            <div className={cx('info')}>
                                <h3 className={cx('name')}>{req.name}</h3>
                                <p className={cx('title-job')}>{req.title}</p>
                                <div className={cx('actions')}>
                                    <button className={cx('accept')}>Chấp nhận</button>
                                    <button className={cx('ignore')}>Bỏ qua</button>
                                </div>
                            </div>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}

export default ConnectionRequests;
