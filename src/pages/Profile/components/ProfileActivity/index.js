import { useRef, useState, useEffect } from 'react';
import classNames from 'classnames/bind';
import styles from './ProfileActivity.module.scss';
import PostCard from '../PostCard';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const cx = classNames.bind(styles);

const posts = [
    {
        id: 1,
        name: 'Jenny Huynh',
        level: 'Cấp 3+',
        title: 'Symbolic Systems @ Stanford | Content C...',
        time: '3 ngày',
        text: "I got on Forbes' 30 Under 30!\nSince I was 12, making slime videos on ...",
        image: '/images/post1.jpg',
        reactions: '1.743',
        comments: 83,
        reposts: 7,
    },
    {
        id: 2,
        name: 'Jenny Huynh',
        level: 'Cấp 3+',
        title: 'Symbolic Systems @ Stanford | Content C...',
        time: '1 tháng · Đã sửa',
        text: 'I met Kamala Harris at Human X!\nJust a week before finals, I joined 3,500+ ...',
        image: '/images/post2.jpg',
        reactions: '1.329',
        comments: 5,
        reposts: 1,
        imageCount: 9,
    },
    {
        id: 3,
        name: 'Jenny Huynh',
        level: 'Cấp 3+',
        title: 'Symbolic Systems @ Stanford | Content C...',
        time: '1 tháng · Đã sửa',
        text: 'I met Kamala Harris at Human X!\nJust a week before finals, I joined 3,500+ ...',
        image: '/images/post2.jpg',
        reactions: '1.329',
        comments: 5,
        reposts: 1,
        imageCount: 9,
    },
];

function ProfileActivity({ profileData }) {
    const listRef = useRef();
    const [showLeft, setShowLeft] = useState(false);
    const [showRight, setShowRight] = useState(false);

    const updateScrollButtons = () => {
        const container = listRef.current;
        if (!container) return;

        setShowLeft(container.scrollLeft > 0);
        setShowRight(container.scrollWidth > container.clientWidth + container.scrollLeft);
    };

    const scroll = (direction) => {
        const container = listRef.current;
        if (!container) return;

        const cardWidth = container.offsetWidth / 2; // scroll bằng đúng chiều rộng 1 card
        container.scrollBy({
            left: direction === 'left' ? -cardWidth : cardWidth,
            behavior: 'smooth',
        });
    };

    useEffect(() => {
        updateScrollButtons();
        const container = listRef.current;
        if (container) {
            container.addEventListener('scroll', updateScrollButtons);
        }

        return () => {
            if (container) {
                container.removeEventListener('scroll', updateScrollButtons);
            }
        };
    }, []);

    // vì lần mount đầu thì useEffect không chạy ngay nên cần kiểm tra profileData
    if (!profileData) {
        return <div>Đang tải thông tin người dùng...</div>; // hoặc loader component
    }

    return (
        <div className={cx('activity-section')}>
            <div className={cx('header')}>
                <div>
                    <h2>Hoạt động</h2>
                    <p>15.336 người theo dõi</p>
                </div>
                <button className={cx('follow-button')}>+ Theo dõi</button>
            </div>

            <div className={cx('tabs')}>
                <button className={cx('tab', 'active')}>Bài đăng</button>
                <button className={cx('tab')}>Bình luận</button>
                <button className={cx('tab')}>Ảnh</button>
            </div>

            <div className={cx('scroll-wrapper')}>
                {showLeft && (
                    <button className={cx('scroll-button', 'left')} onClick={() => scroll('left')}>
                        <ChevronLeft size={20} />
                    </button>
                )}

                <div className={cx('post-list')} ref={listRef}>
                    {posts.map((post, index) => (
                        <PostCard key={index} {...post} profileData={profileData} />
                    ))}
                </div>

                {showRight && (
                    <button className={cx('scroll-button', 'right')} onClick={() => scroll('right')}>
                        <ChevronRight size={20} />
                    </button>
                )}
            </div>

            <div className={cx('view-more')}>
                <a href="#">Hiển thị tất cả bài đăng →</a>
            </div>
        </div>
    );
}

export default ProfileActivity;
