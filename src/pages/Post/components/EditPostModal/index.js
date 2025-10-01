import Modal from 'react-modal';
import classNames from 'classnames/bind';
import styles from './EditPostModal.module.scss';
import { FaImage } from 'react-icons/fa';
import { useState, useRef, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { uploadImageToCloudinary, updatePostApi } from '~/services/post.service';

const cx = classNames.bind(styles);

// Set app element for accessibility
Modal.setAppElement('#root');

function EditPostModal({ isOpen, onRequestClose, profileData, post, onUpdated }) {
    const [postData, setPostData] = useState({ content: '' });
    const { accessToken } = useSelector((state) => state.auth);

    const [selectedImages, setSelectedImages] = useState([]);
    const [existingImages, setExistingImages] = useState([]);
    const fileInputRef = useRef();

    useEffect(() => {
        if (post) {
            setPostData({ content: post.content || '' });

            // Gán hình ảnh hiện có từ bài viết
            if (post.postImages && post.postImages.length > 0) {
                setExistingImages(post.postImages.map((img) => ({ url: img.url })));
            } else {
                setExistingImages([]);
            }
        }
    }, [post]);

    // Calculate total images (existing + newly selected)
    const totalImages = existingImages.length + selectedImages.length;

    // Layout class based on total image count
    const containerClass = totalImages > 0 ? cx('grid-container', `layout-${Math.min(totalImages, 5)}`) : '';

    // Combine existing and new images for display, limited to 5
    const allImages = [...existingImages, ...selectedImages].slice(0, 5);
    const remainingImagesCount = totalImages > 5 ? totalImages - 5 : 0;

    const handleUpdatePost = async () => {
        try {
            let imageUrls = existingImages.map((img) => img.url);

            // Upload any new images
            if (selectedImages.length > 0) {
                const responseData = await uploadImageToCloudinary(selectedImages, accessToken);
                const newImageUrls = responseData.data;
                imageUrls = [...imageUrls, ...newImageUrls];
            }

            const updatedPostData = {
                ...postData,
                imageUrls: imageUrls,
                postId: post.id,
            };

            await updatePostApi(accessToken, post.id, updatedPostData);
            console.log('Bài viết đã được cập nhật thành công:', updatedPostData);
            onRequestClose(); // Close modal after successful update
            onUpdated(updatedPostData); // Call onUpdated callback to refresh post list
            // postModal -> postItem -> postList -> Post
        } catch (error) {
            console.error('Cập nhật bài viết thất bại:', error);
        }
    };

    const handleOpenFileDialog = () => {
        fileInputRef.current.click(); // Trigger file explorer
    };

    const handleUploadImage = (e) => {
        const files = Array.from(e.target.files);
        setSelectedImages((prev) => [...prev, ...files]); // Add new images to existing ones
    };

    const handleRemoveExistingImage = (indexToRemove) => {
        setExistingImages((prevImages) => prevImages.filter((_, index) => index !== indexToRemove));
    };

    const handleRemoveNewImage = (indexToRemove) => {
        setSelectedImages((prevImages) => prevImages.filter((_, index) => index !== indexToRemove));
    };

    // Handle removing images from the combined display
    const handleRemoveImage = (index) => {
        if (index < existingImages.length) {
            handleRemoveExistingImage(index);
        } else {
            handleRemoveNewImage(index - existingImages.length);
        }
    };

    return (
        <Modal isOpen={isOpen} className={cx('modal')} overlayClassName={cx('overlay')}>
            <div className={cx('header')}>
                <div className={cx('left')}>
                    <img className={cx('avatar')} src={profileData.avatarUrl} alt="avatar" />
                    <div className={cx('userInfo')}>
                        <div className={cx('name')}>
                            {profileData.lastName} {profileData.firstName}
                        </div>
                        <div className={cx('privacy')}>Chỉnh sửa bài viết</div>
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
                value={postData.content}
                onChange={(e) => {
                    setPostData((prev) => ({
                        ...prev,
                        content: e.target.value,
                    }));
                }}
            />

            {totalImages > 0 && (
                <div className={cx('grid-container', `layout-${Math.min(totalImages, 5)}`)}>
                    {allImages.map((item, index) => (
                        <div key={index} className={cx('image-wrapper')}>
                            <img
                                src={item.url || URL.createObjectURL(item)}
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
                    <button className={cx('postBtn')} onClick={handleUpdatePost}>
                        Cập nhật
                    </button>
                </div>
            </div>
        </Modal>
    );
}

export default EditPostModal;
