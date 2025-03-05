import { useDispatch, useSelector } from "react-redux";
import Post from "./Post";
import { useEffect } from "react";
import { fetchPosts } from "../features/posts/postsSlice";
import FullPageLoader from "./FullPageLoader";
function Posts() {
    const dispatch = useDispatch();
    const { posts, status } = useSelector((state) => state.posts);
    useEffect(() => {
        if (posts.length) return;
        dispatch(fetchPosts());
    }, [dispatch, posts.length]);
    if (status === "loading") return <FullPageLoader />;
    return (
        <div className="posts_container">
            {posts?.length &&
                posts?.map((post) => {
                    return <Post key={post.id} post={post} />;
                })}
        </div>
    );
}

export default Posts;
