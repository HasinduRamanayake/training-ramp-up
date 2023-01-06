import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { useState } from "react";
import { Navigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { authActions } from "../Redux/Reducer";

export const LoginPage = () => {
  const [auth, setAuth] = useState({
    name: "",
    password: "",
  });

  const [logged, setLogged] = useState(false);

  const handleChange = (e) => {
    //srtting the state
    setAuth({
      ...auth,
      [e.target.id]: e.target.value,
    });
    console.log(auth);
  };

  const dispatch = useDispatch();
  const handleSubmit = async (e) => {
    if (auth.name === "") {
      console.log("Missing Name");
    }
    if (auth.password === "") {
      console.log("Missing Password");
    } else {
      try {
        const response = await fetch("http://localhost:5200/login", {
          method: "POST",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: auth.name,
            password: auth.password,
          }),
        });

        const Token = response.json();
        Token.then((message) => {
          console.log(message.message);
          if (message.accessToken) {
            setLogged(true);
            dispatch(authActions.addToken(message.accessToken));
          } else {
            setLogged(false);
            if(response.status == 400)   {
              alert("User does not exists")
            }         
          }
        });
      } catch (error) {
        console.log(error);
      }
    }
  };

  const loggedData = useSelector((state) => state.auth);
  if (logged || !loggedData == null) {
    return <Navigate to={"/home"} />;
  }

  const paperStyle = {
    padding: "20px",
    height: "40vh",
    width: "80vh",
    margin: "30vh auto",
    backgroundColor: "#00D7FF",
    opacity: "80%",
    borderRadius: "30px",
  };

  return (
    <>
      <Grid>
        <Paper elevation={10} style={paperStyle}>
          <Typography style={{ fontSize: "40px" }}>Sign In</Typography>
          <form autoComplete="false">
            <TextField
              role={"textField"}
              fullWidth
              id="name"
              type={"text"}
              onChange={handleChange}
              placeholder="Name"
              style={{ borderRadius: "12px", marginTop: "20px" }}
            ></TextField>
            <TextField
              fullWidth
              role={"textField"}
              id="password"
              type={"password"}
              onChange={handleChange}
              placeholder="Password"
              style={{ borderRadius: "12px", marginTop: "20px" }}
            ></TextField>
            <Button
              fullWidth              
              onClick={handleSubmit}
              style={{ color: "black", marginTop: "60px" }}
            >
              Sign In
            </Button>
          </form>
        </Paper>
      </Grid>
    </>
  );
};
