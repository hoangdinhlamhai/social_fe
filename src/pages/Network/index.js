import classNames from 'classnames/bind';
import styles from './Network.module.scss';

import NetworkOverview from './components/NetworkOverview';
import ConnectionRequests from './components/ConnectionRequests';
import SuggestedList from './components/SuggestedList';

const cx = classNames.bind(styles);

function Network() {
    return (
        <div className={cx('network-page')}>
            <NetworkOverview />
            <div className={cx('main')}>
                <ConnectionRequests />
                <SuggestedList />
            </div>
        </div>
    );
}

export default Network;
