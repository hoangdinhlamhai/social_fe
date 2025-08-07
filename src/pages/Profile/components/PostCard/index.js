import styles from './PostCard.module.scss';
import classNames from 'classnames/bind';
import ava from '~/assets/images/bld.jpeg';
import { FaThumbsUp, FaComment, FaShare, FaFacebookMessenger, FaRegBookmark, FaFlag } from 'react-icons/fa';
import { AiOutlineEllipsis } from 'react-icons/ai';
import { FiLink2 } from 'react-icons/fi';
import { IoClose } from 'react-icons/io5';
import { IoIosArrowForward, IoIosArrowBack } from 'react-icons/io';
import * as DropdownMenu from '@radix-ui/react-dropdown-menu';
import { useState } from 'react';

const cx = classNames.bind(styles);

function PostCard({ post, profileData }) {
    const [showAllImages, setShowAllImages] = useState(false);
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const images = post.postImages || [];

    if (!post) {
        return <div className={cx('post-card')}>No post available</div>;
    }

    if (images.length === 0) {
        return null;
    }

    return (
        <div className={cx('post-card')}>
            <div className={cx('post-header')}>
                <img src={ava} alt="ava" className={cx('avatar')} />
                <div className={cx('author-info')}>
                    <div className={cx('name')}>
                        {profileData.lastName} {profileData.firstName}
                    </div>
                    <div className={cx('role')}>Software Engineer</div>
                    <div className={cx('time')}>{post.createAt}</div>
                </div>

                <DropdownMenu.Root>
                    <DropdownMenu.Trigger asChild>
                        <div className={cx('more-options')}>
                            <AiOutlineEllipsis />
                        </div>
                    </DropdownMenu.Trigger>

                    <DropdownMenu.Content className={cx('dropdown-menu')} side="bottom" align="end" sideOffset={0}>
                        <DropdownMenu.Item className={cx('dropdown-item')}>
                            <FaRegBookmark className={cx('icon')} />
                            <span>Lưu</span>
                        </DropdownMenu.Item>
                        <DropdownMenu.Item className={cx('dropdown-item')}>
                            <FiLink2 className={cx('icon')} />
                            <span>Sao chép liên kết đến bài đăng</span>
                        </DropdownMenu.Item>
                        <DropdownMenu.Item className={cx('dropdown-item')}>
                            <FaFlag className={cx('icon')} />
                            <span>Báo cáo bài đăng</span>
                        </DropdownMenu.Item>
                    </DropdownMenu.Content>
                </DropdownMenu.Root>
            </div>

            <div className={cx('post-content')}>
                <p>{post.content}</p>
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

            <div className={cx('post-stats')}>
                <div>reactions</div>
                <div>comments</div>
                <div>shares</div>
            </div>

            <div className={cx('post-actions')}>
                <button>
                    <FaThumbsUp />
                </button>
                <button>
                    <FaComment />
                </button>
                <button>
                    <FaShare />
                </button>
                <button>
                    <FaFacebookMessenger />
                </button>
            </div>
        </div>
    );
}

export default PostCard;
