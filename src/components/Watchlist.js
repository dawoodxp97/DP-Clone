import React, { useEffect, useState } from "react";
import styled from "styled-components";
import RemoveIcon from "@material-ui/icons/Remove";
import PlayArrowIcon from "@material-ui/icons/PlayArrow";
import { db } from "../firebase";
import { useStateValue } from "../StateProvider";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { EditText } from "react-edit-text";
import "react-edit-text/dist/index.css";

toast.configure();

function Watchlist() {
  const [{ user }] = useStateValue();
  const [data, setData] = useState([]);
  // eslint-disable-next-line no-unused-vars
  const [title, setTitle] = useState("");

  useEffect(() => {
    let isMounted = true;
    async function fetchWatchlist() {
      if (isMounted) {
        if (user) {
          db.collection("users")
            .doc(user?.uid)
            .collection("watchlist")
            .onSnapshot((snapshot) => {
              setData(
                snapshot.docs.map((doc) => ({
                  id: doc.id,
                  data: doc.data(),
                }))
              );
            });
        } else {
          setData([]);
        }
      }
    }
    fetchWatchlist();
    return () => {
      isMounted = false;
    };
  }, [user]);

  const notify = () => {
    toast.info(" Removed from watchlist... ", { autoClose: 1500 });
  };

  return (
    <Container>
      <div>
        <h4>Watchlist</h4>
      </div>
      <Content>
        {data &&
          data?.map((movie) => (
            <Wrap key={movie?.id}>
              <Img>
                <img src={movie?.data.poster_path} alt="" loading="lazy" />
              </Img>
              <Desc>
                <div>
                  <EditText
                    name="textbox"
                    style={{
                      width: "auto",
                      fontSize: "16px",
                      borderRadius: "0.5rem",
                      color: "#FFF",
                      backgroundColor: "#010829",
                    }}
                    defaultValue={movie?.data.title}
                    onChange={setTitle}
                    onSave={({ value }) => {
                      db.collection("users")
                        .doc(user?.uid)
                        .collection("watchlist")
                        .doc(movie?.id)
                        .update({
                          title: value,
                        });
                    }}
                  />
                </div>
                <p>{movie?.data.overview}</p>
              </Desc>
              <MovieAction>
                <div
                  onClick={() => {
                    db.collection("users")
                      .doc(user?.uid)
                      .collection("watchlist")
                      .doc(movie?.id)
                      .delete();
                    notify();
                  }}
                >
                  <RemoveIcon />
                </div>
                <Link
                  to={`/detail/${movie?.data.collectionType}/${movie?.id}/${movie?.data.media_type}`}
                >
                  <div>
                    <PlayArrowIcon />
                  </div>
                </Link>
              </MovieAction>
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
      margin-top: 4rem;
    }
  }
  @media (max-width: 768px) {
    padding: 5vw;
    padding-bottom: 10vw;
  }
`;

const Wrap = styled.div`
  height: 14rem;
  width: 100%;
  padding: 1.5rem;
  margin-bottom: 1rem;
  display: flex;
  transition: all 250ms cubic-bezier(0.25, 0.46, 0.45, 0.94) 0s;
  border-radius: 2rem;
  &:hover {
    border: 2px solid white;
    transform: scale(1.02);
  }
`;
const Img = styled.div`
  height: 100%;
  flex: 0.15;
  img {
    border-radius: 1rem;
    width: 100%;
    height: 100%;
  }
  @media (max-width: 768px) {
    height: 100%;
    width: 10rem;
  }
`;
const Desc = styled.div`
  padding-left: 1rem;
  letter-spacing: 1px;
  flex: 0.75;
  div {
    display: flex;
    justify-content: space-around;
    align-items: center;
  }
  @media (max-width: 768px) {
    display: none;
  }
`;
const MovieAction = styled.div`
  flex: 0.2;
  padding: 3rem;
  display: flex;
  div {
    margin: 1rem;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 3rem;
    width: 3rem;
    background-color: #04aed3;
    border-radius: 50%;
    cursor: pointer;
    &:hover {
      border: 2px solid white;
    }
  }
  @media (max-width: 768px) {
    height: 100%;
    width: -10rem;
  }
`;

const Content = styled.div``;
export default Watchlist;
