import React from "react";
import styled from "styled-components";

function Footer() {
  return (
    <Container>
      <p>
        © 2021 DP-Clone™. All related content, channels and programming logos
        are service marks of, and all related programming visuals and elements
        are the property of DP-Clone™. All rights reserved.{" "}
      </p>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #bebebe;
  margin-top: 2vw;
  bottom: 0;
  height: 4vw;
  position: relative;
  width: 100%;
  border-top-left-radius: 60px;
  border-top-right-radius: 60px;
  p {
    margin: 30px;
    color: #010829;
  }
  @media (max-width: 768px) {
    display: none;
  }
`;

export default Footer;
