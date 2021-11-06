import React, { useState } from "react";
import styled from "styled-components";
import { useStateValue } from "../StateProvider";
import { auth, storage } from "./../firebase";

function Profile() {
  const [{ user }] = useStateValue();
  const [file, setFile] = useState(null);
  const [status, setStatus] = useState(null);

  const handleUpload = () => {
    setStatus(true);
    let bucketName = "images";
    let storageRef = storage.ref(`${bucketName}/${file.name}`);
    storageRef.put(file).then((snapshot) => {
      //Uploaded a blob or file!
      let bucketRef = storage.ref();
      bucketRef
        .child("images/" + file.name)
        .getDownloadURL()
        .then((url) => {
          const currUser = auth.currentUser;
          currUser
            .updateProfile({
              photoURL: url,
            })
            .then(() => {
              //upload success
              setStatus(false);
            })
            .catch((error) => {
              // An error occurred
              console.log(error);
            });
        });
    });
  };
  return (
    <Container>
      <div>
        <h1 style={{ marginLeft: "4rem" }}>Your Profile</h1>
        <img
          style={{ height: "70vh" }}
          src="https://cdni.iconscout.com/illustration/premium/thumb/man-setting-up-public-profile-4468723-3728636.png"
          alt=""
        />
      </div>
      <Content>
        <img src={user?.photoURL} alt="user" />
        <p>Your Username : {user?.displayName}</p>
        <p>Your Email : {user?.email}</p>
        <div>
          <p>Update you profile picture:</p>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleUpload();
            }}
          >
            <input
              type="file"
              onChange={(e) => {
                setFile(e.target.files[0]);
              }}
              required
            />
            <button className="upload_btn" disabled={status}>
              {status ? "Uploading..." : "Upload"}
            </button>
          </form>
        </div>
      </Content>
    </Container>
  );
}
const Container = styled.div`
  padding: 2vw;
  padding-top: 4rem;
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  align-items: center;
  @media (max-width: 768px) {
    flex-direction: column;
    padding: 5vw;
    padding-top: 4rem;
    padding-bottom: 10vw;
  }
`;

const Content = styled.div`
  margin-top: 1.5rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  img {
    border-radius: 1rem;
    border: 1px solid white;
    height: 8rem;
    width: 8rem;
  }
  div {
    form {
      button {
        height: 2rem;
        width: 6rem;
        border-radius: 0.5rem;
        color: #f1f1f1;
        font-weight: bold;
        letter-spacing: 1px;
        background-color: #010829;
        border: 2px solid #f1f1f1;
        cursor: pointer;
        &:hover {
          background-color: #f1f1f1;
          color: #010829;
        }
      }
    }
  }
`;

export default Profile;
