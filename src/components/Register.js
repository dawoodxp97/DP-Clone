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
          console.log("This is User Credential>>>", userCredential);
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
        <LogoImg
          src="https://www.fanthatracks.com/wp-content/uploads/2020/08/disneyplus_template_7.jpg"
          alt=""
        ></LogoImg>
        <FormGrp>
          <MainHeading>Sign Up</MainHeading>
          <Heading>Username</Heading>
          <Input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <Heading>Email</Heading>
          <Input
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <Heading>Password</Heading>
          <Input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Submit onClick={signUp}>Submit</Submit>
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
  height: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  @media (max-width: 600px) {
    flex-direction: column;
  }
  background: linear-gradient(270deg, #020024, #090979, #020265);
  background-size: 600% 600%;

  -webkit-animation: AnimationName 6s ease infinite;
  -moz-animation: AnimationName 6s ease infinite;
  animation: AnimationName 6s ease infinite;

  @-webkit-keyframes AnimationName {
    0% {
      background-position: 0% 51%;
    }
    50% {
      background-position: 100% 50%;
    }
    100% {
      background-position: 0% 51%;
    }
  }
  @-moz-keyframes AnimationName {
    0% {
      background-position: 0% 51%;
    }
    50% {
      background-position: 100% 50%;
    }
    100% {
      background-position: 0% 51%;
    }
  }
  @keyframes AnimationName {
    0% {
      background-position: 0% 51%;
    }
    50% {
      background-position: 100% 50%;
    }
    100% {
      background-position: 0% 51%;
    }
  }
`;

const FormGrp = styled.div`
  margin-right: 20px;
  height: 30rem;
  width: 25rem;
  border: 2px solid white;
  border-radius: 15px;
  display: flex;
  flex-direction: column;
  padding: 20px;
  filter: drop-shadow(3px 5px 2px rgb(0 0 0/0.4));
  @media (max-width: 600px) {
    height: 80%;
    width: 90%;
    margin-bottom: 20px;
    margin-left: 20px;
  }
  @media (min-width: 320px) and (max-width: 400px) {
    height: 70%;
    width: 90%;
    margin-left: 20px;
  }
`;
const Heading = styled.h4`
  letter-spacing: 1px;
`;
const MainHeading = styled.h1`
  letter-spacing: 1px;
  margin-left: 8rem;

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
const LogoImg = styled.img`
  height: 100%;
  width: 67%;
  mask-image: linear-gradient(to right, rgba(0, 0, 0, 1), rgba(0, 0, 0, 0));
  @media (max-width: 600px) {
    height: 13rem;
    width: 100%;
    mask-image: linear-gradient(to bottom, rgba(0, 0, 0, 1), rgba(0, 0, 0, 0));
  }
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
`;
const FormP = styled.p`
  letter-spacing: 1px;
`;
