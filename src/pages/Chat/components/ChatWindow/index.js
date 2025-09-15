import classNames from 'classnames/bind';
import styles from './ChatWindow.module.scss';
import { IoVideocam, IoSend } from 'react-icons/io5';
import { IoIosInformationCircle } from 'react-icons/io';
import { BsTelephoneFill } from 'react-icons/bs';
import { useChat } from '~/hooks/useChat';
import { useState, useEffect } from 'react';
import { getChatRoomApi } from '~/services/chat.service';

const cx = classNames.bind(styles);

function ChatWindow({ roomId, currentUser, accessToken, messages, onMessageSent }) {
    const { sendMessage } = useChat(roomId, currentUser, accessToken);
    const [newMessage, setNewMessage] = useState('');
    const [guestUserInfo, setGuestUserInfo] = useState(null);

    const handleSendMessage = () => {
        const newMsg = {
            roomId,
            senderId: currentUser.id,
            senderName: `${currentUser.firstName} ${currentUser.lastName}`,
            content: newMessage,
            sentAt: new Date().toISOString(),
        };
        sendMessage(newMessage);
        setNewMessage('');
        onMessageSent(newMsg); // báo cho cha cập nhật sidebar ngay
    };

    useEffect(() => {
        const fetchUserInfoInChatRoom = async () => {
            const chatRoomData = await getChatRoomApi(accessToken, roomId);
            const guestUser = chatRoomData.participantUser.find((user) => user.id !== currentUser.id);
            setGuestUserInfo(guestUser);
        };
        fetchUserInfoInChatRoom();
    }, [roomId, accessToken, currentUser]);

    if (!guestUserInfo) {
        return <div className={cx('chat-window')}>Loading...</div>;
    }

    return (
        <div className={cx('chat-window')}>
            {/* Header */}
            <div className={cx('chat-header')}>
                <div className={cx('chat-title')}>
                    {guestUserInfo.firstName} {guestUserInfo.lastName}
                </div>
                <div className={cx('chat-actions')}>
                    <button>
                        <BsTelephoneFill />
                    </button>
                    <button>
                        <IoVideocam />
                    </button>
                    <button>
                        <IoIosInformationCircle />
                    </button>
                </div>
            </div>

            {/* Message list */}
            <div className={cx('message-list')}>
                {messages.map((msg) => (
                    <div key={msg.id} className={`message ${msg.senderId === currentUser.id ? 'sent' : 'received'}`}>
                        <div className={cx('bubble')}>{msg.content}</div>
                    </div>
                ))}
            </div>

            {/* Input */}
            <div className={cx('chat-input')}>
                <input
                    type="text"
                    placeholder="Nhập tin nhắn..."
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                />
                <button>😊</button>
                <button style={{ marginTop: '6px' }} onClick={handleSendMessage}>
                    <IoSend />
                </button>
            </div>
        </div>
    );
}

export default ChatWindow;
