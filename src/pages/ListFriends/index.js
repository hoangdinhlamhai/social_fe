import classNames from 'classnames/bind';
import styles from './ListFriends.module.scss';
import { Link, useNavigate } from 'react-router-dom';
import { getFriendRequestByReceiverId, getFriendRequestBySenderId, unfriendApi } from '~/services/network.service';
import { createChatRoomApi, findChatRoomByParticipants } from '~/services/chat.service';
import { useSelector } from 'react-redux';
import { useEffect, useState } from 'react';

const cx = classNames.bind(styles);

function ListFriends() {
    const [friends, setFriends] = useState([]);
    const { accountLogin, accessToken } = useSelector((state) => state.auth);
    const userId = accountLogin?.id;
    const navigate = useNavigate();

    useEffect(() => {
        const fetchFriendRequests = async () => {
            try {
                const friendRequests = await getFriendRequestByReceiverId(accessToken, userId, 'ACCEPTED');
                const friendRequestsBySender = await getFriendRequestBySenderId(accessToken, userId, 'ACCEPTED');
                setFriends([...friendRequests, ...friendRequestsBySender]);
                console.log('Friend Requests:', friendRequests);
            } catch (error) {
                console.error('Error fetching friend requests:', error);
            }
        };
        fetchFriendRequests();
    }, [userId, accessToken]);

    const handleMessageClick = async (event, friendId) => {
        // Ngăn chặn hành vi mặc định của Link bọc ngoài
        event.preventDefault();
        event.stopPropagation(); // Ngăn sự kiện nổi bọt

        const userLoginId = accountLogin.id;

        try {
            const existingRoom = await findChatRoomByParticipants(accessToken, userLoginId, friendId);
            navigate(`/chat/${existingRoom.id}`);
        } catch (error) {
            const newRoom = await createChatRoomApi(accessToken, userLoginId, friendId);
            navigate(`/chat/${newRoom.id}`);
        }
    };

    const handleUnfriend = async (event, id) => {
        event.preventDefault();
        event.stopPropagation();

        try {
            await unfriendApi(id, accessToken);
            setFriends((prev) => prev.filter((friend) => friend.id !== id));
        } catch (error) {}
    };

    return (
        <div className={cx('friend-list-page')}>
            <h1 className={cx('title')}>Danh sách bạn bè</h1>
            <div className={cx('friend-list')}>
                {friends.map((friend) => {
                    let friendInfo = friend.sender.id === userId ? friend.receiver : friend.sender;
                    return (
                        <Link to={`/profile/${friendInfo.email}`} className={cx('card-link')} key={friendInfo.id}>
                            <div className={cx('card')}>
                                <img src={friendInfo.avatarUrl} alt="Avatar" className={cx('avatar')} />
                                <h3 className={cx('name')}>{friendInfo.firstName + ' ' + friendInfo.lastName}</h3>
                                <p className={cx('title')}>{friendInfo.bio}</p>
                                <div className={cx('friend-actions')}>
                                    <button
                                        className={cx('message-btn')}
                                        onClick={(event) => handleMessageClick(event, friendInfo.id)}
                                    >
                                        Nhắn tin
                                    </button>
                                    <button
                                        className={cx('unfriend-btn')}
                                        onClick={(event) => handleUnfriend(event, friend.id)}
                                    >
                                        Huỷ kết bạn
                                    </button>
                                </div>
                            </div>
                        </Link>
                    );
                })}
            </div>
        </div>
    );
}

export default ListFriends;
