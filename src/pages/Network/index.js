import classNames from 'classnames/bind';
import styles from './Network.module.scss';

import NetworkOverview from './components/NetworkOverview';
import ConnectionRequests from './components/ConnectionRequests';
import SuggestedList from './components/SuggestedList';

import { getAllUsersApi } from '~/services/user.service';

import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

const cx = classNames.bind(styles);

function Network() {
    const [allUsersData, setAllUsersData] = useState([]);
    const { accessToken } = useSelector((state) => state.auth);

    useEffect(() => {
        const fetchAllUsers = async () => {
            try {
                const users = await getAllUsersApi(accessToken);
                setAllUsersData(users);
            } catch (error) {
                console.error('Error fetching all users:', error);
            }
        };
        fetchAllUsers();
    }, [accessToken]);

    return (
        <div className={cx('network-page')}>
            <NetworkOverview />
            <div className={cx('main')}>
                <ConnectionRequests />
                <SuggestedList allUsersData={allUsersData} />
            </div>
        </div>
    );
}

export default Network;
