import React, { useRef, useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { useFetchData } from "../useFetch";
import { UilSearch } from "@iconscout/react-unicons";
import { debounce } from "lodash";

function Search() {
  const inputEl = useRef("");
  const {
    movies,
    series,
    netflixOriginals,
    topRatedMovies,
    topRatedSeries,
    disneyMovies,
    mcuMovies,
    mcuSeries,
    pixarMovies,
    natGeo,
    starwarsMovies,
  } = useFetchData();
  const totalData = [].concat(
    movies,
    series,
    netflixOriginals,
    topRatedMovies,
    topRatedSeries,
    disneyMovies,
    mcuMovies,
    mcuSeries,
    pixarMovies,
    natGeo,
    starwarsMovies
  );
  const [searchedItems, setSearchedItems] = useState([]);
  const [notFound, setNotFound] = useState(false);
  let data = [];
  data = totalData.filter(
    (elem, index, arr) => arr.findIndex((item) => item.id === elem.id) === index
  );
  const getSearch = debounce(() => {
    getSearchData(data, inputEl.current.value);
  }, 500);

  const getSearchData = function (data, title) {
    if (title !== "") {
      const searchObject = data.filter((item) =>
        item?.original_title.toLowerCase().includes(title.toLowerCase())
      );
      setSearchedItems(searchObject);
      if (searchObject.length === 0 && inputEl.current.value !== "") {
        setNotFound(true);
      } else {
        setNotFound(false);
      }
    } else {
      setSearchedItems([]);
      setNotFound(false);
    }
  };

  return (
    <Container>
      <SearchGroup>
        <SearchBtn>
          <UilSearch />
        </SearchBtn>
        <SearchInput
          ref={inputEl}
          type="text"
          placeholder="Search.."
          onChange={getSearch}
        />
      </SearchGroup>
      <Content>
        {searchedItems &&
          searchedItems?.map((movie) => (
            <Wrap key={movie?.id}>
              {movie?.id}
              <Link to={`/detail/${movie?.type}/${movie?.id}/tv`}>
                <img src={movie.poster} alt={movie.original_title} />
              </Link>
            </Wrap>
          ))}
        {notFound ? (
          <div
            style={{
              width: "90vw",
              padding: "5rem",
            }}
          >
            <p>{`No Movie/TV Show found with the "${inputEl.current.value}" keyword... Please Search a valid Keyword`}</p>
          </div>
        ) : (
          ""
        )}
      </Content>
    </Container>
  );
}
const Container = styled.div`
  padding: 2vw;
  padding-top: 4rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  @media (max-width: 768px) {
    padding: 5vw;
    padding-top: 4rem;
    padding-bottom: 10vw;
  }
`;
const SearchGroup = styled.div`
  width: fit-content;
  height: fit-content;
  position: relative;
`;
const SearchInput = styled.input`
  height: 50px;
  width: 400px;
  border-style: none;
  padding: 10px;
  font-size: 18px;
  letter-spacing: 2px;
  outline: none;
  border-radius: 25px;
  background-color: #010829;
  padding-right: 40px;
  color: #fff;
  ::placeholder,
  ::-webkit-input-placeholder {
    color: rgba(255, 255, 255, 0.5);
    font-size: 18px;
    letter-spacing: 2px;
    font-weight: 100;
  }
`;
const SearchBtn = styled.button`
  width: 50px;
  height: 50px;
  border-style: none;
  font-size: 20px;
  font-weight: bold;
  outline: none;
  cursor: pointer;
  border-radius: 50%;
  position: absolute;
  right: 0px;
  color: #ffffff;
  background-color: transparent;
`;

const Content = styled.div`
  margin-top: 1.5rem;
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

export default Search;
