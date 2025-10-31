import Modal from 'react-modal';
import classNames from 'classnames/bind';
import styles from './CreatePostModal.module.scss';
import { FaImage } from 'react-icons/fa';
import { useState, useRef } from 'react';
import { useSelector } from 'react-redux';
import { createPostApi, uploadImageToCloudinary } from '~/services/post.service';
import imageCompression from 'browser-image-compression';

const cx = classNames.bind(styles);

//chỉ định phần tử gốc của ứng dụng React (thường là #root) để khi mở modal,
//nội dung bên ngoài modal sẽ bị ẩn khỏi trình đọc màn hình (screen readers).
Modal.setAppElement('#root');

function CreatePostModal({ isOpen, onRequestClose, profileData }) {
    const [postData, setPostData] = useState(null);
    const { accessToken } = useSelector((state) => state.auth);

    const [selectedImages, setSelectedImages] = useState([]);
    const fileInputRef = useRef();

    const imageCount = selectedImages.length;
    // Layout sẽ luôn là 'grid-container-5' nếu có 5 ảnh trở lên
    const containerClass = imageCount > 0 ? cx('grid-container', `grid-container-${Math.min(imageCount, 5)}`) : '';

    const imagesToShow = selectedImages.slice(0, 5);
    const remainingImagesCount = imageCount > 5 ? imageCount - 5 : 0;

    const handleCreatePost = async () => {
        try {
            const compressedFiles = [];
            for (const file of selectedImages) {
                const options = {
                    maxSizeMB: 2, // Giới hạn ~2MB sau khi nén
                    maxWidthOrHeight: 1920, // Resize nếu ảnh quá lớn
                    useWebWorker: true,
                };

                const compressedFile = await imageCompression(file, options);
                compressedFiles.push(compressedFile);
            }
            const responseData = await uploadImageToCloudinary(compressedFiles, accessToken);
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

    const handleRemoveImage = (indexToRemove) => {
        // Cập nhật lại state selectedImages bằng cách lọc ra phần tử
        // có index khác với indexToRemove
        setSelectedImages((prevImages) => prevImages.filter((_, index) => index !== indexToRemove));
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
                        setSelectedImages([]);
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

            {imageCount > 0 && (
                <div className={cx('grid-container', `layout-${Math.min(imageCount, 5)}`)}>
                    {imagesToShow.map((file, index) => (
                        <div key={index} className={cx('image-wrapper')}>
                            <img
                                src={URL.createObjectURL(file)}
                                alt={`preview ${index}`}
                                className={cx('preview-image')}
                            />

                            {index === 4 && remainingImagesCount > 0 && (
                                <div className={cx('more-images-overlay')}>+{remainingImagesCount}</div>
                            )}

                            <button className={cx('remove-btn')} onClick={() => handleRemoveImage(index)}>
                                ×
                            </button>
                        </div>
                    ))}
                </div>
            )}

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
