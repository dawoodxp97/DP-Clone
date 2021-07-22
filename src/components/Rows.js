import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import axios from "./../Axios";
import requests, { img_url } from "./Requests";
function Rows() {
  const [movies, setMovies] = useState();
  const [series, setSeries] = useState();
  const trendingMovies = requests.fetchTrendingMovie;
  const trendingSeries = requests.fetchTrendingSeries;
  useEffect(() => {
    let isMounted = true;
    async function fetchMovies() {
      if (isMounted) {
        const request = await axios.get(trendingMovies);
        setMovies(request.data.results);
        return request;
      }
    }
    fetchMovies();
    window.scrollTo(0, 0);
    return function cleanup() {
      isMounted = false;
    };
  }, [trendingMovies]);
  useEffect(() => {
    let isMounted = true;
    async function fetchMovies() {
      if (isMounted) {
        const request = await axios.get(trendingSeries);
        setSeries(request.data.results);
        return request;
      }
    }
    fetchMovies();
    window.scrollTo(0, 0);
    return function cleanup() {
      isMounted = false;
    };
  }, [trendingSeries]);
  return (
    <Container>
      <h4>Trending Movies</h4>
      <Content>
        {movies &&
          movies.map((movie, key) => (
            <Wrap key={key}>
              {movie.id}
              <Link to={`/detail/${movie.id}/${movie.media_type}`}>
                <img
                  src={`${img_url}${movie.poster_path}`}
                  alt={movie.original_title}
                />
              </Link>
            </Wrap>
          ))}
      </Content>
      <h4>Trending Series</h4>
      <Content>
        {series &&
          series.map((series, key) => (
            <Wrap key={key}>
              {series.id}
              <Link to={`/detail/${series.id}/${series.media_type}`}>
                <img
                  src={`${img_url}${series.poster_path}`}
                  alt={series.original_title}
                />
              </Link>
            </Wrap>
          ))}
      </Content>
    </Container>
  );
}

const Container = styled.div`
  padding: 0 0 26px;
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

export default Rows;