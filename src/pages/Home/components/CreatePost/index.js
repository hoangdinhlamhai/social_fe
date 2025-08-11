import { FaVideo, FaImage, FaRegNewspaper } from 'react-icons/fa';
import classNames from 'classnames/bind';
import styles from './CreatePost.module.scss';
import CreatePostModal from '../CreatePostModal';
import { useState } from 'react';

const cx = classNames.bind(styles);

function CreatePost({ profileData }) {
    const [isOpen, setIsOpen] = useState(false);

    if (!profileData) {
        return <div className={cx('loading')}>Loading...</div>;
    }

    return (
        <div className={cx('wrapper')}>
            <div className={cx('top')}>
                <img className={cx('avatar')} src={`${profileData.avatarUrl}?sz=200`} alt="User Avatar" />
                <button
                    onClick={() => {
                        setIsOpen(true);
                    }}
                    className={cx('startPostBtn')}
                >
                    Start a post
                </button>
            </div>
            <div className={cx('bottom')}>
                <button className={cx('actionBtn')}>
                    <FaVideo className={cx('icon')} />
                    <span>Video</span>
                </button>
                <button className={cx('actionBtn')}>
                    <FaImage className={cx('icon')} />
                    <span>Ảnh</span>
                </button>
                <button className={cx('actionBtn')}>
                    <FaRegNewspaper className={cx('icon')} />
                    <span>Bài viết</span>
                </button>
            </div>

            <CreatePostModal isOpen={isOpen} onRequestClose={() => setIsOpen(false)} profileData={profileData} />
        </div>
    );
}

export default CreatePost;
