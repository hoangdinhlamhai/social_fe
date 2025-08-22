import { useRef, useState, useEffect } from 'react';
import classNames from 'classnames/bind';
import styles from './ProfileActivity.module.scss';
import PostCard from '../PostCard';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { getPostByEmailApi } from '~/services/post.service';
import { useSelector } from 'react-redux';

const cx = classNames.bind(styles);

function ProfileActivity({ profileData }) {
    const listRef = useRef();
    const [showLeft, setShowLeft] = useState(false);
    const [showRight, setShowRight] = useState(false);
    const [posts, setPosts] = useState([]);

    const { accessToken, accountLogin } = useSelector((state) => state.auth);
    const email = profileData.email;

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
        // Lấy bài đăng của người dùng từ API
        const fetchPostsByEmail = async (accessToken, email) => {
            try {
                const response = await getPostByEmailApi(accessToken, email);
                setPosts(response.data);
            } catch (error) {
                console.error('Lỗi khi lấy profile:', error);
            }
        };

        updateScrollButtons();
        const container = listRef.current;
        if (container) {
            container.addEventListener('scroll', updateScrollButtons);
        }

        fetchPostsByEmail(accessToken, email);

        return () => {
            if (container) {
                container.removeEventListener('scroll', updateScrollButtons);
            }
        };
    }, [email, accessToken]);

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
                        <PostCard key={index} post={post} profileData={profileData} />
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
