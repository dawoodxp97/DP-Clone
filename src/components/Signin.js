import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import styled from "styled-components";
import { auth, provider } from "../firebase";
import ClipLoader from "react-spinners/ClipLoader";

function Signin() {
  const History = useHistory();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
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
    setIsLoading(true);
    auth
      .signInWithEmailAndPassword(email, password)
      .then((userCredential) => {
        //Signed In
        History.push("/homepage");
        setIsLoading(false);
      })
      .catch((error) => {
        console.log(error.code);
        alert(error.message);
        setIsLoading(false);
      });
  };
  return (
    <>
      {isLoading ? (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
            height: "90vh",
            width: "100%",
          }}
        >
          <ClipLoader color="white" loading={true} size={30} />
          <p>Loading</p>
        </div>
      ) : (
        <Container>
          <Content>
            <FormGrp>
              <LogoImg
                src="https://firebasestorage.googleapis.com/v0/b/dp-clone-3c2d8.appspot.com/o/images%2Fanimation_200_kwkktvf4.gif?alt=media&token=db6ce1b5-2d68-434a-bee2-754efbb67a6d"
                alt=""
              ></LogoImg>
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
              <GuestLogin
                onClick={() => {
                  setEmail("tester@test.in");
                  setPassword("tester@12345");
                  setIsLoading(true);
                  auth
                    .signInWithEmailAndPassword(
                      "tester@test.in",
                      "tester@12345"
                    )
                    .then((userCredential) => {
                      //Signed In
                      History.push("/homepage");
                      setIsLoading(false);
                    })
                    .catch((error) => {
                      console.log(error.code);
                      alert(error.message);
                      setIsLoading(false);
                    });
                }}
              >
                <span>Guest Login</span>
              </GuestLogin>
            </FormGrp>
            <GALogin>
              <GALoginOne onClick={googleAuth}>
                <GALoginOneImg src="/images/g_logo.png" alt="GLogo" />
              </GALoginOne>
            </GALogin>
          </Content>
        </Container>
      )}
    </>
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
  flex-direction: column;
  align-items: center;
  position: relative;
  @media (max-width: 600px) {
    flex-direction: column;
  }
`;

const GuestLogin = styled.div`
  height: 1.8rem;
  display: flex;
  flex-direction: row;
  justify-content: center;
  padding-top: 0.4rem;
  width: 6rem;
  border: 1px solid white;
  border-radius: 5px;
  font-weight: bold;
  font-size: small;
  color: white;
  filter: drop-shadow(3px 5px 2px rgb(0 0 0/0.4));
  cursor: pointer;
  &:hover {
    background: white;
    color: #010829;
  }
`;

const FormGrp = styled.div`
  height: 90vh;
  width: 25vw;
  border: 2px solid white;
  border-radius: 15px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 20px;
  margin-top: 3rem;
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
  margin-left: 6.5vw;
  height: 110px;
  width: 140px;
  @media (max-width: 600px) {
    margin-top: 1rem;
    margin-left: 30vw;
    height: 50px;
    width: 70px;
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
  cursor: pointer;
  position: absolute;
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
