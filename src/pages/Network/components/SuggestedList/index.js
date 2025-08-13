import classNames from 'classnames/bind';
import styles from './SuggestedList.module.scss';
import SuggestedCard from '../SuggestedCard';

const cx = classNames.bind(styles);

function SuggestedList({ allUsersData }) {
    return (
        <div className={cx('list-wrapper')}>
            <div className={cx('header')}>
                <h2>Phổ biến trên LinkedIn</h2>
                <a href="#">Hiển thị tất cả</a>
            </div>
            <div className={cx('card-list')}>
                {allUsersData.map((item) => (
                    <SuggestedCard key={allUsersData.id} userData={item} />
                ))}
            </div>
        </div>
    );
}

export default SuggestedList;
