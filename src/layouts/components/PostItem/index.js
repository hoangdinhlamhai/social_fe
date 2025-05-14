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

const cx = classNames.bind(styles);

function PostItem({ post }) {
    const [showMore, setShowMore] = useState(false);

    const toggleShowMore = () => setShowMore((prev) => !prev);
    const isLong = post?.content?.length > 200;

    return (
        <div className={cx('wrapper')}>
            <div className={cx('header')}>
                <div className={cx('top')}>
                    <img src={post.avatar} alt="avatar" className={cx('logo')} />
                    <div className={cx('info-actions')}>
                        <div className={cx('info')}>
                            <h4>{post.name}</h4>
                            <p>{post.followers} người theo dõi</p>
                            <span>{post.time} · 🌐</span>
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
                                        <span>Bỏ theo dõi {post.name}</span>
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

            <div className={cx('image')}>
                <img src={post.image} alt="post" />
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
