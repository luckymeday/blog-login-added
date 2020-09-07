import React, { useState, useEffect } from "react";
import { Form, Button, Row, Col } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { blogActions } from "../redux/actions";
import { useSelector } from "react-redux";

const ReviewBlog = ({
  reviewText,
  handleInputChange,
  handleSubmitReview,
  loading,
}) => {
  let reactionsBlog = useSelector((state) => state.blog.reactions);
  const [reactions, setReactions] = useState(reactionsBlog);
  const idBlog = useSelector((state) => state.blog.selectedBlog._id);
  const dispatch = useDispatch();
  const updateReactionRequest = (reaction) => {
    const accessToken = localStorage.getItem("accessToken");
    if (accessToken && accessToken !== "undefined") {
      let targetType = "Blog";
      let target = idBlog;
      dispatch(
        blogActions.updateReactions(targetType, target, reaction, accessToken)
      );
      dispatch(blogActions.getSingleBlog(idBlog));
      setReactions(reactionsBlog);
    }
  };

  useEffect(() => {
    // effect
  }, [reactionsBlog]);
  return (
    <Form onSubmit={handleSubmitReview}>
      <Form.Group as={Row}>
        <Form.Label htmlFor="review" column sm="2">
          Reaction:
        </Form.Label>
        <Col sm="8">
          <Button variant="light" style={{ marginRight: "20px" }} onClick={() => updateReactionRequest("haha")}>
            Haha: {reactions.haha}
          </Button>
          <Button variant="light" style={{ marginRight: "20px" }} onClick={() => updateReactionRequest("sad")}>
            Sad: {reactions.sad}
          </Button>
          <Button variant="light" style={{ marginRight: "20px" }} onClick={() => updateReactionRequest("like")}>
            Like: {reactions.like}
          </Button>
          <Button variant="light" style={{ marginRight: "20px" }} onClick={() => updateReactionRequest("love")}>
            Love: {reactions.love}
          </Button>
          <Button variant="light" style={{ marginRight: "20px" }} onClick={() => updateReactionRequest("angry")}>
            Angry: {reactions.angry}
          </Button>
        </Col>
      </Form.Group>

      <Form.Group as={Row}>
        <Form.Label htmlFor="review" column sm="2">
          Review:
        </Form.Label>
        <Col sm="8">
          <Form.Control
            id="review"
            type="text"
            value={reviewText}
            onChange={handleInputChange}
          />
        </Col>
        {loading ? (
          <Button variant="dark" type="button" disabled>
            <span
              className="spinner-border spinner-border-sm"
              role="status"
              aria-hidden="true"
            ></span>
            Submitting...
          </Button>
        ) : (
            <Button type="submit" disabled={!reviewText}>
              Submit
            </Button>
          )}
      </Form.Group>
    </Form>
  );
};

export default ReviewBlog;
