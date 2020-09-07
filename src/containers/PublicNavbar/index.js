import React from "react";
import { Navbar, Nav } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { authActions } from "../../redux/actions/auth.actions";

const PublicNavbar = () => {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const loading = useSelector((state) => state.auth.loading);
  const dispatch = useDispatch();
  const handleLogout = () => {
    dispatch(authActions.logout());
    // TODO: handle Logout

    dispatch(authActions.logout());
  };


  const authLinks = (
    <Nav className="border-red">
      <Nav.Link
        as={Link}
        to="/dashboard"
        style={{ fontSize: "18px", fontFamily: "monospace", marginLeft: "8px" }}
      >
        <i className="fas fa-chart-line" /> Dashboard
      </Nav.Link>
      <Nav.Link
        onClick={handleLogout}
        style={{
          fontSize: "18px",
          fontFamily: "monospace",
          marginLeft: "8px",
          marginRight: "8px",
        }}
      >
        <i className="fas fa-sign-out-alt" /> Logout
      </Nav.Link>
    </Nav>
  );
  const publicLinks = (
    <Nav className="border-red">
      <Nav.Link
        as={Link}
        to="/register"
        style={{ fontSize: "18px", fontFamily: "monospace", marginLeft: "8px" }}
      >
        <i className="fas fa-registered" /> Register
      </Nav.Link>
      <Nav.Link
        as={Link}
        to="/login"
        style={{
          fontSize: "18px",
          fontFamily: "monospace",
          marginLeft: "8px",
          marginRight: "8px",
        }}
      >
        <i className="fas fa-sign-in-alt" /> Login
      </Nav.Link>
    </Nav>
  );

  return (
    <Navbar bg="light" expand="md" className="border-red navbar-menu">
      <Navbar.Brand as={Link} to="/" className="mr-auto">
        <img
          src="http://magnifikstudio.com/wp-content/uploads/2017/07/product-placeholder-uai-720x960.jpg"
          alt="CoderSchool"
          width="70px"
          height="90px"
          className="nav-logo"
        />
        <span
          style={{
            fontSize: "35px",
            fontFamily: "monospace",
            marginLeft: "8px",
          }}
        >
          Exclusive Blog
        </span>
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto"></Nav>
        {!loading && <>{isAuthenticated ? authLinks : publicLinks}</>}
      </Navbar.Collapse>
    </Navbar>
  );
};

export default PublicNavbar;
