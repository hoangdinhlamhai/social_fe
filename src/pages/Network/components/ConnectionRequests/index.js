import classNames from 'classnames/bind';
import styles from './ConnectionRequests.module.scss';
import { useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { getFriendRequestByReceiverId, acceptFriendRequest, declineFriendRequest } from '~/services/network.service';

const cx = classNames.bind(styles);

function ConnectionRequests() {
    const { accessToken, accountLogin } = useSelector((state) => state.auth);
    const receiverId = accountLogin?.id; // Dùng optional chaining (?) để tránh lỗi nếu accountLogin chưa có
    const [friendRequests, setFriendRequests] = useState([]);

    useEffect(() => {
        const fetchFriendRequests = async () => {
            try {
                const friendRequests = await getFriendRequestByReceiverId(accessToken, receiverId, 'PENDING');
                setFriendRequests(friendRequests);
            } catch (error) {
                console.error('Error fetching friend requests:', error);
            }
        };
        fetchFriendRequests();
    }, [accessToken, receiverId]);

    const handleAccept = async (requestId) => {
        try {
            await acceptFriendRequest(accessToken, requestId);
            setFriendRequests((prev) => prev.filter((request) => request.id !== requestId)); //set lại friendRequests để re-render
        } catch (error) {
            console.error('Error accepting friend request:', error);
        }
    };

    const handleDecline = async (requestId) => {
        try {
            await declineFriendRequest(accessToken, requestId);
            setFriendRequests((prev) => prev.filter((request) => request.id !== requestId)); //set lại friendRequests để re-render
        } catch (error) {
            console.error('Error declining friend request:', error);
        }
    };

    if (!friendRequests) {
        return null;
    }

    return (
        <div className={cx('requests-wrapper')}>
            <h2 className={cx('title')}>Lời mời kết nối</h2>
            {friendRequests.length === 0 ? (
                <p className={cx('empty')}>Không có lời mời</p>
            ) : (
                <ul className={cx('list')}>
                    {friendRequests.map((req) => (
                        <li key={req.id} className={cx('item')}>
                            <img
                                src={req.sender.avatarUrl}
                                alt={req.sender.firstName + ' ' + req.sender.lastName}
                                className={cx('avatar')}
                            />
                            <div className={cx('info')}>
                                <h3 className={cx('name')}>
                                    {req.sender.firstName} {req.sender.lastName}
                                </h3>
                                <p className={cx('title-job')}>{req.sender.bio}</p>
                                <div className={cx('actions')}>
                                    <button className={cx('accept')} onClick={() => handleAccept(req.id)}>
                                        Chấp nhận
                                    </button>
                                    <button className={cx('ignore')} onClick={() => handleDecline(req.id)}>
                                        Bỏ qua
                                    </button>
                                </div>
                            </div>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}

export default ConnectionRequests;
