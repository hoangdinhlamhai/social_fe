import { useEffect, useRef, useState } from 'react';
import SockJS from 'sockjs-client';
import { Client } from '@stomp/stompjs';
import { fetchConversationsApi } from '~/services/chat.service';

const useChat = (roomId, currentUser, accessToken, onMessageReceived) => {
    // const [conversations, setConversations] = useState([]);
    const stompClientRef = useRef(null); // Lưu trữ stompClient, ko mất khi re-render, ko kích hoạt re-render
    const [messages, setMessages] = useState([]);

    useEffect(() => {
        if (!roomId || !currentUser) return;

        const client = new Client({
            // Thay vì new SockJS, chúng ta cung cấp một factory function
            webSocketFactory: () => new SockJS('http://localhost:8080/websocket'),
            debug: (str) => {
                console.log(new Date(), str); // Bật debug để xem log chi tiết
            },
            reconnectDelay: 5000, // Tự động kết nối lại sau 5 giây nếu mất kết nối
        });

        // Hàm được gọi khi kết nối thành công
        client.onConnect = () => {
            console.log('Connected via @stomp/stompjs');

            // Subscribe vào topic
            client.subscribe(`/topic/chat/room/${roomId}`, (payload) => {
                const newMessage = JSON.parse(payload.body);
                // Dùng callback để đảm bảo luôn thêm vào state mới nhất
                setMessages((prevMessages) => [...prevMessages, newMessage]);

                // Báo ra ngoài cho Sidebar (nếu truyền onMessageReceived từ ngoài vào)
                if (onMessageReceived) {
                    onMessageReceived(newMessage);
                }
            });
        };

        stompClientRef.current = client;

        // Hàm được gọi khi có lỗi
        client.onStompError = (frame) => {
            console.error('Broker reported error: ' + frame.headers['message']);
            console.error('Additional details: ' + frame.body);
        };

        // lịch sử tnhan và kích hoạt client
        const fetchHistory = async () => {
            try {
                const historyData = await fetchConversationsApi(accessToken, roomId);
                setMessages(historyData);
            } catch (error) {
                console.error('Failed to fetch history or connect:', error);
            }
        };

        fetchHistory();
        // Kích hoạt kết nối
        client.activate();

        // Cleanup function khi component unmount hoặc roomId/currentUser thay đổi
        return () => {
            console.log('clean up: disconnecting...');
            client.deactivate();
        };
    }, [roomId, currentUser, accessToken]);

    const sendMessage = (content) => {
        if (stompClientRef.current && content) {
            const chatMessage = {
                roomId,
                senderId: currentUser.id,
                content,
            };
            // Dùng phương thức publish
            stompClientRef.current.publish({
                destination: '/app/chat.sendMessage',
                body: JSON.stringify(chatMessage),
            });
        }
    };

    return { messages, sendMessage };
};

export { useChat };
