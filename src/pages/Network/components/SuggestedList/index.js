import classNames from 'classnames/bind';
import styles from './SuggestedList.module.scss';
import SuggestedCard from '../SuggestedCard';
import ava from '~/assets/images/bld.jpeg';

const cx = classNames.bind(styles);

const suggestions = [
    {
        avatar: ava,
        name: 'Jenny Huynh',
        title: 'Content Creator',
        followers: 19742,
    },
    {
        avatar: ava,
        name: 'Thái Vân Linh',
        title: 'CEO of Skills Bridge',
        followers: 263882,
    },
    {
        avatar: ava,
        name: 'Minh Bui',
        title: 'Beta Group Founder',
        followers: 24603,
    },
    {
        avatar: ava,
        name: 'Minh Bui',
        title: 'Beta Group Founder',
        followers: 24603,
    },
];

function SuggestedList() {
    return (
        <div className={cx('list-wrapper')}>
            <div className={cx('header')}>
                <h2>Phổ biến trên LinkedIn</h2>
                <a href="#">Hiển thị tất cả</a>
            </div>
            <div className={cx('card-list')}>
                {suggestions.map((item, index) => (
                    <SuggestedCard key={index} {...item} />
                ))}
            </div>
        </div>
    );
}

export default SuggestedList;
