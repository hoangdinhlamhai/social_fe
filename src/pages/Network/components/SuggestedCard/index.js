import classNames from 'classnames/bind';
import styles from './SuggestedCard.module.scss';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { createChatRoomApi, findChatRoomByParticipants } from '~/services/chat.service';

const cx = classNames.bind(styles);

function SuggestedCard({ userData }) {
    const { accessToken, accountLogin } = useSelector((state) => state.auth);
    const navigate = useNavigate();

    const handleMessageClick = async (event) => {
        // Ngăn chặn hành vi mặc định của Link bọc ngoài
        event.preventDefault();
        event.stopPropagation(); // Ngăn sự kiện nổi bọt

        const userLoginId = accountLogin.id;
        const userGuestId = userData.id;

        try {
            const existingRoom = await findChatRoomByParticipants(accessToken, userLoginId, userGuestId);
            navigate(`/chat/${existingRoom.id}`);
        } catch (error) {
            const newRoom = await createChatRoomApi(accessToken, userLoginId, userGuestId);
            navigate(`/chat/${newRoom.id}`);
        }
    };

    return (
        <Link to={`/profile/${userData.email}`} className={cx('card-link')}>
            <div className={cx('card')}>
                <button className={cx('close-btn')}>×</button>
                <img src={userData.avatar_url} alt="Avatar" className={cx('avatar')} />
                <h3 className={cx('name')}>{userData.name}</h3>
                <p className={cx('title')}>{userData.bio}</p>
                <button className={cx('follow-btn')} onClick={handleMessageClick}>
                    Nhắn tin
                </button>
            </div>
        </Link>
    );
}

export default SuggestedCard;
