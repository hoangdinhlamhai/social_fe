import { FaComments } from 'react-icons/fa';
import styles from './ChatIconButton.module.scss';
import classNames from 'classnames/bind';

const cx = classNames.bind(styles);

export default function ChatIconButton({ onClick }) {
    return (
        <button className={cx('chat-icon-button')} onClick={onClick}>
            <FaComments size={24} />
        </button>
    );
}
