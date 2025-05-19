import styles from './PostCard.module.scss';
import classNames from 'classnames/bind';
import ava from '~/assets/images/bld.jpeg';
import postImg from '~/assets/images/post-image.jpg';
import { FaThumbsUp, FaComment, FaShare, FaFacebookMessenger } from 'react-icons/fa';

const cx = classNames.bind(styles);

function PostCard({ author, role, time, content, image, stats }) {
    return (
        <div className={cx('post-card')}>
            <div className={cx('post-header')}>
                <img src={ava} alt="ava" className={cx('avatar')} />
                <div className={cx('author-info')}>
                    <div className={cx('name')}>Hoang Dinh Lam Hai</div>
                    <div className={cx('role')}>Software Engineer</div>
                    <div className={cx('time')}>22/08</div>
                </div>
                <div className={cx('more-options')}>⋯</div>
            </div>

            <div className={cx('post-content')}>
                <p>
                    At the World IT Show 2025, South Korea’s largest ICT exhibition, FPT reaffirmed its commitment to
                    enabling the next wave
                </p>
            </div>

            <div className={cx('post-image')}>
                <img src={postImg} alt="post" />
            </div>

            <div className={cx('post-stats')}>
                <div>{stats} reactions</div>
                <div>{stats} comments</div>
                <div>{stats} shares</div>
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
