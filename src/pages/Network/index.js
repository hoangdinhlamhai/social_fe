import classNames from 'classnames/bind';
import styles from './Network.module.scss';

import NetworkOverview from './components/NetworkOverview';
import ConnectionRequests from './components/ConnectionRequests';
import SuggestedList from './components/SuggestedList';

import { useSelector } from 'react-redux';

const cx = classNames.bind(styles);

function Network() {
    const { accountLogin } = useSelector((state) => state.auth);
    const userId = accountLogin?.id;

    return (
        <div className={cx('network-page')}>
            <NetworkOverview />
            <div className={cx('main')}>
                <ConnectionRequests />
                <SuggestedList currentUserId={userId} />
            </div>
        </div>
    );
}

export default Network;
