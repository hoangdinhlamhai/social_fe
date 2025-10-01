import PostItem from '../PostItem';

function PostList({ posts, profileData, emailFromParams, onDeleted, onUpdated }) {
    return (
        <>
            {posts.map((post, index) => (
                <PostItem
                    key={index}
                    post={post}
                    profileData={profileData}
                    emailFromParams={emailFromParams}
                    onDeleted={onDeleted}
                    onUpdated={onUpdated}
                />
            ))}
        </>
    );
}

export default PostList;
