import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import InfiniteScroll from 'react-infinite-scroll-component';
import { getNewsFeedApi } from '~/services/newsfeed.service';
import PostItem from '../PostItem';

function PostList() {
    const { accessToken } = useSelector((state) => state.auth);
    const [postList, setPostList] = useState([]);
    const [hasMore, setHasMore] = useState(true);

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const data = await getNewsFeedApi(accessToken, null);
                setPostList(data);
                if (data.length === 0) setHasMore(false);
            } catch (error) {
                console.error('Error fetching posts:', error);
            }
        };

        fetchPosts();
    }, [accessToken]);

    return (
        <div
            id="scrollableDiv"
            style={{
                height: '600px',
                overflow: 'auto',
                scrollbarWidth: 'none', // Firefox
                msOverflowStyle: 'none', // IE and Edge
            }}
        >
            <InfiniteScroll
                dataLength={postList.length}
                next={async () => {
                    const newPosts = await getNewsFeedApi(accessToken, postList[postList.length - 1]?.id);
                    if (newPosts.length === 0) setHasMore(false);
                    setPostList((prev) => [...prev, ...newPosts]);
                }}
                hasMore={hasMore}
                scrollableTarget="scrollableDiv" //InfiniteScroll mặc định lắng nghe scroll của window, ở đây window không có scrollbar => không trigger next function
                //nên phải chỉ định scrollableTarget
                loader={<h4 className="text-center text-gray-500">Đang tải...</h4>}
                endMessage={<p className="text-center text-gray-400 mt-4">Không còn bài viết.</p>}
            >
                {postList.map((post, index) => (
                    <PostItem key={index} post={post} />
                ))}
            </InfiniteScroll>
        </div>
    );
}

export default PostList;
