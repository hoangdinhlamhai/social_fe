import classNames from 'classnames/bind';
import styles from './Chat.module.scss';

import Sidebar from './components/Sidebar';
import ChatWindow from './components/ChatWindow';
import Info from './components/Info';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

const cx = classNames.bind(styles);

function Chat() {
    const { roomId } = useParams();
    const { accessToken, accountLogin } = useSelector((state) => state.auth);

    return (
        <div className={cx('chat-page')}>
            <div className={cx('sidebar')}>
                <Sidebar />
            </div>

            <div className={cx('chat-window')}>
                <ChatWindow roomId={roomId} currentUser={accountLogin} accessToken={accessToken} />
            </div>

            <div className={cx('chat-info')}>
                <Info roomId={roomId} />
            </div>
        </div>
    );
}

export default Chat;
