import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import { img_url } from "./Requests";
import ModalView from "./ModalView";
import { db } from "../firebase";
import { useStateValue } from "../StateProvider";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

toast.configure();

const Details = () => {
  const [{ user }] = useStateValue();
  const { type, id, media_type } = useParams();
  const [data, setData] = useState({});
  const [cast, setCast] = useState([]);

  useEffect(() => {
    let isMounted = true;
    async function fetchDetails() {
      if (isMounted) {
        const request = await db
          .collection(type)
          .doc(id)
          .get()
          .then((doc) => {
            if (doc.exists) {
              setData(doc.data());
              setCast(doc.data().castMem);
            } else {
              // doc.data() will be undefined in this case
              console.log("No such document!");
            }
          })
          .catch((error) => {
            console.log("Error getting document:", error);
          });
        return request;
      }
    }
    fetchDetails();
    window.scrollTo(0, 0);
    return () => {
      isMounted = false;
    };
  }, [id, type]);

  const uploadWatchlist = () => {
    db.collection("users")
      .doc(user?.uid)
      .collection("watchlist")
      .doc(data?.id.toString())
      .set({
        id: id,
        collectionType: type,
        media_type: media_type,
        poster_path: data?.poster,
        title: data?.original_title
          ? data?.original_title
          : "Title Not Available",
        overview: !data?.overview ? "Overview Not Available" : data?.overview,
      });
    notify();
  };

  const notify = () => {
    toast.success("🚀 Yeahhh! Added to Watchlist... ", { autoClose: 2000 });
  };

  return (
    <Container>
      <Background>
        <img
          alt={data.original_title}
          src={data?.background_img}
          loading="lazy"
        />
      </Background>
      <ImageTitle>
        {data?.logo ? (
          <img alt={data?.original_title} src={data?.logo} loading="lazy" />
        ) : (
          <h1>{data?.original_title}</h1>
        )}
      </ImageTitle>
      <VideoPlayer>
        {data?.trailer ? (
          <ModalView videoUrl={data?.trailer} />
        ) : (
          "Trailer Not Available"
        )}
      </VideoPlayer>
      <ContentMeta>
        <Controls>
          <Player>
            <img src="/images/play-icon-black.png" alt="" />
            <span>Play</span>
          </Player>
          <AddList onClick={uploadWatchlist}>
            <span />
            <span />
          </AddList>

          <GroupWatch>
            <div>
              <img src="/images/group-icon.png" alt="" />
            </div>
          </GroupWatch>
        </Controls>
        <SubTitle>{`Realease Date: ${
          !data?.release_date ? "NA" : data?.release_date
        }, Ratings: ${
          !data?.vote_average ? "NA" : data?.vote_average
        }, Votes: ${!data?.vote_count ? "NA" : data?.vote_count}`}</SubTitle>
        <Description>{data?.overview}</Description>
      </ContentMeta>
      <Additionals>
        {!data?.runtime ? "" : <p>Screen time: {data?.runtime} Mins.</p>}
      </Additionals>
      <H1>Cast Details:</H1>
      <RDT>
        {cast &&
          cast?.map((cast, key) => (
            <div key={key}>
              {!cast?.profile_path ? (
                <img src="/images/no_user.jpg" alt="No User" />
              ) : (
                <img src={`${img_url}${cast?.profile_path}`} alt={key} />
              )}

              <CD>
                <h4>{cast?.original_name}</h4>
                <p>as</p>
                <p>{cast?.character}</p>
              </CD>
            </div>
          ))}
      </RDT>
    </Container>
  );
};

