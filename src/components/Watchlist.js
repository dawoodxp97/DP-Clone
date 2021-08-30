import React, { useEffect, useState } from "react";
import styled from "styled-components";
import RemoveIcon from "@material-ui/icons/Remove";
import PlayArrowIcon from "@material-ui/icons/PlayArrow";
import EditIcon from "@material-ui/icons/Edit";
import { db } from "../firebase";
import { useStateValue } from "../StateProvider";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Modal from "react-modal";
import "./Modal.css";

Modal.setAppElement("#root");
toast.configure();

function Watchlist() {
  const [{ user }] = useStateValue();
  const [data, setData] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [mId, setMId] = useState("");

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
    return function cleanup() {
      isMounted = false;
    };
  }, [user]);
  const notify = () => {
    toast.info(" Removed from watchlist... ", { autoClose: 1500 });
  };

  const titleUpdate = (e) => {
    e.preventDefault();
    db.collection("users")
      .doc(user?.uid)
      .collection("watchlist")
      .doc(mId)
      .update({
        title: title,
      });

    setTitle("");
    setIsOpen(false);
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
                <img src={movie?.data.poster_path} alt="" />
              </Img>
              <Desc>
                <div>
                  <h2>{movie?.data.title}</h2>
                  <EditIcon
                    id="edit"
                    onClick={() => {
                      setIsOpen(true);
                      setMId(movie?.id);
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
                <Link to={`/detail/${movie?.id}/${movie?.data.media_type}`}>
                  <div>
                    <PlayArrowIcon />
                  </div>
                </Link>
              </MovieAction>
            </Wrap>
          ))}
        <Modal
          isOpen={isOpen}
          contentLabel="Edit Title Modal"
          style={{
            content: {
              top: "50%",
              left: "50%",
              right: "auto",
              bottom: "auto",
              marginRight: "-50%",
              transform: "translate(-50%, -50%)",
            },
          }}
        >
          <button className="modal_close_btn" onClick={() => setIsOpen(false)}>
            {" "}
            X{" "}
          </button>
          <h2 className="modal_h2">Update Title</h2>
          <form className="modal_form">
            <h5>Title</h5>
            <input
              type="text"
              onChange={(e) => setTitle(e.target.value.trimStart())}
            />
            <button
              disabled={!title}
              className="modal_btn"
              onClick={titleUpdate}
            >
              Update
            </button>
          </form>
        </Modal>
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
