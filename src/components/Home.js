import React, { lazy } from "react";
import styled from "styled-components";
const BrandsView = lazy(() => import("./BrandsView"));
const SliderImg = lazy(() => import("./SliderImg"));

function Home() {
  return (
    <Container>
      <SliderImg />
      <BrandsView />
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
