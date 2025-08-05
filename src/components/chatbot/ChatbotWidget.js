import styles from './ChatbotWidget.module.scss';
import classNames from 'classnames/bind';
import { useState } from 'react';
import { getChatbotResponseApi } from '~/services/chatbot.service';
import { FaMicrophone } from 'react-icons/fa';

const cx = classNames.bind(styles);

function ChatbotWidget({ onclose }) {
    // const arrMessage = [] nên dùng useState để khi gọi setMessages thì nó sẽ rerender lại component
    // nếu dùng arrMessage.push thì nó sẽ không rerender lại component
    const [userMessages, setUserMessages] = useState([]);
    const [inputValue, setInputValue] = useState('');
    const [isBotTyping, setIsBotTyping] = useState(false);

    const callChat = async (message) => {
        try {
            const response = await getChatbotResponseApi(message);
            const data = response.data.reply;
            return data;
        } catch (error) {
            console.error('Lỗi gọi API chatbot:', error);
        }
    };

    const handleSendMessage = async () => {
        const trimmed = inputValue.trim();
        if (!trimmed) return;

        //Lúc này, React lên lịch rerender, nhưng chưa làm ngay. Nó đợi hàm JS hiện tại (handleSendMessage) hoàn tất hoặc await xuất hiện.
        setUserMessages((prev) => [...prev, { text: trimmed, sender: 'user' }]);
        setInputValue('');

        // Bắt đầu loading
        setIsBotTyping(true);

        try {
            //Hàm dừng lại, nhường quyền xử lý cho React.
            //React thấy rảnh → rerender lần đầu → hiển thị tin nhắn người dùng.
            const botReply = await callChat(trimmed);

            // Kết thúc loading + thêm tin nhắn bot
            setUserMessages((prev) => [...prev, { text: botReply, sender: 'bot' }]);
        } catch (err) {
            setUserMessages((prev) => [...prev, { text: 'Bot gặp lỗi khi phản hồi.', sender: 'bot' }]);
        } finally {
            setIsBotTyping(false);
        }
    };

    const handleVoiceInput = () => {
        if (!('webkitSpeechRecognition' in window)) {
            alert('Trình duyệt không hỗ trợ tính năng ghi âm.');
            return;
        }

        const recognition = new window.webkitSpeechRecognition();
        recognition.lang = 'vi-VN'; // Hỗ trợ tiếng Việt
        recognition.interimResults = false;
        recognition.maxAlternatives = 1;

        recognition.onstart = () => {
            console.log('🎙️ Đang nghe...');
        };

        recognition.onresult = (event) => {
            const transcript = event.results[0][0].transcript;
            console.log('Kết quả:', transcript);
            setInputValue(transcript); // Đưa vào ô input
        };

        recognition.onerror = (event) => {
            console.error('Lỗi khi nhận giọng nói:', event.error);
            alert('Lỗi khi nhận giọng nói: ' + event.error);
        };

        recognition.start();
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
                {userMessages.map((message, index) =>
                    message.sender === 'user' ? (
                        <div key={index} className={cx('user-message')}>
                            <span>{message.text}</span>
                        </div>
                    ) : (
                        <div key={index} className={cx('bot-message')}>
                            <span>{message.text}</span>
                        </div>
                    ),
                )}
                {isBotTyping && (
                    <div className={cx('bot-message', 'typing-indicator')}>
                        <span className={cx('dots')}></span>
                    </div>
                )}
            </div>
            <div className={cx('chat-input')}>
                <input
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    placeholder="Nhập tin nhắn..."
                    onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                            handleSendMessage();
                        }
                    }}
                />
                <button onClick={handleVoiceInput}>
                    <FaMicrophone />
                </button>
                <button
                    onClick={() => {
                        handleSendMessage();
                    }}
                >
                    Gửi
                </button>
            </div>
        </div>
    );
}

export default ChatbotWidget;
