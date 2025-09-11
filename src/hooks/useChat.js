import { useEffect, useRef, useState } from 'react';
import SockJS from 'sockjs-client';
import { Client } from '@stomp/stompjs';
import { fetchConversationsApi } from '~/services/chat.service';

const useChat = (roomId, currentUser, accessToken) => {
    // const [conversations, setConversations] = useState([]);
    const stompClientRef = useRef(null); // Lưu trữ stompClient, ko mất khi re-render, ko kích hoạt re-render
    const messagesRef = useRef([]); // Dùng useRef thay vì useState để lưu messages
    const setMessagesState = useState([])[1]; // Chỉ lấy hàm setState để trigger re-render

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
                // Cập nhật messages thông qua ref và trigger re-render
                messagesRef.current = [...messagesRef.current, newMessage];
                setMessagesState([...messagesRef.current]);
            });
        };

        // Hàm được gọi khi có lỗi
        client.onStompError = (frame) => {
            console.error('Broker reported error: ' + frame.headers['message']);
            console.error('Additional details: ' + frame.body);
        };

        // Hàm tải lịch sử và kích hoạt client
        const fetchAndConnect = async () => {
            try {
                const historyData = await fetchConversationsApi(accessToken, roomId);
                // Cập nhật messages và trigger re-render
                messagesRef.current = historyData;
                setMessagesState(historyData);

                // 3. Kích hoạt kết nối
                client.activate();
                stompClientRef.current = client;
            } catch (error) {
                console.error('Failed to fetch history or connect:', error);
            }
        };

        fetchAndConnect();

        return () => {
            if (stompClientRef.current) {
                stompClientRef.current.deactivate();
            }
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

    return { messages: messagesRef.current, sendMessage };
};

export { useChat };
