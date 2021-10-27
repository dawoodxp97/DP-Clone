import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { useFetchData } from "../useFetch";

function Movies() {
  const {
    animatedMovies,
    topRatedMovies,
    actionMovies,
    comedyMovies,
    horrorMovies,
    romanceMovies,
    fetchDocumentaries,
  } = useFetchData();

  return (
    <Container>
      <div>
        {" "}
        <h4>Animated Movies</h4>
      </div>
      <Content>
        {animatedMovies &&
          animatedMovies.map((movie) => (
            <Wrap key={movie?.id}>
              {movie?.id}
              <Link to={`/detail/animatedMovies/${movie?.id}/movie`}>
                <img
                  src={movie?.poster}
                  alt={movie?.original_title}
                  loading="lazy"
                />
              </Link>
            </Wrap>
          ))}
      </Content>
      <div>
        {" "}
        <h4>Top Rated Movies</h4>
      </div>
      <Content>
        {topRatedMovies &&
          topRatedMovies.map((movie) => (
            <Wrap key={movie?.id}>
              {movie?.id}
              <Link to={`/detail/topRatedMovies/${movie?.id}/movie`}>
                <img
                  src={movie?.poster}
                  alt={movie.original_title}
                  loading="lazy"
                />
              </Link>
            </Wrap>
          ))}
      </Content>

      <div>
        {" "}
        <h4>Action Movies</h4>
      </div>
      <Content>
        {actionMovies &&
          actionMovies.map((movie) => (
            <Wrap key={movie?.id}>
              {movie?.id}
              <Link to={`/detail/actionMovies/${movie?.id}/movie`}>
                <img
                  src={movie?.poster}
                  alt={movie?.original_title}
                  loading="lazy"
                />
              </Link>
            </Wrap>
          ))}
      </Content>
      <div>
        {" "}
        <h4>Comedy Movies</h4>
      </div>
      <Content>
        {comedyMovies &&
          comedyMovies.map((movie) => (
            <Wrap key={movie?.id}>
              {movie?.id}
              <Link to={`/detail/comedyMovies/${movie?.id}/movie`}>
                <img
                  src={movie?.poster}
                  alt={movie?.original_title}
                  loading="lazy"
                />
              </Link>
            </Wrap>
          ))}
      </Content>
      <div>
        {" "}
        <h4>Horror Movies</h4>
      </div>
      <Content>
        {horrorMovies &&
          horrorMovies.map((movie) => (
            <Wrap key={movie?.id}>
              {movie?.id}
              <Link to={`/detail/horrorMovies/${movie?.id}/movie`}>
                <img
                  src={movie?.poster}
                  alt={movie?.original_title}
                  loading="lazy"
                />
              </Link>
            </Wrap>
          ))}
      </Content>
      <div>
        {" "}
        <h4>Romance Movies</h4>
      </div>
      <Content>
        {romanceMovies &&
          romanceMovies.map((movie) => (
            <Wrap key={movie?.id}>
              {movie?.id}
              <Link to={`/detail/romanceMovies/${movie?.id}/movie`}>
                <img
                  src={movie?.poster}
                  alt={movie?.original_title}
                  loading="lazy"
                />
              </Link>
            </Wrap>
          ))}
      </Content>
      <div>
        {" "}
        <h4>Documentaries</h4>
      </div>
      <Content>
        {fetchDocumentaries &&
          fetchDocumentaries.map((movie) => (
            <Wrap key={movie?.id}>
              {movie?.id}
              <Link to={`/detail/fetchDocumentaries/${movie?.id}/movie`}>
                <img
                  src={movie?.poster}
                  alt={movie?.original_title}
                  loading="lazy"
                />
              </Link>
            </Wrap>
          ))}
      </Content>
    </Container>
  );
}
const Container = styled.div`
  padding: 2vw;
  div {
    h4 {
      margin-top: 3vw;
    }
  }
`;

const Content = styled.div`
  display: grid;
  grid-gap: 25px;
  gap: 20px;
  grid-template-columns: repeat(8, minmax(0, 1fr));
  @media (max-width: 768px) {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
`;

const Wrap = styled.div`
  height: 200px;
  width: 150px;
  padding-top: 56.25%;
  border-radius: 10px;
  box-shadow: rgb(0 0 0 / 69%) 0px 26px 30px -10px,
    rgb(0 0 0 / 73%) 0px 16px 10px -10px;
  cursor: pointer;
  overflow: hidden;
  position: relative;
  transition: all 250ms cubic-bezier(0.25, 0.46, 0.45, 0.94) 0s;
  border: 3px solid rgba(249, 249, 249, 0.1);
  img {
    inset: 0px;
    display: block;
    height: 100%;
    object-fit: cover;
    opacity: 1;
    position: absolute;
    transition: opacity 500ms ease-in-out 0s;
    width: 100%;
    z-index: 1;
    top: 0;
  }
  &:hover {
    box-shadow: rgb(0 0 0 / 80%) 0px 40px 58px -16px,
      rgb(0 0 0 / 72%) 0px 30px 22px -10px;
    transform: scale(1.05);
    border-color: rgba(249, 249, 249, 0.8);
  }
`;
export default Movies;
