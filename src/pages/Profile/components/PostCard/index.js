import styles from './PostCard.module.scss';
import classNames from 'classnames/bind';
import ava from '~/assets/images/bld.jpeg';
import postImg from '~/assets/images/post-image.jpg';
import { FaThumbsUp, FaComment, FaShare, FaFacebookMessenger, FaRegBookmark, FaFlag } from 'react-icons/fa';
import { AiOutlineEllipsis } from 'react-icons/ai';
import { FiLink2 } from 'react-icons/fi';
import * as DropdownMenu from '@radix-ui/react-dropdown-menu';

const cx = classNames.bind(styles);

function PostCard({ post, profileData }) {
    if (!post) {
        return <div className={cx('post-card')}>No post available</div>;
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
                {post.postImages.map((image) => (
                    <img key={image.id} src={image.url} alt="post" />
                ))}
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
