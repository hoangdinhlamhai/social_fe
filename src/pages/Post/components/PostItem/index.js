import { useState } from 'react';
import * as DropdownMenu from '@radix-ui/react-dropdown-menu';
import classNames from 'classnames/bind';
import styles from './PostItem.module.scss';
import { FaThumbsUp, FaComment, FaShare, FaFacebookMessenger, FaRegBookmark, FaPen, FaLink } from 'react-icons/fa';
import { AiOutlineEllipsis } from 'react-icons/ai';
import { IoIosArrowForward, IoIosArrowBack, IoIosEyeOff } from 'react-icons/io';
// import { FiLink2 } from 'react-icons/fi';
import { MdOutlineCancel } from 'react-icons/md';
import { IoClose } from 'react-icons/io5';
import { useSelector } from 'react-redux';
import { deletePostApi } from '~/services/post.service';
import EditPostModal from '../EditPostModal';

const cx = classNames.bind(styles);

function PostItem({ post, profileData, emailFromParams, onDeleted, onUpdated }) {
    const { accountLogin, accessToken } = useSelector((state) => state.auth);
    const [showMore, setShowMore] = useState(false);
    const emailLogin = accountLogin?.email;

    const toggleShowMore = () => setShowMore((prev) => !prev);
    const isLong = post?.content?.length > 200;

    const [showAllImages, setShowAllImages] = useState(false);
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const images = post.postImages || [];

    const [isEditing, setIsEditing] = useState(false);

    const handleDeletePost = async (accessToken, postId) => {
        try {
            await deletePostApi(postId, accessToken);
            onDeleted(postId); // Gọi hàm onDeleted từ component cha để cập nhật danh sách bài viết
        } catch (error) {
            console.error('Lỗi khi xoá bài viết:', error);
        }
    };

    return (
        <div className={cx('wrapper')}>
            <div className={cx('header')}>
                <div className={cx('top')}>
                    <img src={profileData.avatarUrl} alt="avatar" className={cx('logo')} />
                    <div className={cx('info-actions')}>
                        <div className={cx('info')}>
                            <h4>
                                {profileData.lastName} {profileData.firstName}
                            </h4>
                            {/* <p> người theo dõi</p> */}
                            <span>{post.createAt} · 🌐</span>
                        </div>
                        <div className={cx('actions')}>
                            <DropdownMenu.Root>
                                <DropdownMenu.Trigger asChild>
                                    <button className={cx('dropdown-btn')}>
                                        <AiOutlineEllipsis />
                                    </button>
                                </DropdownMenu.Trigger>

                                <DropdownMenu.Content
                                    className={cx('dropdown-menu')}
                                    side="bottom"
                                    align="end"
                                    sideOffset={2}
                                >
                                    <DropdownMenu.Item className={cx('dropdown-item')}>
                                        <FaRegBookmark className={cx('icon')} />
                                        <span>Lưu</span>
                                    </DropdownMenu.Item>
                                    {emailLogin === emailFromParams && (
                                        <DropdownMenu.Item
                                            className={cx('dropdown-item')}
                                            onClick={() => setIsEditing(true)}
                                        >
                                            <FaPen className={cx('icon')} />
                                            <span>Sửa bài viết</span>
                                        </DropdownMenu.Item>
                                    )}
                                    <DropdownMenu.Item className={cx('dropdown-item')}>
                                        <FaLink className={cx('icon')} />
                                        <span>Sao chép liên kết</span>
                                    </DropdownMenu.Item>
                                    <DropdownMenu.Item className={cx('dropdown-item')}>
                                        <IoIosEyeOff className={cx('icon')} />
                                        <span>Không quan tâm</span>
                                    </DropdownMenu.Item>
                                    {emailLogin === emailFromParams && (
                                        <DropdownMenu.Item
                                            className={cx('dropdown-item')}
                                            onClick={() => handleDeletePost(accessToken, post.id)}
                                        >
                                            <MdOutlineCancel className={cx('icon')} />
                                            <span>Xoá bài viết</span>
                                        </DropdownMenu.Item>
                                    )}
                                </DropdownMenu.Content>
                            </DropdownMenu.Root>
                        </div>

                        <EditPostModal
                            isOpen={isEditing}
                            onRequestClose={() => setIsEditing(false)}
                            profileData={profileData}
                            post={post}
                            onUpdated={onUpdated} // Gọi hàm onUpdated khi cập nhật bài viết thành công
                        />
                    </div>
                </div>
            </div>

            <div className={cx('content')}>
                <p>
                    {showMore || !isLong ? post.content : `${post.content.slice(0, 200)}...`}
                    {isLong && (
                        <span className={cx('toggle')} onClick={toggleShowMore}>
                            {showMore ? ' Ẩn bớt' : ' xem thêm'}
                        </span>
                    )}
                </p>
                {/* <span className={cx('translate')}>Hiển thị bản dịch</span> */}
            </div>

            <div className={cx('post-image')}>
                {images.length > 0 && !showAllImages && (
                    // không dùng callback thì sẽ gọi hàm ngay lập tức khi component render chứ không đợi click
                    <div className={cx('image-preview')} onClick={() => setShowAllImages(true)}>
                        <img src={images[0].url} alt="post" />
                        {images.length > 1 && <div className={cx('image-overlay')}>+{images.length - 1} ảnh</div>}
                    </div>
                )}
                {showAllImages && (
                    <div className={cx('lightbox')}>
                        <button className={cx('close-btn')} onClick={() => setShowAllImages(false)}>
                            <IoClose />
                        </button>

                        <button
                            className={cx('nav-btn', 'left')}
                            onClick={() => setCurrentImageIndex((prev) => (prev > 0 ? prev - 1 : images.length - 1))}
                        >
                            <IoIosArrowBack />
                        </button>

                        <img className={cx('lightbox-image')} src={images[currentImageIndex].url} alt="post" />

                        <button
                            className={cx('nav-btn', 'right')}
                            onClick={() => setCurrentImageIndex((prev) => (prev < images.length - 1 ? prev + 1 : 0))}
                        >
                            <IoIosArrowForward />
                        </button>
                    </div>
                )}
            </div>

            <div className={cx('footer')}>
                <p>{post.likes} lượt thích</p>
                <div className={cx('actions')}>
                    <button>
                        <FaThumbsUp /> Thích
                    </button>
                    <button>
                        <FaComment /> Bình luận
                    </button>
                    <button>
                        <FaShare /> Đăng lại
                    </button>
                    <button>
                        <FaFacebookMessenger /> Gửi
                    </button>
                </div>
            </div>
        </div>
    );
}

export default PostItem;
