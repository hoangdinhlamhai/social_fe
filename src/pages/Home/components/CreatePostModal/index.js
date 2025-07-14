import Modal from 'react-modal';
import classNames from 'classnames/bind';
import styles from './CreatePostModal.module.scss';
import { FaImage } from 'react-icons/fa';

const cx = classNames.bind(styles);

function CreatePostModal({ isOpen, onRequestClose }) {
    return (
        <Modal isOpen={true} className={cx('postForm', 'modal')} overlayClassName={cx('overlay')}>
            <div className={cx('header')}>
                <div className={cx('left')}>
                    <img className={cx('avatar')} src="/avatar-placeholder.png" alt="avatar" />
                    <div className={cx('userInfo')}>
                        <div className={cx('name')}>Hoàng Đình Lâm Hải</div>
                        <div className={cx('privacy')}>Đăng bài ở chế độ Bất cứ ai ▾</div>
                    </div>
                </div>
                <button className={cx('close-btn')} onClick={onRequestClose}>
                    ×
                </button>
            </div>

            <textarea className={cx('contentInput')} placeholder="Bạn muốn nói về chủ đề gì?" />

            <div className={cx('actions')}>
                <div className={cx('leftIcons')}>
                    <button>
                        <FaImage className={cx('icon')} />
                    </button>
                </div>
                <div className={cx('rightActions')}>
                    <button className={cx('scheduleBtn')}>
                        <i className="far fa-clock"></i>
                    </button>
                    <button className={cx('postBtn')} disabled>
                        Đăng bài
                    </button>
                </div>
            </div>
        </Modal>
    );
}

export default CreatePostModal;
