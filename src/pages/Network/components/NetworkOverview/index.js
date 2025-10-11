import classNames from 'classnames/bind';
import styles from './NetworkOverview.module.scss';
import { getFriendRequestByReceiverId, getFriendRequestBySenderId } from '~/services/network.service';
import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';

const cx = classNames.bind(styles);

function NetworkOverview() {
    const { accessToken, accountLogin } = useSelector((state) => state.auth);
    const id = accountLogin?.id; // Dùng optional chaining (?) để tránh lỗi nếu accountLogin chưa có
    const [friendRequests, setFriendRequests] = useState(0);
    const [friends, setFriends] = useState(0);
    const [pendingFriends, setPendingFriends] = useState(0);

    useEffect(() => {
        const fetchFriendRequests = async () => {
            try {
                const friendRequests = await getFriendRequestBySenderId(accessToken, id, 'PENDING');
                setFriendRequests(friendRequests.length);
            } catch (error) {
                console.error('Error fetching friend requests:', error);
            }
        };

        const fetchPendingFriends = async () => {
            try {
                const pendingFriends = await getFriendRequestByReceiverId(accessToken, id, 'PENDING');
                setPendingFriends(pendingFriends.length);
            } catch (error) {
                console.error('Error fetching pending friends:', error);
            }
        };

        const fetchFriends = async () => {
            try {
                const friendsReceiver = await getFriendRequestByReceiverId(accessToken, id, 'ACCEPTED');
                const friendSender = await getFriendRequestBySenderId(accessToken, id, 'ACCEPTED');
                setFriends(friendsReceiver.length + friendSender.length);
            } catch (error) {
                console.error('Error fetching friends:', error);
            }
        };

        fetchFriendRequests();
        fetchPendingFriends();
        fetchFriends();
    }, [accessToken, id]);

    return (
        <div className={cx('overview-wrapper')}>
            <h1 className={cx('title')}>Tổng quan về mạng lưới</h1>
            <div className={cx('stats')}>
                <div>
                    <span>{friendRequests}</span>
                    <p>Đã gửi</p>
                </div>
                <div>
                    <span>{friends}</span>
                    <p>Bạn bè</p>
                </div>
                <div>
                    <span>{pendingFriends}</span>
                    <p>Đang chờ</p>
                </div>
            </div>
        </div>
    );
}

export default NetworkOverview;
