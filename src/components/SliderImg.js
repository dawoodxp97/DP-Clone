import React from "react";
import styled from "styled-components";
import Slider from "react-slick";
import { Link } from "react-router-dom";
function SliderImg() {
  let settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
  };
  return (
    <Carousel {...settings}>
      <Link to="/detail/disneyMovies/508943/movie">
        <Wrap>
          <ChildGrp>
            <WrapOne>
              <HeadingOne>Luca</HeadingOne>
              <ParaOne>English . Family . 2021</ParaOne>
              <ParaTwo>
                The movie is a coming-of-age story about one young boy
                experiencing an unforgettable summer filled with gelato, pasta
                and endless scooter rides.
              </ParaTwo>
            </WrapOne>
            <ImageGradient></ImageGradient>
            <WrapTwoDiv>
              <WrapTwo
                src="https://img1.hotstarext.com/image/upload/f_auto,t_web_m_1x/sources/r1/cms/prod/468/1020468-h-54bb249f203c"
                alt=""
              />
            </WrapTwoDiv>
          </ChildGrp>
        </Wrap>
      </Link>
      <Link to="/detail/mcuSeries/85271/tv">
        <Wrap>
          <ChildGrp>
            <WrapOne>
              <HeadingOne>WandaVision</HeadingOne>
              <ParaOne>Marvel . English . Superhero</ParaOne>
              <ParaTwo>
                Wanda Maximoff and Vision—two super-powered beings living
                idealized suburban lives—begin to suspect that everything is not
                as it seems.
              </ParaTwo>
            </WrapOne>
            <ImageGradient></ImageGradient>
            <WrapTwoDiv>
              <WrapTwo
                src="https://img1.hotstarext.com/image/upload/f_auto,t_web_m_1x/sources/r1/cms/prod/1819/911819-h"
                alt=""
              />
            </WrapTwoDiv>
          </ChildGrp>
        </Wrap>
      </Link>
      <Link to="/detail/mcuSeries/84958/tv">
        <Wrap>
          <ChildGrp>
            <WrapOne>
              <HeadingOne>Loki</HeadingOne>
              <ParaOne>Marvel . Superhero</ParaOne>
              <ParaTwo>
                The mercurial villain Loki resumes his role as the God of
                Mischief in a new series that takes place after the events of
                “Avengers: Endgame.”
              </ParaTwo>
            </WrapOne>
            <ImageGradient></ImageGradient>
            <WrapTwoDiv>
              <WrapTwo
                src="https://img1.hotstarext.com/image/upload/f_auto,t_web_m_1x/sources/r1/cms/prod/1681/1011681-h-ac6ee255f074"
                alt=""
              />
            </WrapTwoDiv>
          </ChildGrp>
        </Wrap>
      </Link>
      <Link to="/detail/disneyMovies/527774/movie">
        <Wrap>
          <ChildGrp>
            <WrapOne>
              <HeadingOne>Raya and the Last Dragon</HeadingOne>
              <ParaOne>English . Family . 2021</ParaOne>
              <ParaTwo>
                Raya, a fallen princess, must track down the legendary last
                dragon to stop the evil forces that have returned and threaten
                her world.
              </ParaTwo>
            </WrapOne>
            <ImageGradient></ImageGradient>
            <WrapTwoDiv>
              <WrapTwo
                src="https://img1.hotstarext.com/image/upload/f_auto,t_web_m_1x/sources/r1/cms/prod/1911/1001911-h"
                alt=""
              />
            </WrapTwoDiv>
          </ChildGrp>
        </Wrap>
      </Link>
      <Link to="/detail/mcuSeries/88396/tv">
        <Wrap>
          <ChildGrp>
            <WrapOne>
              <HeadingOne>The Falcon and The Winter Soldier</HeadingOne>
              <ParaOne>Marvel . Superhero</ParaOne>
              <ParaTwo>
                Following the events of “Avengers: Endgame,” Sam Wilson and
                Bucky Barnes team up in a global adventure that tests their
                abilities and their patience.
              </ParaTwo>
            </WrapOne>
            <ImageGradient></ImageGradient>
            <WrapTwoDiv>
              <WrapTwo
                src="https://img1.hotstarext.com/image/upload/f_auto,t_web_m_1x/sources/r1/cms/prod/6362/936362-h"
                alt=""
              />
            </WrapTwoDiv>
          </ChildGrp>
        </Wrap>
      </Link>
    </Carousel>
  );
}
const Carousel = styled(Slider)`
  margin-top: 20px;
  & > button {
    opacity: 0;
    height: 100%;
    width: 5vw;
    z-index: 1;
    &:hover {
      opacity: 1;
      transition: opacity 0.2s ease 0s;
    }
  }
  ul li button {
    &:before {
      font-size: 10px;
      color: rgb(150, 158, 171);
    }
  }
  li.slick-active button:before {
    color: white;
  }
  .slick-list {
    overflow: initial;
  }
  .slick-prev {
    left: -75px;
  }
  .slick-next {
    right: -75px;
  }
`;

const Wrap = styled.div`
  height: 25rem;
  padding: 10px;
  border-radius: 4px;
  cursor: pointer;
  position: relative;

  &:hover {
    padding: 0;
    border: 4px solid rgba(249, 249, 249, 0.8);
    transition-duration: 300ms;
  }
  @media (max-width: 768px) {
    height: 15rem;
  }
`;
const ChildGrp = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 100%;
  height: 100%;
`;
const WrapOne = styled.div`
  padding-left: 15px;
  flex: 0.3;
  @media (max-width: 768px) {
    display: none;
  }
`;
const WrapTwoDiv = styled.div`
  flex: 0.6;
  height: 100%;
`;
const WrapTwo = styled.img`
  border-radius: 15px;
  width: 100%;
  height: 100%;
  @media (min-width: 768px) {
    mask-image: linear-gradient(to left, #030b17, rgba(0, 0, 0, 0));
  }

  @media (max-width: 768px) {
    height: 100%;
    width: 87vw;
  }
`;
const ImageGradient = styled.div`
  display: block;
  top: 0;
  right: 561px;
  width: 185px;
  height: inherit;
  content: "";
  position: absolute;
  -webkit-transition: background 0.3s ease-in;
  -o-transition: background 0.3s ease-in;
  transition: background 0.3s ease-in;
  background: linear-gradient(to right, #010829, rgba(0, 0, 0, 0));
  @media (max-width: 768px) {
    display: none;
  }
  @media (max-width: 1360px) {
    display: none;
  }
  @media (min-width: 1370px) {
    display: none;
  }
`;
const HeadingOne = styled.h1`
  color: #fefefe;
  @media (max-width: 768px) {
    display: none;
  }
`;
const ParaOne = styled.p`
  letter-spacing: 1px;
  font-weight: bold;
  color: #96999e;
  @media (max-width: 768px) {
    display: none;
  }
`;
const ParaTwo = styled.p`
  letter-spacing: 1px;
  line-height: 25px;
  font-weight: 400;
  color: #b7b9bd;
  @media (max-width: 768px) {
    display: none;
  }
`;
export default React.memo(SliderImg);
