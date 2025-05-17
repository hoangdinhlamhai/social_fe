import classNames from 'classnames/bind';

import styles from './DefaultLayout.module.scss';
import Header from '../components/Header';

const cx = classNames.bind(styles);

function DefaultLayout({ children }) {
    return (
        <div className={cx('wrapper')}>
            <Header></Header>
            <div className={cx('container')}>{children}</div>
        </div>
    );
}

export default DefaultLayout;
