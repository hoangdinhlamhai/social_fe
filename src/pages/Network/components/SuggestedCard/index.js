import classNames from 'classnames/bind';
import styles from './SuggestedCard.module.scss';

const cx = classNames.bind(styles);

function SuggestedCard({ avatar, name, title, followers }) {
    return (
        <div className={cx('card')}>
            <button className={cx('close-btn')}>×</button>
            <img src={avatar} alt={name} className={cx('avatar')} />
            <h3 className={cx('name')}>{name}</h3>
            <p className={cx('title')}>{title}</p>
            <span className={cx('followers')}>{followers.toLocaleString()} người theo dõi</span>
            <button className={cx('follow-btn')}>+ Theo dõi</button>
        </div>
    );
}

export default SuggestedCard;
