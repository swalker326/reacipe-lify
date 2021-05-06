import React from "react";
import { Button, Container } from "react-bootstrap";
import { useAuthState } from "../Components/Context/authContext";
import { signOut } from "../Components/Context/authServices";

const Profile = () => {
  const { userEmail } = useAuthState();

  return (
    <Container className="Profile">
      <h4>{userEmail}</h4>
      <Button onClick={signOut}>Sign Out</Button>
    </Container>
  );
};

export default Profile;
