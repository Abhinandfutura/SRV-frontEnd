import { Button } from "@mui/material";
import axios from "axios";
import React, { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components/macro";
import { useSelector } from "react-redux";

import ReactHTMLTableToExcel from "react-html-table-to-excel";
function Home() {
  const userInfo = useSelector((state) => state.user);

  const navigate = useNavigate();
  const [state, setState] = useState({
    user: [],
    isCallsuper: false,
  });

  const [userId, setUserId] = useState("");

  useEffect(() => {
    fetch();

    if (userId) {
      deleteuser();
    }

    setState((prevState) => {
      return {
        ...prevState,
        isCallsuper: false,
      };
    });

    setUserId("");
  }, [state.isCallsuper]);

  const deleteuser = async () => {
    await axios
      .delete(`http://localhost:8000/users/delete/${userId}`)
      .then((res) => {
        if (res.data.isError === false) {
          setState((prevState) => {
            return {
              ...prevState,
              isCallsuper: true,
            };
          });
          alert(res.data.message);
        } else {
          alert(res.data.message);
        }
      });
  };

  const fetch = async () => {
    await axios.get("http://localhost:8000/users/getallusers").then((res) => {
      if (res.data) {
        setState((prevState) => {
          return {
            ...prevState,
            user: res.data,
          };
        });
      }
    });
  };

  const handleClick = (id) => {
    navigate(`/update-profile/${id}`);
  };

  return (
    <Container>
      <LeftContainer>
        <h2>Profile Info</h2>
        <PersonalInfo>
          <NameTxt>name :</NameTxt>
          <NameTxt2>{userInfo.name}</NameTxt2>
        </PersonalInfo>
        <PersonalInfo>
          <NameTxt>housename :</NameTxt>
          <NameTxt2>{userInfo.housename}</NameTxt2>
        </PersonalInfo>

        <PersonalInfo>
          <NameTxt>Mobile no :</NameTxt>
          <NameTxt2>{userInfo.mobile}</NameTxt2>
        </PersonalInfo>

        <PersonalInfo>
          <NameTxt>email :</NameTxt>
          <NameTxt2>{userInfo.email}</NameTxt2>
        </PersonalInfo>

        <StyledButton
          type="submit"
          variant="contained"
          onClick={() => handleClick(userInfo._id)}
        >
          Edit
        </StyledButton>
      </LeftContainer>
      <Right>
        <Header>
          <h2>Users</h2>

          <ReactHTMLTableToExcel
            id="test-table-xls-button"
            className="download-table-xls-button"
            table="table-to-xls"
            filename="tablexls"
            sheet="tablexls"
            buttonText="Download as XLS"
          />
        </Header>
        <Table id="table-to-xls">
          <Thead>
            <TR>
              <TH style={{ borderRadius: " 15px 0px 0px 0px" }}>Name</TH>
              <TH>House Name</TH>
              <TH>Email</TH>
              <TH>Mobile no</TH>
              <TH style={{ borderRadius: " 0px 15px 0px 0px" }}></TH>
            </TR>
          </Thead>
          <TBody>
            {state.user.map((i) =>
              i.email !== userInfo.email ? (
                <TR>
                  <TD>{i.name}</TD>
                  <TD>{i.housename}</TD>
                  <TD>{i.email}</TD>
                  <TD>{i.mobile}</TD>
                  <TD>
                    <DeleteBtn
                      type="submit"
                      variant="contained"
                      onClick={() => {
                        setUserId(i._id);
                        setState((prevState) => {
                          return {
                            ...prevState,
                            isCallsuper: true,
                          };
                        });
                      }}
                    >
                      Delete
                    </DeleteBtn>
                  </TD>
                </TR>
              ) : (
                ""
              )
            )}
          </TBody>
        </Table>
      </Right>
    </Container>
  );
}

export default Home;
const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;
const Table = styled.table`
  width: 900px;
  font-size: 13px;

  border-collapse: collapse;
`;
const TD = styled.td`
  padding: 5px 13px; ;
`;
const TBody = styled.tbody``;
const TH = styled.th`
  background-color: black;
  color: white;
  font-weight: 500;
  padding: 8px 13px; ;
`;
const Thead = styled.thead``;
const TR = styled.tr`
  border-bottom: 1px solid black;
`;
const Right = styled.div`
  display: flex;
  text-align: left;
  flex-direction: column;
  gap: 10px;
  padding: 20px;
`;
const StyledButton = styled(Button)`
  && {
    width: 100%;
    height: 40px;
    margin-top: 14px;
    background-color: #006ea3;

    border-radius: 9px;
    text-transform: capitalize;
    :hover {
      background-color: #006ea3;
    }

    font-family: "Poppins", sans-serif;
  }
`;
const DeleteBtn = styled(Button)`
  && {
    background-image: linear-gradient(180deg, #070808, #f10000);
    width: 100%;
    height: 30px;
    margin-top: 3px;
    margin-bottom: 3px;

    border-radius: 9px;
    text-transform: capitalize;

    font-family: "Poppins", sans-serif;
  }
`;

const LeftContainer = styled.div`
  width: 350px;
  border: 1px solid #00000045;
  display: flex;
  height: 290px;
  align-items: flex-start;
  flex-direction: column;
  gap: 10px;
  padding: 20px;
  border-radius: 30px;
`;
const NameTxt = styled.span`
  font-size: 12px;
  font-weight: 600;
`;
const NameTxt2 = styled(NameTxt)`
  font-weight: 400;
  margin-left: 10px;
`;
const Container = styled.div`
  padding: 30px;
  display: flex;
  gap: 10px;
  margin-top: 60px;
`;
const PersonalInfo = styled.div``;
