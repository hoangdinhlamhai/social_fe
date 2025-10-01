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

    const handleDeletedToReRender = async (id) => {
        setPosts((prev) => prev.filter((p) => p.id !== id));
    };

    const handleUpdatedToReRender = async (updatedPostData) => {
        //vì updatedPostData có imageUrls, nhưng trong post lại là postImages: [ { id: 101, url: "..." }, { id: 102, url: "..." } ],
        // => không update được hình ảnh ở UI
        // gửi tạm updatedPostData từ EditPostModal để cập nhật UI trong PostList
        setPosts((prev) =>
            prev.map((p) =>
                p.id === updatedPostData.postId
                    ? {
                          ...p,
                          content: updatedPostData.content,
                          postImages: updatedPostData.imageUrls.map((img, index) => ({
                              id: index,
                              url: img,
                          })),
                      }
                    : p,
            ),
        );
    };

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const response = await getPostByEmailApi(accessToken, emailFromParams);
                setPosts(response.data);
                console.log('Bài đăng:', response.data);
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
                <PostList
                    posts={posts}
                    profileData={profileData}
                    emailFromParams={emailFromParams}
                    onDeleted={handleDeletedToReRender}
                    //nếu muốn dùng callback thì onDeleted={(id) => handleDeletedToReRender(id)}
                    onUpdated={handleUpdatedToReRender} //hàm re-render sau khi update post
                />
            </div>
            <RightSidebar newsList={newsList} />
        </>
    );
}

export default Post;
