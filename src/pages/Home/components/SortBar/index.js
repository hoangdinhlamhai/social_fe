import classNames from 'classnames/bind';
import { MdArrowDropDown } from 'react-icons/md';
import styles from './SortBar.module.scss';

const cx = classNames.bind(styles);

function SortBar() {
    return (
        <div className={cx('wrapper')}>
            <div className={cx('line')}></div>
            <div className={cx('sort')}>
                <span>
                    Sắp xếp theo: <strong>Trên cùng</strong>
                </span>
                <MdArrowDropDown className={cx('icon')} />
            </div>
        </div>
    );
}

export default SortBar;
