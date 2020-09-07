import React, { useEffect } from "react";
import { Container, CardColumns, Jumbotron, Button } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { blogActions } from "../../redux/actions";
import BlogCard from "../../components/BlogCard";
import ClipLoader from "react-spinners/ClipLoader";
import { useHistory, Link } from "react-router-dom";
import ListPagination from "../../components/ListPagination";

const HomePage = () => {
  const dispatch = useDispatch();
  const loading = useSelector((state) => state.blog.loading);
  const blogs = useSelector((state) => state.blog.blogs);
  console.log(blogs);
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  let history = useHistory();

  useEffect(() => {
    dispatch(blogActions.blogsRequest(1));
  }, [dispatch]);

  const handleClickOnBlog = (id) => {
    history.push(`/blogs/${id}`);
  };
  // console.log("1", blogs.blogs);
  let test = blogs.blogs;
  console.log("test", test);
  return (
    <>
      <Container>
        <Jumbotron className="text-center">
          <h1 style={{ fontSize: "55px", color: "white", fontFamily: "serif" }}>
            Exclusive Social Blog
          </h1>
          <p style={{ fontSize: "23px", color: "white", fontFamily: "serif" }}>
            Write about your amazing experiences.
          </p>
          {isAuthenticated && (
            <Link to="/blog/add">
              <Button
                variant="dark"
                style={{ fontSize: "17px", fontFamily: "monospace" }}
              >
                Share your story
              </Button>
            </Link>
          )}
        </Jumbotron>
        {loading ? (
          <ClipLoader color="#f86c6b" size={150} loading={loading} />
        ) : (
          <>
            {blogs.length ? (
              <CardColumns>
                {blogs.map((blog) => (
                  <BlogCard
                    blog={blog}
                    key={blog._id}
                    handleClick={handleClickOnBlog}
                  />
                ))}
              </CardColumns>
            ) : (
              <p>There are no blogs</p>
            )}
          </>
        )}
        <ListPagination />
      </Container>
    </>
  );
};

export default HomePage;
