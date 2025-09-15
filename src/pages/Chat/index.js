import classNames from 'classnames/bind';
import styles from './Chat.module.scss';

import Sidebar from './components/Sidebar';
import ChatWindow from './components/ChatWindow';
import Info from './components/Info';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { useChat } from '~/hooks/useChat';
import { useState, useEffect } from 'react';
import { getListChatRoomByUserId } from '~/services/chat.service';

const cx = classNames.bind(styles);

function Chat() {
    const { roomId } = useParams();
    const { accessToken, accountLogin } = useSelector((state) => state.auth);
    const { messages } = useChat(roomId, accountLogin, accessToken);

    const [chatRooms, setChatRooms] = useState([]);

    useEffect(() => {
        const fetchListChatRoomAndLastMessage = async () => {
            const rooms = await getListChatRoomByUserId(accessToken, accountLogin.id);
            setChatRooms(rooms);
        };

        fetchListChatRoomAndLastMessage();
    }, [accessToken, accountLogin]);

    return (
        <div className={cx('chat-page')}>
            <div className={cx('sidebar')}>
                <Sidebar chatRooms={chatRooms} />
            </div>

            <div className={cx('chat-window')}>
                <ChatWindow
                    roomId={roomId}
                    currentUser={accountLogin}
                    accessToken={accessToken}
                    messages={messages}
                    onMessageSent={(newMsg) => {
                        //lấy tạm object mới từ con ChatWindow, để cập nhật lại state chatRooms ngay,
                        //nếu ko có obj kia, thì phải gọi getListChatRoomByUserId
                        //lastMessage được backend update thông qua WebSocket, nhưng lại chỉ rely vào gọi lại API getListChatRoomByUserId → dẫn tới trễ hoặc bỏ lỡ.
                        setChatRooms((prev) =>
                            prev.map((room) =>
                                room.id === parseInt(roomId) ? { ...room, lastMessage: newMsg } : room,
                            ),
                        );
                    }}
                />
            </div>

            <div className={cx('chat-info')}>
                <Info roomId={roomId} />
            </div>
        </div>
    );
}

export default Chat;
