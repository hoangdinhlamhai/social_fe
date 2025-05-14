import PostItem from '../PostItem';

function PostList({ posts }) {
    return (
        <>
            {posts.map((post, index) => (
                <PostItem key={index} post={post} />
            ))}
        </>
    );
}

export default PostList;
