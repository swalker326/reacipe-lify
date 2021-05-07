import React, { useState } from "react";
import { Button, Container } from "react-bootstrap";
import { signOut } from "../Context/authServices";
import { useAuthState } from "../Context/authContext";
import { useAuthDispatch } from "../Context/authContext";
import Loading from "react-fullscreen-loading";
import { Redirect } from "react-router";

const Profile = () => {
  const { userEmail } = useAuthState();
  const [signinLoading, setSigninLoading] = useState(false);
  const dispatch = useAuthDispatch();

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
  if(!userEmail) return <Redirect to="/login" />
  return (
    <Container className="Profile">
      <Loading
        loading={signinLoading}
        background="rgba(179, 179, 179, 0.5)"
        loaderColor="#313131"
      />
      <h4>{userEmail}</h4>
      <Button onClick={signOutUser}>Sign Out</Button>
    </Container>
  );
};

export default Profile;
