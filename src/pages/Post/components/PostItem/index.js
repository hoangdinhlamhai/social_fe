import { useState } from 'react';
import classNames from 'classnames/bind';
import styles from './PostItem.module.scss';
import { FaThumbsUp, FaComment, FaShare, FaFacebookMessenger, FaRegBookmark, FaCode, FaFlag } from 'react-icons/fa';
import { GoX } from 'react-icons/go';
import { AiOutlineEllipsis } from 'react-icons/ai';
import * as DropdownMenu from '@radix-ui/react-dropdown-menu';
import { FiLink2 } from 'react-icons/fi';
import { IoIosEyeOff } from 'react-icons/io';
import { MdOutlineCancel } from 'react-icons/md';
import { IoClose } from 'react-icons/io5';
import { IoIosArrowForward, IoIosArrowBack } from 'react-icons/io';

const cx = classNames.bind(styles);

function PostItem({ post }) {
    const [showMore, setShowMore] = useState(false);

    const toggleShowMore = () => setShowMore((prev) => !prev);
    const isLong = post?.content?.length > 200;

    const [showAllImages, setShowAllImages] = useState(false);
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const images = post.postImages || [];

    return (
        <div className={cx('wrapper')}>
            <div className={cx('header')}>
                <div className={cx('top')}>
                    <img src="" alt="avatar" className={cx('logo')} />
                    <div className={cx('info-actions')}>
                        <div className={cx('info')}>
                            <h4>Người đăng</h4>
                            <p> người theo dõi</p>
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
                                    <DropdownMenu.Item className={cx('dropdown-item')}>
                                        <FiLink2 className={cx('icon')} />
                                        <span>Sao chép liên kết đến bài đăng</span>
                                    </DropdownMenu.Item>
                                    <DropdownMenu.Item className={cx('dropdown-item')}>
                                        <FaCode className={cx('icon')} />
                                        <span>Nhúng bài đăng này</span>
                                    </DropdownMenu.Item>
                                    <DropdownMenu.Item className={cx('dropdown-item')}>
                                        <IoIosEyeOff className={cx('icon')} />
                                        <span>Không quan tâm</span>
                                    </DropdownMenu.Item>
                                    <DropdownMenu.Item className={cx('dropdown-item')}>
                                        <MdOutlineCancel className={cx('icon')} />
                                        <span>Bỏ theo dõi</span>
                                    </DropdownMenu.Item>
                                    <DropdownMenu.Item className={cx('dropdown-item')}>
                                        <FaFlag className={cx('icon')} />
                                        <span>Báo cáo bài đăng</span>
                                    </DropdownMenu.Item>
                                </DropdownMenu.Content>
                            </DropdownMenu.Root>

                            <button className={cx('close-btn')}>
                                <GoX />
                            </button>
                        </div>
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
                <span className={cx('translate')}>Hiển thị bản dịch</span>
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
