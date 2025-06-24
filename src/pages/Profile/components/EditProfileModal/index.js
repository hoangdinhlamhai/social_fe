import Modal from 'react-modal';
import classNames from 'classnames/bind';
import styles from './EditProfileModal.module.scss';

const cx = classNames.bind(styles);
//chỉ định phần tử gốc của ứng dụng React (thường là #root) để khi mở modal,
//nội dung bên ngoài modal sẽ bị ẩn khỏi trình đọc màn hình (screen readers).
Modal.setAppElement('#root');

function EditProfileModal({ isOpen, onRequestClose }) {
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
                <input type="text" placeholder="Lâm Hải" />

                <label>Họ*</label>
                <input type="text" placeholder="Hoàng Đình" />

                <label>Tiểu sử</label>
                <input type="text" placeholder="heri" />

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

                <div className={cx('contact')}>
                    <a href="#">Chỉnh sửa thông tin liên hệ</a>
                </div>
            </div>

            <div className={cx('modal-footer')}>
                <button className={cx('save-btn')}>Lưu</button>
            </div>
        </Modal>
    );
}

export default EditProfileModal;
