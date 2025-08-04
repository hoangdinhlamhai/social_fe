import styles from './ChatbotWidget.module.scss';
import classNames from 'classnames/bind';
import { useState } from 'react';
import { getChatbotResponseApi } from '~/services/chatbot.service';

const cx = classNames.bind(styles);

function ChatbotWidget({ onclose }) {
    // const arrMessage = [] nên dùng useState để khi gọi setMessages thì nó sẽ rerender lại component
    // nếu dùng arrMessage.push thì nó sẽ không rerender lại component
    const [messages, setMessages] = useState([]);
    const [inputValue, setInputValue] = useState('');

    const callChat = async (message) => {
        try {
            const response = await getChatbotResponseApi(message);
            const data = response.data.reply;
            return data;
        } catch (error) {
            console.error('Lỗi gọi API chatbot:', error);
        }
    };

    const handleSendMessage = () => {
        const trimmed = inputValue.trim();
        if (!trimmed) return;

        setMessages((prev) => {
            return [...prev, { text: trimmed, sender: 'user' }];
        });
        setInputValue('');

        // Gọi chatbot trước
        const botReply = callChat(trimmed);
        setMessages((prev) => {
            return [...prev, { text: botReply, sender: 'bot' }];
        });
    };

    return (
        <div className={cx('chat-widget')}>
            <div className={cx('chat-header')}>
                <span>Chatbot</span>
                <button className={cx('close-btn')} onClick={onclose}>
                    ✖
                </button>
            </div>
            <div className={cx('chat-body')}>
                {messages.map((message, index) => (
                    <div key={index} className={cx('message-user')}>
                        {message.text}
                    </div>
                ))}
            </div>
            <div className={cx('chat-input')}>
                <input
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    placeholder="Nhập tin nhắn..."
                />
                <button onClick={handleSendMessage}>Gửi</button>
            </div>
        </div>
    );
}

export default ChatbotWidget;
