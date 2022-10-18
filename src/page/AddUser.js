import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addUser } from "../redux/actions";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
function AddUser() {
  const [state, setState] = useState({
    firstName: "",
    lastName: "",
    email: "",
    address: "",
  });
  let history = useNavigate();

  let dispatch = useDispatch();
  const { firstName, lastName, email, address } = state;

  const handleInputChange = (e) => {
    let { name, value } = e.target;
    setState({ ...state, [name]: value });
  };
  console.log("state input", state);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!firstName || !lastName || !email || !address) {
      alert("Vui lòng nhập đầy đủ thông tin");
    } else {
      dispatch(addUser(state));
      history("/");
    }
  };
  return (
    <Box sx={{ my: 2 }}>
      <Link to="/" style={{ textDecoration: "none" }}>
        <Button variant="contained" color="secondary">
          Back
        </Button>
      </Link>

      <Box
        component="form"
        sx={{
          "& > :not(style)": { m: 1, width: "45ch" },
        }}
      >
        <TextField
          value={firstName}
          name="firstName"
          label="First name"
          variant="standard"
          onChange={(e) => handleInputChange(e)}
        />
        <br />
        <TextField
          value={lastName}
          name="lastName"
          label="Last Name"
          variant="standard"
          onChange={(e) => handleInputChange(e)}
        />{" "}
        <br />
        <TextField
          name="email"
          value={email}
          label="Email"
          variant="standard"
          onChange={(e) => handleInputChange(e)}
        />
        <br />
        <TextField
          name="address"
          label="Address"
          variant="standard"
          value={address}
          onChange={(e) => handleInputChange(e)}
        />{" "}
      </Box>

      <Button
        onClick={handleSubmit}
        variant="contained"
        sx={{ my: 2 }}
        color="primary"
      >
        Add User
      </Button>
    </Box>
  );
}

export default AddUser;
