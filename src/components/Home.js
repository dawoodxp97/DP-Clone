import React from "react";
import styled from "styled-components";
import BrandsView from "./BrandsView";
import SliderImg from "./SliderImg";
import Rows from "./Rows";
function Home() {
  return (
    <Container>
      <SliderImg />
      <BrandsView />
      <Rows />
    </Container>
  );
}

export default Home;

const Container = styled.main`
  position: relative;
  min-height: calc(100vh - 250px);
  overflow-x: hidden;
  display: block;
  top: 72px;
  padding: 0 calc(3.5vw + 5px);
  &:after {
    content: "";
    position: absolute;
    inset: 0px;
    opacity: 1;
    z-index: -1;
  }
`;
