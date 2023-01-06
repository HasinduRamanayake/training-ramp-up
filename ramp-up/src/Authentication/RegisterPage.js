import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { useState } from "react";
import { Navigate } from "react-router-dom";

export const RegisterPage = () => {
  const [auth, setAuth] = useState({
    name: "",
    password: "",
  });

  const [registered, setRegistered] = useState(false);

  const handleChange = (e) => {
    //srtting the state
    setAuth({
      ...auth,
      [e.target.id]: e.target.value,
    });
    console.log(auth);
  };

  const handleSubmit = async (e) => {
    if (auth.name === "") {
      console.log("Missing Name");
    } if (auth.password === "") {
      console.log("Missing Password");
    } else {
      try {
        const response = await fetch("http://localhost:5200/register", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: auth.name,
            password: auth.password,
          }),
        });
        if(response.status == 400){
          alert("User Exists")
        }else{
          setRegistered(true);
        }
      } catch (error) {
        console.log(error);
      }
            
    }

    
  };
  if (registered) {
    return <Navigate to={"/signin"} />;
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
          <Typography style={{ fontSize: "40px" }}>Register</Typography>
          <form autoComplete="false">
            <TextField
              fullWidth
              role={"textField"}
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
              role={"Btn"}
              onClick={handleSubmit}
              style={{ color: "black", marginTop: "60px" }}
            >
              Register
            </Button>
          </form>
        </Paper>
      </Grid>
    </>
  );
};
