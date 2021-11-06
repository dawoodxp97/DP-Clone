import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import styled from "styled-components";
import { auth } from "../firebase";

function Register() {
  const History = useHistory();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");

  const signUp = (e) => {
    e.preventDefault();
    auth
      .createUserWithEmailAndPassword(email, password)
      .then((userCredential) => {
        // User Created
        if (userCredential) {
          alert("Successfully Created your CTR account. Enjoy your CTR App");
          History.push("/homepage");
        }
      })
      .then(() => {
        const currUser = auth.currentUser;
        currUser.updateProfile({
          displayName: name,
        });
      })
      .catch((error) => {
        console.log(error.code);
        alert(error.message);
      });
  };
  return (
    <Container>
      <Content>
        <FormGrp>
          <LogoImage src="/images/logo-dis.png" alt=""></LogoImage>
          <MainHeading>Sign Up</MainHeading>
          <Heading>Username</Heading>
          <Input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value.trimStart())}
          />
          <Heading>Email</Heading>
          <Input
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value.trimStart())}
          />
          <Heading>Password</Heading>
          <Input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value.trimStart())}
          />
          <Submit disabled={!(name && email && password)} onClick={signUp}>
            Submit
          </Submit>
          <FormP>
            Already have account ?
            <Link
              style={{
                textDecoration: "none",
                color: "#ff9900",
                fontWeight: "bold",
              }}
              to="/signin"
            >
              {" "}
              Sign-In{" "}
            </Link>
          </FormP>
        </FormGrp>
      </Content>
    </Container>
  );
}

export default Register;

const Container = styled.section`
  overflow: hidden;
  display: flex;
  flex-direction: column;
  height: 100vh;
`;
const Content = styled.div`
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;

  &::before {
    content: "";
    position: absolute;
    top: 0px;
    right: 0px;
    bottom: 0px;
    left: 0px;
    background-image: url("https://i.ibb.co/gtm7742/login-background.jpg");
    background-size: cover;
    background-position: top center;
    opacity: 0.35;
  }

  @media (max-width: 600px) {
    flex-direction: column;
  }
`;

const FormGrp = styled.div`
  margin-right: 20px;
  height: 32rem;
  width: 25rem;
  border: 2px solid white;
  border-radius: 15px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 20px;
  filter: drop-shadow(3px 5px 2px rgb(0 0 0/0.4));
  @media (max-width: 600px) {
    height: 80%;
    width: 90%;
    margin-top: 5rem;
    margin-bottom: 20px;
    margin-left: 20px;
  }
  @media (min-width: 320px) and (max-width: 400px) {
    height: 70%;
    width: 90%;
    margin-left: 20px;
  }
`;
const LogoImage = styled.img`
  height: 80px;
  width: 80px;
  margin-left: 7.5rem;
  @media (max-width: 600px) {
    margin-top: 1rem;
    margin-left: 5rem;
  }
`;
const Heading = styled.h4`
  letter-spacing: 1px;
`;
const MainHeading = styled.h1`
  letter-spacing: 1px;
  margin-left: 7rem;

  @media (max-width: 600px) {
    margin-left: 35%;
  }

  @media (min-width: 320px) and (max-width: 400px) {
    margin-left: 5rem;
  }
`;
const Input = styled.input`
  height: 35px;
  outline: none;
  border: none;
  border-radius: 10px;
  background-color: #f9f9f9;
  font-weight: bold;
  letter-spacing: 1px;
`;

const Submit = styled.button`
  margin-top: 25px;
  height: 35px;
  width: 90px;
  border: 1px solid white;
  border-radius: 5px;
  font-weight: bold;
  color: #130856;
  filter: drop-shadow(3px 5px 2px rgb(0 0 0/0.4));
  cursor: pointer;
  &:hover {
    background: none;
    color: #f9f9f9;
  }
  &:disabled {
    cursor: not-allowed;
    pointer-events: all !important;
  }
`;
const FormP = styled.p`
  letter-spacing: 1px;
`;
