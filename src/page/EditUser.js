import { useState, useEffect } from "react";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import { Link } from "react-router-dom";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { editUser, listUsers } from "../redux/actions";

function EditUser() {
  const [state, setState] = useState({
    id: "",
    firstName: "",
    lastName: "",
    email: "",
    address: "",
  });

  let { users } = useSelector((state) => state.data);

  let dispatch = useDispatch();

  let history = useNavigate();

  let { id } = useParams();
  const filterUser = users.filter((item) => item.id === +id);
  console.log("check filter ====>", filterUser[0]);

  useEffect(() => {
    dispatch(listUsers);
    if (filterUser[0]) {
      setState(filterUser[0]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  console.log("check id", id);
  const handleEdit = () => {
    if (!firstName || !lastName || !email || !address) {
      alert("Vui lòng nhập đầy đủ thông tin !");
    } else {
      dispatch(editUser(state));
      history("/");
    }
  };
  const handleInputChange = (e) => {
    let { name, value } = e.target;
    setState({ ...state, [name]: value, id: id });
  };
  let { firstName, lastName, email, address } = state;

  console.log("check state:", state);
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
          id="standard-basic"
          label="First name"
          variant="standard"
          onChange={(e) => handleInputChange(e)}
        />
        <br />
        <TextField
          value={lastName}
          name="lastName"
          id="standard-basic"
          label="Last name"
          variant="standard"
          onChange={(e) => handleInputChange(e)}
        />{" "}
        <br />
        <TextField
          value={email}
          name="email"
          id="standard-basic"
          label="Email"
          variant="standard"
          onChange={(e) => handleInputChange(e)}
        />{" "}
        <br />
        <TextField
          value={address}
          name="address"
          id="standard-basic"
          label="Address"
          variant="standard"
          onChange={(e) => handleInputChange(e)}
        />{" "}
      </Box>
      <Button sx={{ my: 2 }} variant="contained" onClick={() => handleEdit()}>
        Update
      </Button>
    </Box>
  );
}

export default EditUser;
