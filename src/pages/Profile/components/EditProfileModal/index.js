import Modal from 'react-modal';
import classNames from 'classnames/bind';
import styles from './EditProfileModal.module.scss';
import { getMeProfileApi, updateUserProfileApi } from '~/services/user.service';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

const cx = classNames.bind(styles);
//chỉ định phần tử gốc của ứng dụng React (thường là #root) để khi mở modal,
//nội dung bên ngoài modal sẽ bị ẩn khỏi trình đọc màn hình (screen readers).
Modal.setAppElement('#root');

function EditProfileModal({ isOpen, onRequestClose }) {
    const [profileData, setProfileData] = useState(null);
    const { accessToken, accountLogin } = useSelector((state) => state.auth);
    const userId = accountLogin?.id;

    useEffect(() => {
        // setProfileData(getMeProfileApi({ accessToken })); không thể sử dụng trực tiếp như vậy vì getMeProfileApi là hàm bất đồng bộ (async function)
        // cần phải sử dụng async/await hoặc .then() để lấy dữ liệu trả về
        const fetchProfile = async () => {
            try {
                const data = await getMeProfileApi({ accessToken });
                setProfileData(data);
            } catch (err) {
                console.error('Lỗi khi lấy profile:', err);
            }
        };

        if (isOpen) {
            fetchProfile();
        }
    }, [isOpen]);

    const handleUpdate = async () => {
        try {
            await updateUserProfileApi(userId, profileData, accessToken);
            onRequestClose(); // Đóng modal sau khi cập nhật thành công
        } catch (err) {
            console.error('Lỗi khi cập nhật profile:', err);
        }
    };

    return (
        <Modal isOpen={isOpen} onRequestClose={onRequestClose} className={cx('modal')} overlayClassName={cx('overlay')}>
            <div className={cx('modal-header')}>
                <h2>Chỉnh sửa phần giới thiệu</h2>
                <button className={cx('close-btn')} onClick={onRequestClose}>
                    ×
                </button>
            </div>

            <div className={cx('modal-body')}>
                <label>Tên*</label>
                {profileData ? (
                    <input
                        type="text"
                        placeholder="Nhập tên"
                        value={profileData.firstName}
                        onChange={(e) => {
                            setProfileData((prev) => ({
                                ...prev,
                                firstName: e.target.value,
                            }));
                        }}
                    />
                ) : (
                    <input
                        type="text"
                        placeholder="Nhập tên"
                        onChange={(e) =>
                            setProfileData((prev) => ({
                                ...prev,
                                firstName: e.target.value,
                            }))
                        }
                    />
                )}

                <label>Họ*</label>
                {profileData ? (
                    <input
                        type="text"
                        placeholder="Nhập họ"
                        value={profileData.lastName}
                        onChange={(e) => {
                            setProfileData((prev) => ({
                                ...prev,
                                lastName: e.target.value,
                            }));
                        }}
                    />
                ) : (
                    <input
                        type="text"
                        placeholder="Nhập họ"
                        onChange={(e) => {
                            setProfileData((prev) => ({
                                ...prev,
                                lastName: e.target.value,
                            }));
                        }}
                    />
                )}

                <label>Tiểu sử</label>
                {profileData ? (
                    <input
                        type="text"
                        placeholder="Mô tả thêm về bạn"
                        value={profileData.bio}
                        onChange={(e) => {
                            setProfileData((prev) => ({
                                ...prev,
                                bio: e.target.value,
                            }));
                        }}
                    />
                ) : (
                    <input
                        type="text"
                        placeholder="Mô tả thêm về bạn"
                        onChange={(e) => {
                            setProfileData((prev) => ({
                                ...prev,
                                bio: e.target.value,
                            }));
                        }}
                    />
                )}

                <label>Ngành*</label>
                <input type="text" placeholder="Technology, Information and Internet" />

                <label>Trường*</label>
                <select>
                    <option>Đại học Sư phạm kỹ thuật - Đại học Đà Nẵng</option>
                </select>

                {/* <div className={cx('checkbox')}>
                    <input type="checkbox" id="showSchool" defaultChecked />
                    <label htmlFor="showSchool">Hiển thị trường học trong phần giới thiệu của tôi</label>
                </div> */}

                <label>Quốc gia/Khu vực*</label>
                <input type="text" placeholder="Vietnam" />

                <label>Thành phố</label>
                <input type="text" placeholder="Đà Nẵng, Da Nang City" />
            </div>

            <div className={cx('modal-footer')}>
                <button className={cx('save-btn')} onClick={handleUpdate}>
                    Lưu
                </button>
            </div>
        </Modal>
    );
}

export default EditProfileModal;
