import PostItem from '../PostItem';

function PostList({ posts, profileData, emailFromParams }) {
    return (
        <>
            {posts.map((post, index) => (
                <PostItem key={index} post={post} profileData={profileData} emailFromParams={emailFromParams} />
            ))}
        </>
    );
}

export default PostList;
