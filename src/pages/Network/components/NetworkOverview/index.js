import classNames from 'classnames/bind';
import styles from './NetworkOverview.module.scss';

const cx = classNames.bind(styles);

function NetworkOverview() {
    return (
        <div className={cx('overview-wrapper')}>
            <h1 className={cx('title')}>Tổng quan về mạng lưới</h1>
            <div className={cx('stats')}>
                <div>
                    <span>0</span>
                    <p>Đã gửi lời mời</p>
                </div>
                <div>
                    <span>0</span>
                    <p>Kết nối</p>
                </div>
                <div>
                    <span>1</span>
                    <p>Đang theo dõi</p>
                </div>
            </div>
        </div>
    );
}

export default NetworkOverview;
