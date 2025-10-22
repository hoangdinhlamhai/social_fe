import classNames from 'classnames/bind';
import styles from './ListFriends.module.scss';
import { Link } from 'react-router-dom';
import { getFriendRequestByReceiverId, getFriendRequestBySenderId } from '~/services/network.service';
import { useSelector } from 'react-redux';
import { useEffect, useState } from 'react';

const cx = classNames.bind(styles);

function ListFriends() {
    const [friends, setFriends] = useState([]);
    const { accountLogin, accessToken } = useSelector((state) => state.auth);
    const userId = accountLogin?.id;

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
                                    <button className={cx('message-btn')}>Nhắn tin</button>
                                    <button className={cx('unfriend-btn')}>Huỷ kết bạn</button>
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
