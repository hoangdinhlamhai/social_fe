import classNames from 'classnames/bind';

import styles from './DefaultLayout.module.scss';
import Header from '../components/Header';
import Sidebar from '../components/Sidebar';
import RightSidebar from '../components/RightSidebar';

const cx = classNames.bind(styles);

const newsList = [
    { title: 'A big week for Big Tech', time: '1 giờ trước', readers: '6.786 người đọc' },
    { title: 'Uncertain companies cut spending', time: '1 giờ trước', readers: '5.279 người đọc' },
    { title: 'Canada heads to the polls', time: '1 giờ trước', readers: '4.534 người đọc' },
    { title: 'Huawei debuts new AI chip', time: '1 giờ trước', readers: '2.383 người đọc' },
    { title: 'Temu, Shein prices start to surge', time: '1 giờ trước', readers: '2.251 người đọc' },
];

function DefaultLayout({ children }) {
    return (
        <div className={cx('wrapper')}>
            <Header></Header>
            <div className={cx('container')}>
                <Sidebar />
                <div className={cx('content')}>{children}</div>
                <div className={cx('rightSidebar')}>
                    <RightSidebar newsList={newsList} />
                </div>
            </div>
        </div>
    );
}

export default DefaultLayout;