const Container = styled.div`
  position: relative;
  min-height: calc(100vh-250px);
  overflow-x: hidden;
  display: block;
  top: 72px;
  padding: 0 calc(3.5vw + 5px);
`;
const VideoPlayer = styled.div``;
const Additionals = styled.div`
  p {
    margin: 0;
  }
`;
const H1 = styled.h1`
  margin-top: 4rem;
  @media (max-width: 768px) {
    font-size: medium;
  }
`;
const RDT = styled.div`
  height: 53vw;
  width: 100%;
  padding: 30px;
  margin-bottom: 25px;
  overflow: hidden;
  display: grid;
  grid-gap: 25px;
  gap: 10px;
  grid-template-columns: repeat(5, minmax(0, 1fr));
  @media (max-width: 768px) {
    padding: 0;
    margin-top: 1.5rem;
    grid-template-columns: repeat(4, minmax(0, 1fr));
  }
  div {
    height: 15vw;
    width: 15vw;
    img {
      width: 100%;
      height: 90%;
      border-radius: 50%;
      transition: all 250ms cubic-bezier(0.25, 0.46, 0.45, 0.94) 0s;
      border: 3px solid rgba(249, 249, 249, 0.1);
      &:hover {
        transform: scale(1.15);
        border-color: rgba(249, 249, 249, 0.8);
      }
    }
  }
`;
const CD = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  margin-top: 10px;
  h4 {
    margin: 0;
    letter-spacing: 1px;
    @media (max-width: 768px) {
      display: none;
    }
  }
  p {
    margin: 0;
    letter-spacing: 1px;
    color: #75c9ad;
    @media (max-width: 768px) {
      display: none;
    }
  }
`;
const Background = styled.div`
  max-height: 130vh;
  display: flex;
  flex-direction: column;
  left: 0px;
  opacity: 0.8;
  position: absolute;
  right: 0px;
  top: 0;
  z-index: -1;
  img {
    width: 100vw;
    height: 99vw;
    mask-image: linear-gradient(to left, #030b17, rgba(0, 0, 0, 0));

    @media (max-width: 768px) {
      mask-image: linear-gradient(to bottom, #030b17, rgba(0, 0, 0, 0));
      width: initial;
    }
  }
`;

const ImageTitle = styled.div`
  align-items: flex-end;
  display: flex;
  -webkit-box-pack: start;
  justify-content: flex-start;
  margin: 0px auto;
  height: 29vw;
  min-height: 170px;
  padding-bottom: 24px;
  width: 100%;
  img {
    max-width: 600px;
    min-width: 200px;
    width: 35vw;
  }
`;

const ContentMeta = styled.div`
  max-width: 874px;
`;

const Controls = styled.div`
  align-items: center;
  display: flex;
  flex-flow: row nowrap;
  margin: 24px 0px;
  min-height: 56px;
`;

const Player = styled.button`
  font-size: 15px;
  margin: 0px 22px 0px 0px;
  padding: 0px 24px;
  height: 56px;
  border-radius: 4px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  letter-spacing: 1.8px;
  text-align: center;
  text-transform: uppercase;
  background: rgb (249, 249, 249);
  border: none;
  color: rgb(0, 0, 0);
  img {
    width: 32px;
  }
  &:hover {
    background: rgb(198, 198, 198);
  }
  @media (max-width: 768px) {
    height: 45px;
    padding: 0px 12px;
    font-size: 12px;
    margin: 0px 10px 0px 0px;
    img {
      width: 25px;
    }
  }
`;

const AddList = styled.div`
  margin-right: 16px;
  height: 44px;
  width: 44px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.6);
  border-radius: 50%;
  border: 2px solid white;
  cursor: pointer;
  span {
    background-color: rgb(249, 249, 249);
    display: inline-block;
    &:first-child {
      height: 2px;
      transform: translate(1px, 0px) rotate(0deg);
      width: 16px;
    }
    &:nth-child(2) {
      height: 16px;
      transform: translateX(-8px) rotate(0deg);
      width: 2px;
    }
  }
`;

const GroupWatch = styled.div`
  height: 44px;
  width: 44px;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  background: white;
  div {
    height: 40px;
    width: 40px;
    background: rgb(0, 0, 0);
    border-radius: 50%;
    img {
      width: 100%;
    }
  }
`;

const SubTitle = styled.div`
  color: rgb(249, 249, 249);
  font-size: 15px;
  min-height: 20px;
  @media (max-width: 768px) {
    font-size: 12px;
  }
`;

const Description = styled.div`
  line-height: 1.4;
  font-size: 20px;
  padding: 16px 0px;
  min-height: 18vw;
  color: rgb(249, 249, 249);
  @media (max-width: 768px) {
    font-size: 16px;
  }
`;

export default React.memo(Details);
