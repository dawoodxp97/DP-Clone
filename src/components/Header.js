import React from "react";
import { Link, useHistory } from "react-router-dom";
import styled from "styled-components";
import { auth } from "../firebase";
import { useStateValue } from "../StateProvider";
import Hamburger from "./Hamburger";

function Header() {
  const History = useHistory();
  const [{ user }] = useStateValue();
  const handleSignOut = () => {
    auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        auth.signOut();
        History.push("/signin");
      }
    });
  };
  return (
    <Nav>
      <Hamburger />
      <Link to="/homepage">
        <HeadLogo
          src="https://secure-media.hotstarext.com/web-assets/prod/images/brand-logos/disney-hotstar-logo-dark.svg"
          alt=""
        ></HeadLogo>
      </Link>
      <NavMenu>
        <Link to="/homepage">
          <NavMenuOpt>
            <img src="/images/home-icon.svg" alt="HOME" />
            <span>HOME</span>
          </NavMenuOpt>
        </Link>
        <Link to="/search">
          <NavMenuOpt>
            <img src="/images/search-icon.svg" alt="SEARCH" />
            <span>SEARCH</span>
          </NavMenuOpt>
        </Link>
        <Link to="/watchlist">
          <NavMenuOpt>
            <img src="/images/watchlist-icon.svg" alt="WATCHLIST" />
            <span>WATCHLIST</span>
          </NavMenuOpt>
        </Link>
        <Link to="/originals">
          <NavMenuOpt>
            <img src="/images/original-icon.svg" alt="ORIGINALS" />
            <span>ORIGINALS</span>
          </NavMenuOpt>
        </Link>
        <Link to="/movies">
          <NavMenuOpt>
            <img src="/images/movie-icon.svg" alt="MOVIES" />
            <span>MOVIES</span>
          </NavMenuOpt>
        </Link>
        <Link to="/series">
          <NavMenuOpt>
            <img src="/images/series-icon.svg" alt="SERIES" />
            <span>SERIES</span>
          </NavMenuOpt>
        </Link>
      </NavMenu>
      <SignOut>
        <Link to="/profile">
          <UserImg
            src={
              user?.photoURL
                ? user?.photoURL
                : "https://firebasestorage.googleapis.com/v0/b/dp-clone-3c2d8.appspot.com/o/images%2Fusericon.png?alt=media&token=1fcda5e8-16e1-42c1-adaa-a259f03071ec"
            }
            alt=""
          />
        </Link>
        <DropDown onClick={handleSignOut}>
          <span>Sign out</span>
        </DropDown>
      </SignOut>
    </Nav>
  );
}

export default Header;

const Nav = styled.nav`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height: 60px;
  background-color: #010829;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 36px;
  letter-spacing: 16px;
  z-index: 3;
  @media (max-width: 768px) {
    margin-right: 1.5rem;
  }
`;

const NavMenu = styled.div`
  align-items: center;
  display: flex;
  flex-flow: row nowrap;
  height: 100%;
  justify-content: flex-end;
  margin: 0px;
  padding: 0px;
  position: relative;
  margin-right: auto;
  margin-left: 25px;
  @media (max-width: 768px) {
    display: none;
  }
`;
const NavMenuOpt = styled.div`
  display: flex;
  align-items: center;
  padding: 0 12px;
  cursor: pointer;
  img {
    height: 20px;
    min-width: 20px;
    width: 20px;
    z-index: auto;
  }
  span {
    color: rgb(249, 249, 249);
    font-size: 13px;
    padding-top: 4px;
    padding-left: 2px;
    letter-spacing: 1.42px;
    line-height: 1.08;
    white-space: nowrap;
    position: relative;
    &:before {
      background-color: rgb(249, 249, 249);
      border-radius: 0px 0px 4px 4px;
      bottom: -6px;
      content: "";
      height: 2px;
      left: 0px;
      opacity: 0;
      position: absolute;
      right: 0px;
      transform-origin: left center;
      transform: scaleX(0);
      transition: all 250ms cubic-bezier(0.25, 0.46, 0.45, 0.94) 0s;
      visibility: hidden;
      width: auto;
    }
  }
  &:hover {
    span:before {
      transform: scaleX(1);
      visibility: visible;
      opacity: 1 !important;
    }
  }
`;
const HeadLogo = styled.img`
  padding-left: 10px;
`;
const UserImg = styled.img`
  height: 100%;
`;

const DropDown = styled.div`
  position: absolute;
  top: 53px;
  right: 0px;
  background: rgb(19, 19, 19);
  border: 1px solid rgba(151, 151, 151, 0.34);
  border-radius: 4px;
  box-shadow: rgb(0 0 0 / 50%) 0px 0px 18px 0px;
  padding: 10px;
  font-size: 14px;
  letter-spacing: 3px;
  width: 100px;
  opacity: 0;
`;

const SignOut = styled.div`
  position: relative;
  height: 48px;
  width: 48px;
  display: flex;
  cursor: pointer;
  align-items: center;
  justify-content: center;
  ${UserImg} {
    border-radius: 50%;
    width: 100%;
    height: 100%;
  }
  &:hover {
    ${DropDown} {
      opacity: 1;
      transition-duration: 1s;
    }
  }
`;
