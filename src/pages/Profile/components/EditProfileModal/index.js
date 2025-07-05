import Modal from 'react-modal';
import classNames from 'classnames/bind';
import styles from './EditProfileModal.module.scss';
import { getMeProfileApi, updateUserProfileApi } from '~/services/user.service';
import { getAllCountriesApi, getCitiesByCountryApi } from '~/services/location.service';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

const cx = classNames.bind(styles);
//chỉ định phần tử gốc của ứng dụng React (thường là #root) để khi mở modal,
//nội dung bên ngoài modal sẽ bị ẩn khỏi trình đọc màn hình (screen readers).
Modal.setAppElement('#root');

function EditProfileModal({ isOpen, onRequestClose, onProfileUpdated }) {
    const [profileData, setProfileData] = useState(null);
    const { accessToken, accountLogin } = useSelector((state) => state.auth);
    const userId = accountLogin?.id;

    const [countries, setCountries] = useState([]);
    const [cities, setCities] = useState([]);

    useEffect(() => {
        // lấy danh sách quốc gia và thành phố từ API
        const fetchCountries = async () => {
            try {
                const res = await getAllCountriesApi({ accessToken });
                setCountries(res.data);
            } catch (err) {
                console.error('Lỗi khi lấy quốc gia:', err);
            }
        };
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
            fetchCountries();
            fetchProfile();
        }
    }, [isOpen]);

    //React chỉ re-render component khi:
    //State (useState) thay đổi
    //Props (từ component cha) thay đổi
    //Hoặc dùng một state management như Redux, Context và có update
    const handleUpdate = async () => {
        try {
            console.log('Cập nhật profile với dữ liệu:', profileData);
            await updateUserProfileApi(userId, profileData, accessToken);
            onRequestClose(); // Đóng modal
            // nếu có truyền props onProfileUpdated thì gọi lại để reload dữ liệu
            if (onProfileUpdated) onProfileUpdated();
            //Khi gọi hàm onProfileUpdated(), cập nhật state ở component cha (setProfileData(res.data);) → ProfileHeader re-render
        } catch (err) {
            console.error('Lỗi khi cập nhật profile:', err);
        }
    };

    //khi người dùng chọn quốc gia, gọi API để lấy danh sách thành phố tương ứng
    //và cập nhật state cities để hiển thị trong dropdown thành phố
    const handleCountryChange = async (e) => {
        const countryId = e.target.value;

        setProfileData((prev) => ({
            ...prev,
            countryId: countryId,
            cityId: '', // reset city khi đổi quốc gia
        }));

        try {
            const res = await getCitiesByCountryApi({ countryId, accessToken });
            setCities(res.data);
        } catch (err) {
            console.error('Lỗi khi lấy thành phố:', err);
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
                <select value={profileData?.countryId || ''} onChange={handleCountryChange}>
                    <option value="">-- Chọn quốc gia --</option>
                    {countries.map((country) => (
                        <option key={country.id} value={country.id}>
                            {country.name}
                        </option>
                    ))}
                </select>

                <label>Thành phố</label>
                <select
                    value={profileData?.cityId || ''}
                    onChange={(e) =>
                        setProfileData((prev) => ({
                            ...prev,
                            cityId: e.target.value,
                        }))
                    }
                >
                    <option value="">-- Chọn thành phố --</option>
                    {cities.map((city) => (
                        <option key={city.id} value={city.id}>
                            {city.name}
                        </option>
                    ))}
                </select>
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
