import classNames from 'classnames/bind';
import styles from './Chat.module.scss';

import Sidebar from './components/Sidebar';
import ChatWindow from './components/ChatWindow';
import Info from './components/Info';

const cx = classNames.bind(styles);

function Chat() {
    return (
        <div className={cx('chat-page')}>
            <div className={cx('sidebar')}>
                <Sidebar />
            </div>

            <div className={cx('chat-window')}>
                <ChatWindow />
            </div>

            <div className={cx('chat-info')}>
                <Info />
            </div>
        </div>
    );
}

export default Chat;
