import React, { useState, useEffect } from "react";
import { Container, Button } from "react-bootstrap";
import { useUser } from "../state/hooks/userContext";

//Local Impots

const Profile = (props) => {
  const {user, logout} = props;

  return (
    <Container className="Profile">
      <h3>{user?.attributes?.email}</h3>
      <Button onClick={logout}>Sign Out</Button>
    </Container>
  );
};

export default Profile;
