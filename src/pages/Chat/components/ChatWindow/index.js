import classNames from 'classnames/bind';
import styles from './ChatWindow.module.scss';
import { IoVideocam, IoSend } from 'react-icons/io5';
import { IoIosInformationCircle } from 'react-icons/io';
import { BsTelephoneFill } from 'react-icons/bs';

const cx = classNames.bind(styles);

function ChatWindow() {
    const messages = [
        { id: 1, sender: 'me', text: 'Hello!' },
        { id: 2, sender: 'other', text: 'Hi, how are you?' },
        { id: 3, sender: 'me', text: "I'm good, thanks." },
    ];

    return (
        <div className={cx('chat-window')}>
            {/* Header */}
            <div className={cx('chat-header')}>
                <div className={cx('chat-title')}>Tên đoạn chat</div>
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
                    <div key={msg.id} className={`message ${msg.sender === 'me' ? 'me' : 'other'}`}>
                        <div className={cx('bubble')}>{msg.text}</div>
                    </div>
                ))}
            </div>

            {/* Input */}
            <div className={cx('chat-input')}>
                <input type="text" placeholder="Aa" />
                <button>😊</button>
                <button style={{ marginTop: '6px' }}>
                    <IoSend />
                </button>
            </div>
        </div>
    );
}

export default ChatWindow;
