import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import ClipLoader from "react-spinners/ClipLoader";
import { db } from "../firebase";

function ViewContent({ collectionType, title }) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [data, setData] = useState([]);

  useEffect(() => {
    db.collection(collectionType).onSnapshot((snapshot) => {
      setData(snapshot.docs.map((doc) => doc.data()));
    });
    window.scrollTo(0, 0);
    return () => {
      //Cleanup
    };
  }, [collectionType]);
  return (
    <Container>
      {data.length === 0 ? (
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
        <>
          <div>
            {" "}
            <h4>{title}</h4>
          </div>
          <Content>
            {data?.map((movie) => (
              <Wrap
                style={{ visibility: isLoaded ? "visible" : "hidden" }}
                key={movie?.id}
              >
                <Link
                  to={`/detail/${collectionType}/${movie.id}/${movie.media_type}`}
                >
                  <img
                    loading="lazy"
                    src={movie.poster}
                    alt={movie.original_title}
                    onLoad={() => {
                      setIsLoaded(true);
                    }}
                  />
                </Link>
              </Wrap>
            ))}
          </Content>
        </>
      )}
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
  @media (max-width: 768px) {
    padding: 5vw;
    padding-bottom: 10vw;
  }
`;

const Content = styled.div`
  display: flex;
  flex-wrap: wrap;
  flex-direction: row;
  justify-content: space-evenly;
  width: 100%;
`;

const Wrap = styled.div`
  height: 13rem;
  width: 9rem;
  margin-top: 2rem;
  margin-left: 0.8rem;
  margin-right: 0.8rem;
  border-radius: 10px;
  box-shadow: rgb(0 0 0 / 69%) 0px 26px 30px -10px,
    rgb(0 0 0 / 73%) 0px 16px 10px -10px;
  cursor: pointer;
  overflow: hidden;
  border: 3px solid rgba(249, 249, 249, 0.1);
  transition: all 250ms cubic-bezier(0.25, 0.46, 0.45, 0.94) 0s;
  img {
    inset: 0px;
    display: block;
    height: 100%;
    object-fit: cover;
    opacity: 1;
    position: relative;
    transition: opacity 500ms ease-in-out 0s;
    width: 100%;
    z-index: 1;
  }
  &:hover {
    box-shadow: rgb(0 0 0 / 80%) 0px 40px 58px -16px,
      rgb(0 0 0 / 72%) 0px 30px 22px -10px;
    transform: scale(1.05);
    border-color: rgba(249, 249, 249, 0.8);
  }
`;

export default React.memo(ViewContent);
