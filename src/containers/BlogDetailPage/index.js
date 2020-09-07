import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { blogActions } from "../../redux/actions";
import ClipLoader from "react-spinners/ClipLoader";
import Markdown from "react-markdown";
import Moment from "react-moment";
import ReviewList from "../../components/ReviewList";
import { Button } from "react-bootstrap";
import ReviewBlog from "../../components/ReviewBlog";

const BlogDetailPage = () => {
  const params = useParams();
  const dispatch = useDispatch();
  const blog = useSelector((state) => state.blog.selectedBlog);
  console.log("blog:", blog);
  const loading = useSelector((state) => state.blog.loading);
  const submitReviewLoading = useSelector(
    (state) => state.blog.submitReviewLoading
  );
  const [reviewText, setReviewText] = useState("");
  const currentUser = useSelector((state) => state.auth.user);
  console.log("currentUser:", currentUser);
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  const handleInputChange = (e) => {
    setReviewText(e.target.value);
  };

  const handleSubmitReview = (e) => {
    e.preventDefault();
    dispatch(blogActions.createReview(blog._id, reviewText));
    setReviewText("");
  };

  useEffect(() => {
    if (params?.id) {
      dispatch(blogActions.getSingleBlog(params.id));
    }
  }, [dispatch]);

  return (
    <>
      {loading ? (
        <ClipLoader color="#f86c6b" size={150} loading={loading} />
      ) : (
        <>
          {blog && (
            <div className="mb-5">
              <h1>{blog.title}</h1>

              {currentUser?._id === blog?.user?._id ? (
                <Link to={`/blog/edit/${blog._id}`}>
                  <Button variant="primary">Edit</Button>
                </Link>
              ) : (
                <span className="text-muted">
                  @{blog.author.name} wrote{" "}
                  <Moment fromNow>{blog.createdAt}</Moment>
                </span>
              )}
              <hr />
              <Markdown source={blog.content} />
              <hr />
              <ReviewList reviews={blog.reviews} />
            </div>
          )}

          {isAuthenticated && (
            <ReviewBlog
              reviewText={reviewText}
              handleInputChange={handleInputChange}
              handleSubmitReview={handleSubmitReview}
              loading={submitReviewLoading}
            />
          )}
        </>
      )}
    </>
  );
};

export default BlogDetailPage;
