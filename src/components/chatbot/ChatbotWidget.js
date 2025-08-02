import styles from './ChatbotWidget.module.scss';
import classNames from 'classnames/bind';

const cx = classNames.bind(styles);

function ChatbotWidget({ onclose }) {
    return (
        <div className={cx('chat-widget')}>
            <div className={cx('chat-header')}>
                <span>Chatbot</span>
                <button className={cx('close-btn')} onClick={onclose}>
                    ✖
                </button>
            </div>
            <div className={cx('chat-body')}></div>
            <div className={cx('chat-input')}>
                <input placeholder="Nhập tin nhắn..." />
                <button>Gửi</button>
            </div>
        </div>
    );
}

export default ChatbotWidget;
