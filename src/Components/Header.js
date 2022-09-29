import React from "react";

import styled from "styled-components/macro";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logoutSuccess } from "../Slices/userSlice";

function Header() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const data = useSelector((state) => state.user);

  const LogoutFn = async () => {
    let url = "http://localhost:8000/users/logout";
    let logoutResponse = await fetch(url, {
      method: "POST",
      headers: {
        "content-type": "application/json",
        Authorization: `Token ${data.access}`,
      },
    }).then((response) => response.json());
    console.log("pppppppppppppppppp", logoutResponse);
    if (logoutResponse.isError === false) {
      dispatch(logoutSuccess({}));
      alert(logoutResponse.message);
      navigate("/signin");
    }
  };

  return (
    <Container>
      <Left>
        <LogoTxt>Logo</LogoTxt>
      </Left>
      <Right>
        <LinkContainer>
          {data.access && data.isAuth ? (
            <>
              <Links to="/home">Home</Links>
              <Links onClick={LogoutFn}>Logout</Links>
            </>
          ) : (
            <>
              <Links to="/signup">Signup</Links>
              <Links to="/signin">Signin</Links>
            </>
          )}
        </LinkContainer>
      </Right>
    </Container>
  );
}

export default Header;

const Right = styled.div`
  gap: 5px;
  display: flex;
  align-items: center;
`;

const Links = styled(Link)`
  text-decoration: none;
  color: white;
  font-size: 12px;
`;

const LinkContainer = styled.div`
  display: flex;
  align-self: center;
  margin-left: 40px;
  gap: 20px;
`;
const LogoTxt = styled.h2`
  font-size: 16px;
`;
const Left = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
`;
const Container = styled.div`
  height: 60px;
  background-image: linear-gradient(120deg, #0037ffbd, #29c32ea8);
  background-color: burlywood;
  color: white;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0px 40px;
  width: 100%;
  position: fixed;
  top: 0;
`;
