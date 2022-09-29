import React, { useState } from "react";
import { useForm } from "react-hook-form";
import Button from "@mui/material/Button";
import styled from "styled-components/macro";
import Snackbar from "@mui/material/Snackbar";
import { useDispatch } from "react-redux";
import axios from "axios";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { CircularProgress, IconButton } from "@mui/material";
import { loginSuccess } from "../Slices/userSlice";
import { useNavigate } from "react-router-dom";

function SignIn() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [isLoading, setIsloading] = useState(false);

  const [showPasword, setShowPassword] = useState(false);
  const {
    register,
    handleSubmit,
    trigger,
    // watch,
    formState: { errors },
  } = useForm({ mode: "onTouched" });

  const [state, setState] = useState({
    open: false,
    vertical: "top",
    horizontal: "center",
  });

  const { vertical, horizontal, open } = state;

  const handleClose = () => {
    setState({ ...state, open: false });
  };

  const onSubmit = async (data) => {
    const { email, password } = data;
    setIsloading(true);
    await axios
      .post("http://localhost:8000/users/signin", {
        email: email,
        password: password,
      })
      .then((res) => {
        if (res.data.isError === false) {
          dispatch(
            loginSuccess({
              ...res.data,
              access: res.data.accessToken,
              name: res.data.name,
              housename: res.data.housename,
              email: res.data.email,
              mobile: res.data.mobile,

              isAuth: true,
            })
          );
          setIsloading(false);
          navigate("/home");
          setState({
            ...state,
            open: true,
            vertical: "top",
            horizontal: "center",
          });
        } else {
          alert(res.data.message);
          setIsloading(false);
        }
        console.log("===========", res.data);
      });
  };
  //   console.log(watch());
  return (
    <Container>
      <CenterContainer>
        <SigInTxt>Signin</SigInTxt>

        <Form onSubmit={handleSubmit(onSubmit)}>
          <InputContainer>
            <NameTxt>Email</NameTxt>
            <StyledInput
              className={`${errors.email && "inValid"}`}
              name="email"
              type="email"
              placeholder="Email"
              {...register("email", {
                required: "Email is required",

                pattern: {
                  value:
                    /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
                  message: "Enter a valid email address",
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
              className={`${errors.password && "inValid"}`}
              name="Password"
              type={showPasword ? "text" : "password"}
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
                  message: "The password should have maximum of 20 characters",
                },
              })}
              errors={errors}
              onKeyUp={() => {
                trigger("password");
              }}
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
          {errors.password && <ErrorMsg>{errors.password.message}</ErrorMsg>}
          <StyledButton type="submit" variant="contained" disableElevation>
            {isLoading ? <StyledLoader color="inherit" /> : "Signin"}
          </StyledButton>
        </Form>
      </CenterContainer>
      <Snackbar1
        anchorOrigin={{ vertical, horizontal }}
        open={open}
        onClose={handleClose}
        message="Signup Successfully"
        key={vertical + horizontal}
      />
    </Container>
  );
}

export default SignIn;

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
const ErrorMsg = styled.span`
  display: block;
  font-size: 12px;
  color: red;
`;
const Snackbar1 = styled(Snackbar)`
  .css-1eqdgzv-MuiPaper-root-MuiSnackbarContent-root {
    background-color: rgb(67, 160, 71) !important;
  }
`;
const InputContainer = styled.div`
  display: block;
  width: 100%;
`;
const InputContainer2 = styled(InputContainer)`
  position: relative;
`;
const NameTxt = styled.span`
  color: black;
  font-size: 13px;
`;
const StyledButton = styled(Button)`
  && {
    width: 100%;
    height: 40px;

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
  margin-top: 5px;
  font-family: "Poppins", sans-serif;
  font-size: 13px;
  height: 39px;
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
const SigInTxt = styled.span`
  font-size: 26px;

  font-weight: 700;
`;
const Form = styled.form`
  padding: 15px;
  align-items: flex-start;
  margin-top: 10px;
  display: flex;
  flex-direction: column;
  gap: 14px;
  max-width: 419px;
  width: 80vw;
  padding: 27px;
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
