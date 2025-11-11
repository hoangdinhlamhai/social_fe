import classNames from 'classnames/bind';

import styles from './Home.module.scss';
import Sidebar from '~/pages/Home/components/Sidebar';
import CreatePost from '~/pages/Home/components/CreatePost';
import SortBar from '~/pages/Home/components/SortBar';
import PostList from '~/pages/Home/components/PostList';
import RightSidebar from '~/pages/Home/components/RightSidebar';

import { useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { getMeProfileApi } from '~/services/user.service';

const cx = classNames.bind(styles);

const newsList = [
    { title: 'A big week for Big Tech', time: '1 giờ trước', readers: '6.786 người đọc' },
    { title: 'Uncertain companies cut spending', time: '1 giờ trước', readers: '5.279 người đọc' },
    { title: 'Canada heads to the polls', time: '1 giờ trước', readers: '4.534 người đọc' },
    { title: 'Huawei debuts new AI chip', time: '1 giờ trước', readers: '2.383 người đọc' },
    { title: 'Temu, Shein prices start to surge', time: '1 giờ trước', readers: '2.251 người đọc' },
];

function Home() {
    const { accessToken } = useSelector((state) => state.auth);
    const [profileData, setProfileData] = useState(null);

    useEffect(() => {
        const fetchProfileData = async () => {
            try {
                const response = await getMeProfileApi({ accessToken });
                setProfileData(response);
                console.log('Profile data fetched:', response);
            } catch (error) {
                console.error('Error fetching profile data:', error);
            }
        };
        fetchProfileData();
    }, [accessToken]);

    return (
        <>
            <Sidebar profileData={profileData} />
            <div className={cx('content')}>
                <CreatePost profileData={profileData} />
                <SortBar />
                <div className={cx('post-list-wrapper')}>
                    <PostList />
                </div>
            </div>
            <RightSidebar newsList={newsList} />
        </>
    );
}

export default Home;
