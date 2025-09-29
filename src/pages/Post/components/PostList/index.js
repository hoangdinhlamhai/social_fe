import PostItem from '../PostItem';

function PostList({ posts, profileData, emailFromParams, onDeleted }) {
    return (
        <>
            {posts.map((post, index) => (
                <PostItem
                    key={index}
                    post={post}
                    profileData={profileData}
                    emailFromParams={emailFromParams}
                    onDeleted={onDeleted}
                />
            ))}
        </>
    );
}

export default PostList;
