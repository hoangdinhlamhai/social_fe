import Modal from 'react-modal';
import classNames from 'classnames/bind';
import styles from './CreatePostModal.module.scss';
import { FaImage } from 'react-icons/fa';
import { useState, useRef } from 'react';
import { useSelector } from 'react-redux';
import { createPostApi, uploadImageToCloudinary } from '~/services/post.service';

const cx = classNames.bind(styles);

//chỉ định phần tử gốc của ứng dụng React (thường là #root) để khi mở modal,
//nội dung bên ngoài modal sẽ bị ẩn khỏi trình đọc màn hình (screen readers).
Modal.setAppElement('#root');

function CreatePostModal({ isOpen, onRequestClose, profileData }) {
    const [postData, setPostData] = useState(null);
    const { accessToken } = useSelector((state) => state.auth);

    const [selectedImages, setSelectedImages] = useState([]);

    const fileInputRef = useRef();

    const handleCreatePost = async () => {
        try {
            const responseData = await uploadImageToCloudinary(selectedImages, accessToken);
            const imageUrls = responseData.data;

            const newPostData = {
                ...postData,
                imageUrls: imageUrls,
            };
            await createPostApi(newPostData, accessToken);
            console.log('Bài viết đã được tạo thành công:', newPostData);
            onRequestClose(); // Đóng modal sau khi tạo bài viết thành công
        } catch (error) {
            console.error('Tạo bài viết thất bại:', error);
        }
    };

    const handleOpenFileDialog = () => {
        fileInputRef.current.click(); // Trigger file explorer
    };

    const handleUploadImage = (e) => {
        const files = Array.from(e.target.files);
        setSelectedImages(files); // Lưu danh sách ảnh
    };

    if (!profileData) {
        return <div>Đang tải thông tin người dùng...</div>;
    }

    return (
        <Modal isOpen={isOpen} className={cx('postForm', 'modal')} overlayClassName={cx('overlay')}>
            <div className={cx('header')}>
                <div className={cx('left')}>
                    <img className={cx('avatar')} src={`${profileData.avatarUrl}?sz=200`} alt="avatar" />
                    <div className={cx('userInfo')}>
                        <div className={cx('name')}>
                            {profileData.lastName} {profileData.firstName}
                        </div>
                        <div className={cx('privacy')}>Đăng bài ở chế độ Bất cứ ai ▾</div>
                    </div>
                </div>
                <button
                    className={cx('close-btn')}
                    onClick={() => {
                        onRequestClose();
                        setSelectedImages([]); // Reset selected images when closing modal
                    }}
                >
                    ×
                </button>
            </div>

            <textarea
                className={cx('contentInput')}
                placeholder="Bạn muốn nói về chủ đề gì?"
                onChange={(e) => {
                    setPostData((prev) => ({
                        ...prev,
                        content: e.target.value,
                    }));
                }}
            />

            {selectedImages.map((file, index) => (
                <img key={index} src={URL.createObjectURL(file)} alt="" width="200" height="200" />
            ))}

            <div className={cx('actions')}>
                <div className={cx('leftIcons')}>
                    <button onClick={handleOpenFileDialog}>
                        <FaImage className={cx('icon')} />
                    </button>
                    <input
                        type="file"
                        accept="image/*"
                        multiple
                        onChange={handleUploadImage}
                        ref={fileInputRef}
                        style={{ display: 'none' }}
                    />
                </div>
                <div className={cx('rightActions')}>
                    <button className={cx('scheduleBtn')}>
                        <i className="far fa-clock"></i>
                    </button>
                    <button className={cx('postBtn')} onClick={handleCreatePost}>
                        Đăng bài
                    </button>
                </div>
            </div>
        </Modal>
    );
}

export default CreatePostModal;
