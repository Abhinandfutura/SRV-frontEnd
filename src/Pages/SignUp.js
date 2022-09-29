import React, { useState } from "react";
import { useForm } from "react-hook-form";
import Button from "@mui/material/Button";
import styled from "styled-components/macro";
import { CircularProgress, IconButton } from "@mui/material";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import VisibilityIcon from "@mui/icons-material/Visibility";
function Signup() {
  const [showPasword, setShowPassword] = useState(false);
  const [isLoading, setIsloading] = useState(false);
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    trigger,
    watch,
    formState: { errors },
  } = useForm({ mode: "onTouched" });

  const onSubmit = async (data) => {
    setIsloading(true);

    await axios
      .post("http://localhost:8000/users/signup", {
        data,
      })

      .then((res) => {
        console.log("response", res.data);

        if (res.data.isError === false) {
          alert(res.data.message);
          navigate("/signin");
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
        <SignupTxt>Registration</SignupTxt>

        <Form onSubmit={handleSubmit(onSubmit)}>
          <ParentDiv>
            <div>
              <InputContainer>
                <NameTxt>Full Name</NameTxt>
                <StyledInput
                  name="name"
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

              <InputContainer>
                <NameTxt>House Name:</NameTxt>
                <StyledInput
                  name="housename"
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
            </div>
            <div style={{ width: "50%" }}>
              <InputContainer>
                <NameTxt>Email</NameTxt>
                <StyledInput
                  name="email"
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
                  onKeyUp={() => {
                    trigger("email");
                  }}
                />
              </InputContainer>
              {errors.email && <ErrorMsg>{errors.email.message}</ErrorMsg>}
              <InputContainer2>
                <NameTxt>Password</NameTxt>
                <StyledInput
                  name="password"
                  type={showPasword ? "text" : "password"}
                  className={`${errors.password && "inValid"}`}
                  placeholder="Password"
                  {...register("password", {
                    required: "Password is required",
                    minLength: {
                      value: 8,
                      message:
                        "The password should have minimum length of 8 characters",
                    },
                    maxLength: {
                      value: 20,
                      message:
                        "The password should have maximum of 20 characters",
                    },
                  })}
                  errors={errors}
                />
                <IconContainer>
                  {showPasword ? (
                    <IconButton onClick={() => setShowPassword(false)}>
                      <VisibilityOffIcon />
                    </IconButton>
                  ) : (
                    <IconButton onClick={() => setShowPassword(true)}>
                      <VisibilityIcon />
                    </IconButton>
                  )}
                </IconContainer>
              </InputContainer2>
              {errors.password && (
                <ErrorMsg>{errors.password.message}</ErrorMsg>
              )}
            </div>
          </ParentDiv>
          <StyledButton type="submit" variant="contained">
            {isLoading ? <StyledLoader color="inherit" /> : "SignUp"}
          </StyledButton>
        </Form>
      </CenterContainer>
    </Container>
  );
}

export default Signup;

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
const StyledButton = styled(Button)`
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
const SignupTxt = styled.span`
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
