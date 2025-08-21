import classNames from 'classnames/bind';
import styles from './SuggestedCard.module.scss';
import { Link } from 'react-router-dom';

const cx = classNames.bind(styles);

function SuggestedCard({ userData }) {
    return (
        <Link to={`/profile/${userData.email}`} className={cx('card-link')}>
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
        </Link>
    );
}

export default SuggestedCard;
