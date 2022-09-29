import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import Button from "@mui/material/Button";
import styled from "styled-components/macro";
import { CircularProgress } from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { profileUpdate } from "../Slices/userSlice";
import { useDispatch, useSelector } from "react-redux";
function UpdateProfile() {
  const dispatch = useDispatch();
  const fetchUser = useSelector((state) => state.user);
  console.log("..................", fetchUser._id);

  const [isLoading, setIsloading] = useState(false);

  const { id } = useParams();
  const [user1, setUser1] = useState({});
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    trigger,
    watch,
    formState: { errors },
  } = useForm({ mode: "onTouched" });

  useEffect(() => {
    fetch();
  }, []);
  const fetch = async () => {
    await axios
      .get(`http://localhost:8000/users/get-user/${id}`)
      .then((res) => {
        if (res.data.isError === false) {
          setUser1(res.data.singleUser);
        } else {
          navigate("/home");
        }
      });
  };
  const onSubmit = async (data) => {
    setIsloading(true);

    await axios
      .put("http://localhost:8000/users/update-user", {
        data,
        id: id,
      })

      .then((res) => {
        if (res.data.isError === false) {
          alert(res.data.message);
          axios
            .get(`http://localhost:8000/users/change-profile/${fetchUser._id}`)
            .then((res) => {
              if (res.data.isError === false) {
                console.log("-----------------------", res.data);
                dispatch(
                  profileUpdate({
                    ...res.data,

                    name: res.data.user.name,
                    housename: res.data.user.housename,
                    email: res.data.user.email,
                    mobile: res.data.user.mobile,
                  })
                );
              }
            });

          navigate("/home");
          console.log("response", res.data.message);
          setIsloading(false);
        } else {
          alert(res.data.message);
          console.log(res.data.message);
          setIsloading(false);
        }
      });
  };
  console.log(watch());

  return (
    <Container>
      <CenterContainer>
        <Editprofile>Edit Profile</Editprofile>

        <Form onSubmit={handleSubmit(onSubmit)}>
          <ParentDiv>
            <div>
              <InputContainer>
                <NameTxt>Full Name</NameTxt>
                <StyledInput
                  name="name"
                  defaultValue={user1.name}
                  className={`${errors.name && "inValid"}`}
                  type="text"
                  placeholder="Full Name"
                  {...register("name", {
                    required: "Name required.",
                  })}
                  errors={errors}
                />
                {errors.name && <ErrorMsg>{errors.name.message}</ErrorMsg>}
              </InputContainer>
              <InputContainer>
                <NameTxt>Mob:</NameTxt>
                <StyledInput
                  name="mobile"
                  defaultValue={user1.mobile}
                  className={`${errors.mobile && "inValid"}`}
                  type="tel"
                  placeholder="Phone number"
                  {...register("mobile", {
                    required: "Phone number is requireds",
                  })}
                  errors={errors}
                />
              </InputContainer>
              {errors.mobile && <ErrorMsg>{errors.mobile.message}</ErrorMsg>}
            </div>
            <div style={{ width: "50%" }}>
              <InputContainer>
                <NameTxt>House Name:</NameTxt>
                <StyledInput
                  name="housename"
                  defaultValue={user1.housename}
                  className={`${errors.housename && "inValid"}`}
                  type="text"
                  placeholder="House Name"
                  {...register("housename", {
                    required: "House name is required",
                  })}
                  errors={errors}
                  onKeyUp={() => {
                    trigger("email");
                  }}
                />
              </InputContainer>
              {errors.housename && (
                <ErrorMsg>{errors.housename.message}</ErrorMsg>
              )}
              <InputContainer>
                <NameTxt>Email</NameTxt>
                <StyledInput
                  name="email"
                  defaultValue={user1.email}
                  className={`${errors.email && "inValid"}`}
                  type="email"
                  placeholder="Email"
                  {...register("email", {
                    required: "Email is required",

                    pattern: {
                      value:
                        /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
                      message: "enter a valid email address",
                    },
                  })}
                  errors={errors}
                />
              </InputContainer>
              {errors.email && <ErrorMsg>{errors.email.message}</ErrorMsg>}
            </div>
          </ParentDiv>
          <ButtonContainer>
            <CancelButton
              type="submit"
              variant="contained"
              onClick={() => navigate("/home")}
            >
              Cancel
            </CancelButton>
            <ConfirmButton type="submit" variant="contained">
              {isLoading ? <StyledLoader color="inherit" /> : "Confirm"}
            </ConfirmButton>
          </ButtonContainer>
        </Form>
      </CenterContainer>
    </Container>
  );
}

export default UpdateProfile;

const ButtonContainer = styled.div`
  display: flex;
  gap: 10px;
  align-items: center;
  width: 100%; ;
`;
const ParentDiv = styled.div`
  display: flex;
  gap: 14px;

  max-width: 500px;
  width: 100vw;
`;

const StyledLoader = styled(CircularProgress)`
  && {
    width: 25px !important;
    height: 25px !important;
  }
`;
const IconContainer = styled.div`
  position: absolute;
  right: 5px;
  top: 29px;
`;
const InputContainer = styled.div`
  display: block;
  margin-top: 10px;
  :nth-child(1) {
    margin-top: unset;
  }
  width: 100%;
`;
const NameTxt = styled.span`
  color: black;
  font-size: 13px;
`;
const InputContainer2 = styled(InputContainer)`
  position: relative;
`;
const ConfirmButton = styled(Button)`
  && {
    width: 100%;
    height: 40px;
    margin-top: 14px;
    background-color: green;

    border-radius: 9px;
    text-transform: capitalize;
    :hover {
      background-color: green;
    }

    font-family: "Poppins", sans-serif;
  }
`;

const CancelButton = styled(ConfirmButton)`
  && {
    background-color: black;
    &:hover {
      background-color: black;
    }
  }
`;
const StyledInput = styled.input`
  width: 100%;
  box-sizing: border-box;

  font-family: "Poppins", sans-serif;
  font-size: 13px;
  height: 39px;
  margin-top: 5px;
  padding-left: 10px;

  outline: none;
  border-radius: 9px;
  border: 1px solid #a8a7aa;
  ::placeholder {
    color: #9f9f9f;
    font-size: 13px;
  }

  &.inValid {
    border: 1px solid red;
  }
`;
const ErrorMsg = styled.span`
  display: block;
  font-size: 12px;
  color: red;
`;
const Editprofile = styled.span`
  font-size: 26px;
  letter-spacing: 1px;
  font-weight: 700;
`;
const Form = styled.form`
  padding: 25px;
  align-items: flex-start;
  margin-top: 10px;
  display: flex;
  flex-direction: column;

  border-radius: 23px;

  background-image: linear-gradient(113deg, #ffffff, #ffffff); ;
`;

const CenterContainer = styled.div`
  display: flex;
  flex-direction: column;

  align-items: center;
  gap: 10px;
`;

const Container = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background-image: linear-gradient(180deg, #ecf2f0, #6e8c82);
`;
