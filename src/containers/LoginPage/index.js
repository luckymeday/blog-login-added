import React, { useState } from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import { Redirect, Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { authActions } from "../../redux/actions";
import FacebookLogin from "react-facebook-login";
import GoogleLogin from "react-google-login";

const LoginPage = () => {
  const [formData, setFormData] = useState({
    email: "minh@cs.vn",
    password: "123",
  });
  const [errors, setErrors] = useState({
    email: "",
    password: "",
  });
  const dispatch = useDispatch();
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const loading = useSelector((state) => state.auth.loading);

  const responseFacebook = (response) => {
    console.log(response);
    dispatch(authActions.loginWithFacebook(response.accessToken));
  };
  const responseGoogle = (response) => {
    console.log(response);
    dispatch(authActions.loginWithGoogle(response.accessToken));
  };

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    const { email, password } = formData;
    // if (password.length < 6) {
    //   setErrors({ ...errors, password: "Password must be longer than 6" });
    //   return;
    // }
    dispatch(authActions.loginRequest(email, password));
  };

  if (isAuthenticated) return <Redirect to="/" />;
  return (
    <Container>
      <Row>
        <Col md={{ span: 6, offset: 3 }}>
          <Form onSubmit={handleSubmit}>
            <div className="text-center mb-3">
              <h1 className="text-dark">Sign In</h1>
              <p className="lead">
                <i className="fas fa-user" /> Sign Into Your Account
              </p>
            </div>
            <Form.Group>
              <Form.Control
                type="email"
                required
                placeholder="Email Address"
                name="email"
                value={formData.email}
                onChange={handleChange}
              />
              {errors.email && (
                <small className="form-text text-danger">{errors.email}</small>
              )}
            </Form.Group>
            <Form.Group>
              <Form.Control
                type="password"
                placeholder="Password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                minLength="3"
              />
              {errors.password && (
                <small className="form-text text-danger">
                  {errors.password}
                </small>
              )}
            </Form.Group>

            {loading ? (
              <Button
                className="btn-block"
                variant="dark"
                type="button"
                disabled
              >
                <span
                  className="spinner-border spinner-border-sm"
                  role="status"
                  aria-hidden="true"
                ></span>
                Loading...
              </Button>
            ) : (
              <Button className="btn-block" type="submit" variant="dark">
                Login
              </Button>
            )}

            <p>
              Don't have an account? <Link to="/register">Sign Up</Link>
            </p>
          </Form>
          <FacebookLogin
            appId="628275794783875"
            autoLoad={false}
            fields="name,email,picture"
            callback={responseFacebook}
            className="facebook-button-class"
          />
            
          <GoogleLogin
            clientId="1006409012852-2juhji5qb0n7nc3u3le8kgemobdqqg3c.apps.googleusercontent.com"
            buttonText="Login"
            onSuccess={responseGoogle}
            onFailure={responseGoogle}
          />
        </Col>
      </Row>
    </Container>
  );
};

export default LoginPage;
