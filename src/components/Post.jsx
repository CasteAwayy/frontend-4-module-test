import { memo, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchPostImage } from "../features/posts/postsSlice";
import { useNavigate } from "react-router-dom";
function expandBody(body) {
    const c = body.replaceAll("\n", " ").split("").slice(0, 50).join("");
    return c;
}
function Post({ post }) {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [body, setBody] = useState(() => expandBody(post.body));
    const [readmore, setReadmore] = useState(false);
    const { imageStatus, imageError } = useSelector((state) => state.posts);
    useEffect(() => {
        if (post.postImage) return;
        dispatch(fetchPostImage(post.id));
    }, [dispatch, post.id, post.postImage]);
    function handleClick() {
        navigate(`/item/${post.id}`);
    }
    function handleBody(e) {
        e.stopPropagation();
        setReadmore(!readmore);
        if (readmore) {
            setBody(expandBody(post.body));
        } else
            setBody(() => {
                return post.body;
            });
    }
    return (
        <div className="post" onClick={handleClick}>
            <div className="image">
                {imageStatus === "loading" ? (
                    <div className="loader"></div>
                ) : (
                    <img
                        className="post_image"
                        src={post.postImage}
                        alt={`post_image_${post.userId}`}
                    />
                )}
                {imageStatus === "error" && <p>{imageError}</p>}
            </div>
            <div className="post_nano_detail">
                <p className="post__user-id">User ID : {post.userId}</p>
                <p className="post__title">Title : {post.title}</p>
                {
                    <div>
                        <p className="post__body">Body : {body}</p>
                        <button className="read_more" onClick={handleBody}>
                            {!readmore ? "Read more..." : "Read less"}
                        </button>
                    </div>
                }
            </div>
        </div>
    );
}

export default memo(Post);
