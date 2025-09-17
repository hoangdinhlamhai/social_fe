import classNames from 'classnames/bind';
import styles from './ChatWindow.module.scss';
import { IoVideocam, IoSend } from 'react-icons/io5';
import { IoIosInformationCircle } from 'react-icons/io';
import { BsTelephoneFill } from 'react-icons/bs';
import { useChat } from '~/hooks/useChat';
import { useState, useEffect } from 'react';
import { getChatRoomApi } from '~/services/chat.service';
import EmojiPicker from 'emoji-picker-react';

const cx = classNames.bind(styles);

function ChatWindow({ roomId, currentUser, accessToken, messages, onMessageSent }) {
    const { sendMessage } = useChat(roomId, currentUser, accessToken);
    const [newMessage, setNewMessage] = useState('');
    const [guestUserInfo, setGuestUserInfo] = useState(null);
    const [showEmojiPicker, setShowEmojiPicker] = useState(false);

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
        setShowEmojiPicker((prev) => !prev);
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

            <div className={cx('message-list')}>
                {messages.map((msg) => (
                    // <div key={msg.id} className={`message ${msg.senderId === currentUser.id ? 'sent' : 'received'}`}> => "message sent", "message received".
                    //     <div className={cx('bubble')}>{msg.content}</div>
                    // </div>
                    // với css Module thì phải như này: => cx('message', 'sent')
                    <div key={msg.id} className={cx('message', msg.senderId === currentUser.id ? 'sent' : 'received')}>
                        <div className={cx('bubble')}>{msg.content}</div>
                    </div>
                ))}
            </div>

            <div className={cx('chat-input')}>
                <input
                    type="text"
                    placeholder="Nhập tin nhắn..."
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    onKeyDown={(e) => {
                        if (e.key === 'Enter' && !e.shiftKey) {
                            e.preventDefault();
                            handleSendMessage();
                        }
                    }}
                />
                <div style={{ position: 'relative' }}>
                    <button type="button" onClick={() => setShowEmojiPicker((prev) => !prev)}>
                        😊
                    </button>
                    {showEmojiPicker && (
                        <div
                            style={{
                                position: 'absolute',
                                bottom: '40px',
                                right: '0',
                                zIndex: 1000,
                            }}
                        >
                            <EmojiPicker
                                onEmojiClick={(emojiData) => {
                                    setNewMessage((prev) => prev + emojiData.emoji);
                                }}
                            />
                        </div>
                    )}
                </div>
                <button style={{ marginTop: '6px' }} onClick={handleSendMessage}>
                    <IoSend />
                </button>
            </div>
        </div>
    );
}

export default ChatWindow;
