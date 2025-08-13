import classNames from 'classnames/bind';
import styles from './SuggestedCard.module.scss';

const cx = classNames.bind(styles);

function SuggestedCard({ userData }) {
    return (
        <div className={cx('card')}>
            <button className={cx('close-btn')}>×</button>
            <img src={userData.avatarUrl} alt="Avatar" className={cx('avatar')} />
            <h3 className={cx('name')}>
                {userData.firstName} {userData.lastName}
            </h3>
            <p className={cx('title')}>{userData.bio}</p>
            <span className={cx('followers')}> người theo dõi</span>
            <button className={cx('follow-btn')}>+ Theo dõi</button>
        </div>
    );
}

export default SuggestedCard;
