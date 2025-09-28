import classNames from 'classnames/bind';

import Sidebar from '~/pages/Post/components/Sidebar';
import PostList from '~/pages/Post/components/PostList';
import RightSidebar from '~/pages/Post/components/RightSidebar';
import styles from './Post.module.scss';
import { getPostByEmailApi } from '~/services/post.service';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getUserProfileApi } from '~/services/user.service';

const cx = classNames.bind(styles);

const newsList = [
    { title: 'A big week for Big Tech', time: '1 giờ trước', readers: '6.786 người đọc' },
    { title: 'Uncertain companies cut spending', time: '1 giờ trước', readers: '5.279 người đọc' },
    { title: 'Canada heads to the polls', time: '1 giờ trước', readers: '4.534 người đọc' },
    { title: 'Huawei debuts new AI chip', time: '1 giờ trước', readers: '2.383 người đọc' },
    { title: 'Temu, Shein prices start to surge', time: '1 giờ trước', readers: '2.251 người đọc' },
];

function Post() {
    const { accessToken } = useSelector((state) => state.auth);
    const [posts, setPosts] = useState([]);
    const [profileData, setProfileData] = useState(null);
    const { email: emailFromParams } = useParams();

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const response = await getPostByEmailApi(accessToken, emailFromParams);
                setPosts(response.data);
            } catch (error) {
                console.error('Lỗi khi lấy bài đăng:', error);
            }
        };

        const fetchProfileData = async () => {
            try {
                const response = await getUserProfileApi(accessToken, emailFromParams);
                setProfileData(response);
            } catch (error) {
                console.error('Lỗi khi lấy profile:', error);
            }
        };

        fetchPosts();
        fetchProfileData();
    }, [emailFromParams, accessToken]);

    if (!profileData) {
        return <div>Loading...</div>;
    }

    return (
        <>
            <Sidebar profileData={profileData} />
            <div className={cx('content')}>
                {posts.length === 0 && <div>Người dùng chưa có bài viết nào.</div>}
                <PostList posts={posts} profileData={profileData} emailFromParams={emailFromParams} />
            </div>
            <RightSidebar newsList={newsList} />
        </>
    );
}

export default Post;
