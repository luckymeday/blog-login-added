import React from "react";
import { Card, Badge } from "react-bootstrap";
import Moment from "react-moment";
import { useSelector } from "react-redux";

const BlogCard = ({ blog, handleClick }) => {
  const reactions = useSelector((state) => state.blog.reactions);
  return (
    <Card onClick={() => handleClick(blog._id)}>
      <Card.Img variant="top" src="https://via.placeholder.com/160x100" />
      <Card.Body>
        <Card.Title style={{ fontSize: "25px", fontFamily: "sans-serif" }}>
          {blog.title}
        </Card.Title>
        <Card.Text style={{ fontFamily: "serif" }}>
          {blog.content.length <= 99
            ? blog.content
            : blog.content.slice(0, 99) + "..."}
          <div className="reaction-style">
            <br></br>
            <Badge
              variant="dark"
              style={{ marginRight: "7px", fontFamily: "sans-serif" }}
            >
              Haha: {blog.reactions.haha}
            </Badge>
            <Badge
              variant="dark"
              style={{ marginRight: "7px", fontFamily: "sans-serif" }}
            >
              Sad: {blog.reactions.sad}
            </Badge>
            <Badge
              variant="dark"
              style={{ marginRight: "7px", fontFamily: "sans-serif" }}
            >
              Like: {blog.reactions.like}
            </Badge>
            <Badge
              variant="dark"
              style={{ marginRight: "7px", fontFamily: "sans-serif" }}
            >
              Love: {blog.reactions.love}
            </Badge>
            <Badge
              variant="dark"
              style={{ marginRight: "7px", fontFamily: "sans-serif" }}
            >
              Angry: {blog.reactions.angry}{" "}
            </Badge>
          </div>
        </Card.Text>
      </Card.Body>
      <Card.Footer style={{ fontFamily: "serif", backgroundColor: "white" }}>
        <small className="text-muted">
          <span>
            @{blog?.author?.name} wrote{" "}
            <Moment fromNow>{blog.createdAt}</Moment>
          </span>
        </small>
      </Card.Footer>
    </Card>
  );
};

export default BlogCard;
