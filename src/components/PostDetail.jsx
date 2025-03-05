import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";

function PostDetail() {
    const navigate = useNavigate();
    const { id } = useParams();
    const { posts } = useSelector((state) => state.posts);
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);
    const postId = Number(id);

    useEffect(() => {
        if (
            !posts.length ||
            isNaN(postId) ||
            postId < 1 ||
            postId > posts.length
        ) {
            navigate("/");
        }
    }, [posts, postId, navigate]);

    const post = posts.find((p) => p.id === postId);
    if (!post) return null;
    const { userId, id: ID, title, body, postImage } = post;

    return (
        <div className="post__container">
            <h1 className="detail_heading">
                {`Details Page For Post With ID ${ID}`}
            </h1>
            <div className="post_details">
                <img className="post_image" src={postImage} alt="post_image" />
                <div className="post_detail">
                    <p className="post__user-id">User ID: {userId}</p>
                    <p className="post__title">Title: {title}</p>
                    <p className="post__body">Body: {body}</p>
                </div>
            </div>
        </div>
    );
}

export default PostDetail;
