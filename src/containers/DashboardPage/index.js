import React, { useEffect, useState } from "react";
import PublicNavBar from "../PublicNavbar";
import { blogActions } from "../../redux/actions";
import {
  Row,
  Image,
  Card,
  Button,
  Container,
  ListGroup,
  ListGroupItem,
  InputGroup,
  FormControl,
} from "react-bootstrap";
import BlogCard from "../../components/BlogCard";
import ClipLoader from "react-spinners/ClipLoader";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";

import NameEditModal from "../../components/NameEditModal";
import UpdateAvatarModal from "../../components/UpdateAvatarModal";
import ListPagination from "../../components/ListPagination";

// const PAGE_LIMIT = 5;
const DashboardPage = () => {
  const dispatch = useDispatch();
  let history = useHistory();
  const blogs = useSelector((state) => state.blog.selfBlogs);
  const loading = useSelector((state) => state.blog.loading);

  const [showModalName, setShowModalName] = useState(false);
  const [showModalAvatar, setShowModalAvatar] = useState(false);
  const user = useSelector((state) => state.auth.user);

  // const handleEditProfile = () => {
  //   alert("edit profile");
  //   return;
  // };

  const handleOnClickName = () => {
    setShowModalName(true);
  };
  const handleOnClickImage = () => {
    console.log("handleOnClickImage");
    setShowModalAvatar(true);
  };

  const handleClickOnBlog = (id) => {
    history.push(`/blogs/${id}`);
  };
  const [totalPageNum, setTotalPageNum] = useState(1);
  const [pageNum, setPageNum] = useState(1);
  //pag

  // useEffect(() => {
  //   dispatch(blogActions.blogsRequest());
  //   // setTotalPageNum(6);
  // }, [dispatch]);

  useEffect(() => {
    dispatch(blogActions.getSelfBlog());
  }, [pageNum]);
  //pab

  return (
    <>
      <NameEditModal
        showModal={showModalName}
        setShowModal={setShowModalName}
      />
      <UpdateAvatarModal
        showModal={showModalAvatar}
        setShowModal={setShowModalAvatar}
        // img={user.avatar.url}
      />
      <PublicNavBar />

      <Row
        className="body text-center justify-content-center dashboard"
        style={{ marginTop: "15px" }}
      >
        <div className="col-2 border-red profile">
          <h2>My Profile</h2>
          <Card style={{ width: "100%", marginTop: "15%" }}>
            {/* <Image
              src={user.avatar.url}
              onClick={() => handleOnClickImage()}
              roundedCircle
              alt=""
              style={{
                height: "90px", width: "90px", marginTop: "10px"
              }}
            /> */}
            <Card.Body className="text-center">
              <Card.Title onClick={() => handleOnClickName()}>
                {user.name}
              </Card.Title>
              <Card.Text>
                <p style={{ fontSize: "15px" }}>currenlty in Saigon, Vietnam</p>
                <p style={{ fontSize: "12px" }}>
                  Traveler, Writer, Musician, Singer and Dreamer{" "}
                </p>
              </Card.Text>

              {/* <Button variant="dark" onClick={() => handleEditProfile()}>
                Edit
              </Button> */}
            </Card.Body>
          </Card>
        </div>
        <div className="col-6 border-red">
          <h2>My Blogs</h2>
          <Container style={{ marginTop: "15%" }}>
         
            <ListPagination />
            {loading ? (
              <ClipLoader color="#f86c6b" size={150} loading={loading} />
            ) : (
              <>
                {blogs.length ? (
                  <Card>
                    {blogs.map((blog) => (
                      <BlogCard
                        blog={blog}
                        key={blog._id}
                        handleClick={handleClickOnBlog}
                      />
                    ))}
                  </Card>
                ) : (
                  <p>There are no blogs</p>
                )}
              </>
            )}
          </Container>
        </div>
        <div className="col-2 border-red">
          <h2>Friends List</h2>

          <InputGroup style={{ width: "100%", marginTop: "15%" }}>
            <InputGroup.Prepend>
              <InputGroup.Text id="basic-addon1">@</InputGroup.Text>
            </InputGroup.Prepend>
            <FormControl
              style={{ marginLeft: "-10px" }}
              placeholder="Search friends"
              aria-label="Username"
              aria-describedby="basic-addon1"
            />
            <Button variant="dark" href="#">
              Add
            </Button>
          </InputGroup>
          <Card style={{ width: "100%" }}>
            <Card.Body>
              <Card.Title style={{ marginBottom: "-15px", marginTop: "-10px" }}>
                Pending Request
              </Card.Title>
            </Card.Body>
            <ListGroup className="list-group-flush">
              <ListGroupItem>
                <img src="" alt=" " />
                waiting to be accepted{" "}
                <Button variant="dark" style={{ fontSize: "13px" }}>
                  Confirm
                </Button>
              </ListGroupItem>
              <ListGroupItem>
                <img src="" alt=" " />
                waiting to be accepted{" "}
                <Button variant="dark" style={{ fontSize: "13px" }}>
                  Confirm
                </Button>
              </ListGroupItem>
            </ListGroup>

            <Card.Body>
              <Card.Title style={{ marginBottom: "-10px", paddingTop: "30px" }}>
                My Friends List
              </Card.Title>
            </Card.Body>
            <ListGroup className="list-group-flush">
              <ListGroupItem>
                <img src="" alt=" " />
                friend 1{" "}
              </ListGroupItem>
              <ListGroupItem>
                <img src="" alt=" " />
                friend 2{" "}
              </ListGroupItem>
              <ListGroupItem>
                <img src="" alt=" " />
                friend 3{" "}
              </ListGroupItem>
            </ListGroup>
            <Card.Body>
              <Card.Link href="#">Load More</Card.Link>
            </Card.Body>
          </Card>
        </div>
      </Row>
    </>
  );
};

export default DashboardPage;
