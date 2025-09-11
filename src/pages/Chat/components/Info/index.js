import classNames from 'classnames/bind';
import styles from './Info.module.scss';
import { FaUser, FaBell, FaSearch, FaChevronDown } from 'react-icons/fa';
import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { getChatRoomApi } from '~/services/chat.service';

const cx = classNames.bind(styles);

function Info({ roomId }) {
    const [openSection, setOpenSection] = useState(null);
    const [guestUserInfo, setGuestUserInfo] = useState(null);
    const { accessToken, accountLogin } = useSelector((state) => state.auth);

    const toggleSection = (section) => {
        setOpenSection(openSection === section ? null : section);
    };

    useEffect(() => {
        const fetchUserInfoInChatRoom = async () => {
            const chatRoomData = await getChatRoomApi(accessToken, roomId);
            const guestUser = chatRoomData.participantUser.find((user) => user.id !== accountLogin.id);
            setGuestUserInfo(guestUser);
        };
        fetchUserInfoInChatRoom();
    }, [roomId, accessToken, accountLogin]);

    if (!guestUserInfo) {
        return <div className={cx('chat-info')}>Loading...</div>;
    }

    return (
        <div className={cx('chat-info')}>
            {/* Avatar + name */}
            <div className={cx('info-header')}>
                <div className={cx('avatar')}></div>
                <h2 className={cx('chat-name')}>
                    {guestUserInfo.firstName} {guestUserInfo.lastName}
                </h2>
            </div>

            {/* Action buttons */}
            <div className={cx('actions')}>
                <div className={cx('action-item')}>
                    <FaUser />
                </div>
                <div className={cx('action-item')}>
                    <FaBell />
                </div>
                <div className={cx('action-item')}>
                    <FaSearch />
                </div>
            </div>

            {/* Sections */}
            <div className={cx('info-section')}>
                <h3 onClick={() => toggleSection('info')}>
                    Thông tin về đoạn chat
                    <FaChevronDown className={cx({ rotate: openSection === 'info' })} />
                </h3>
                {openSection === 'info' && (
                    <ul>
                        <li>Thành viên: 2</li>
                        <li>Ngày tạo: 01/09/2025</li>
                    </ul>
                )}
            </div>

            <div className={cx('info-section')}>
                <h3 onClick={() => toggleSection('settings')}>
                    Tùy chỉnh đoạn chat
                    <FaChevronDown className={cx({ rotate: openSection === 'settings' })} />
                </h3>
                {openSection === 'settings' && (
                    <div className={cx('section-content')}>
                        <button>Đổi màu</button>
                        <button>Đổi biệt danh</button>
                    </div>
                )}
            </div>

            <div className={cx('info-section')}>
                <h3 onClick={() => toggleSection('files')}>
                    File phương tiện & file
                    <FaChevronDown className={cx({ rotate: openSection === 'files' })} />
                </h3>
                {openSection === 'files' && <p>Chưa có file nào</p>}
            </div>

            <div className={cx('info-section')}>
                <h3 onClick={() => toggleSection('privacy')}>
                    Quyền riêng tư & hỗ trợ
                    <FaChevronDown className={cx({ rotate: openSection === 'privacy' })} />
                </h3>
                {openSection === 'privacy' && (
                    <div className={cx('section-content')}>
                        <button>Báo cáo</button>
                        <button>Chặn</button>
                    </div>
                )}
            </div>
        </div>
    );
}

export default Info;
