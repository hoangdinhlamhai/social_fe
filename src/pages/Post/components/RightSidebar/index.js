import classNames from 'classnames/bind';
import styles from './RightSidebar.module.scss';

const cx = classNames.bind(styles);

function RightSidebar({ newsList }) {
    return (
        <div className={cx('wrapper')}>
            <div className={cx('news')}>
                <h2 className={cx('title')}>Tin tức LinkedIn</h2>
                <ul className={cx('newsList')}>
                    {newsList.map((item, index) => (
                        <li key={index} className={cx('newsItem')}>
                            <h4 className={cx('newsTitle')} title={item.title}>
                                {item.title}
                            </h4>
                            <span className={cx('newsMeta')}>
                                {item.time} • {item.readers}
                            </span>
                        </li>
                    ))}
                </ul>
                <button className={cx('moreBtn')}>Hiển thị thêm ▼</button>
            </div>
        </div>
    );
}

export default RightSidebar;
