import React, { useState, useEffect } from "react";
import { Button, Container, Form, Image } from "react-bootstrap";
import { checkAuth, signOut } from "../Context/authServices";
import { useAuthState } from "../Context/authContext";
import { useAuthDispatch } from "../Context/authContext";
import Loading from "react-fullscreen-loading";
import { Redirect } from "react-router";
import { updateUser } from "../Context/authServices";

const Profile = () => {
  const [formData, setFormData] = useState(null);
  const [user, setUser] = useState(false);
  const [loggedOut, setLoggedOut] = useState(false);
  
  const { userEmail} = useAuthState();
  const [signinLoading, setSigninLoading] = useState(false);
  const dispatch = useAuthDispatch();

  useEffect(() => {
    checkAuth().then(user => {
      if (user) setUser(user);
    }).catch(() => {
      setLoggedOut(true);
    })
  }, [userEmail])

  if (loggedOut) return <Redirect to='/login' />

  const signOutUser = async () => {
    setSigninLoading(true);
    signOut()
      .then(() => {
        dispatch({
          type: "SIGN_OUT",
        });
      })
      .finally(() => {
        setSigninLoading(false);
      });
  };
  const updateCurrentUser = async () => {
    updateUser(formData).then((r) => {
      console.log("r : ", r); //eslint disable line
    });
  };
  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };
  return (
    <Container className="Profile">
      <Loading
        loading={signinLoading}
        background="rgba(179, 179, 179, 0.5)"
        loaderColor="#313131"
      />
      <h4>{user?.attributes?.email}</h4>
      <Form>
        <Image src={user?.attributes?.picture} rounded fluid />
        <Form.Control
          className="mt-3 mb-3"
          name="picture"
          onChange={(e) => handleInputChange(e)}
          type="email"
          placeholder="picture"
        />
      </Form>
      <Button onClick={signOutUser}>Sign Out</Button>
      <Button onClick={updateCurrentUser}>Update User</Button>
    </Container>
  );
};

export default Profile;
