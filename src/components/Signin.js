import React, { useCallback, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import styled from "styled-components";
import { auth, provider } from "../firebase";
function Signin() {
  const History = useHistory();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const googleAuth = () => {
    auth
      .signInWithPopup(provider)
      .then((result) => {
        if (result) {
          History.push("/homepage");
        }
      })
      .catch((error) => {
        console.log(error.code);
        alert(error.message);
      });
  };
  const signIn = (e) => {
    e.preventDefault();
    auth
      .signInWithEmailAndPassword(email, password)
      .then((userCredential) => {
        //Signed In
        History.push("/homepage");
      })
      .catch((error) => {
        console.log(error.code);
        alert(error.message);
      });
  };
  return (
    <Container>
      <Content>
        <LogoImg src="/images/logo-dis.png" alt=""></LogoImg>
        <FormGrp>
          <MainHeading>Sign In</MainHeading>
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
          <Submit disabled={!(email && password)} onClick={signIn}>
            Submit
          </Submit>
          <FormP>
            Don't have account ?
            <Link
              style={{
                textDecoration: "none",
                color: "#ff9900",
                fontWeight: "bold",
              }}
              to="/register"
            >
              {" "}
              Sign-Up{" "}
            </Link>
          </FormP>
        </FormGrp>
        <GALogin>
          <GALoginOne onClick={googleAuth}>
            <GALoginOneImg src="/images/g_logo.png" alt="GLogo" />
          </GALoginOne>
        </GALogin>
      </Content>
    </Container>
  );
}

export default Signin;

const Container = styled.section`
  overflow: hidden;
  display: flex;
  flex-direction: column;
  height: 100vh;
`;

const Content = styled.div`
  height: 100%;
  display: flex;
  justify-content: space-around;
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
  height: 25rem;
  width: 25rem;
  border: 2px solid white;
  border-radius: 15px;
  display: flex;
  flex-direction: column;
  padding: 20px;
  filter: drop-shadow(3px 5px 2px rgb(0 0 0/0.4));
  @media (max-width: 600px) {
    height: 30rem;
    width: 20rem;
    margin-top: 20px;
    margin-bottom: 10px;
  }
`;
const Heading = styled.h4`
  letter-spacing: 1px;
`;
const MainHeading = styled.h1`
  letter-spacing: 1px;
  margin-left: 8rem;
  @media (max-width: 600px) {
    margin-left: 6rem;
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
  height: 80px;
  width: 140px;
  @media (max-width: 600px) {
    margin-top: 1rem;
  }
`;
const GALogin = styled.div`
  height: 18rem;
  width: 10rem;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  @media (max-width: 600px) {
    flex-direction: row;
  }
`;
const GALoginOne = styled.div`
  height: 50px;
  width: 50px;
`;

const GALoginOneImg = styled.img`
  height: 40px;
  width: 40px;
  border-radius: 15px;
  cursor: pointer;
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
