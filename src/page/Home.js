import { useEffect } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import { Box } from "@mui/system";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import Fab from "@mui/material/Fab";

import { useDispatch, useSelector } from "react-redux";
import { listUsers, deleteUser } from "../redux/actions";

import { Link } from "react-router-dom";

export default function Home() {
  let { users } = useSelector((state) => state.data);
  let dispatch = useDispatch();

  console.log(users);

  useEffect(() => {
    dispatch(listUsers());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleDelete = (id) => {
    dispatch(deleteUser(id));
  };

  return (
    <Box sx={{ width: 1250, margin: "0 auto" }}>
      <Link to="/add-user">
        <Fab color="primary" sx={{ my: 3 }}>
          <AddIcon />
        </Fab>
      </Link>

      <TableContainer component={Paper}>
        <Table
          sx={{ minWidth: 650, borderTop: "1px solid #eee" }}
          aria-label="simple table"
        >
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell align="center">First name</TableCell>
              <TableCell align="center">Last name</TableCell>
              <TableCell align="center">Email</TableCell>
              <TableCell align="center">Address</TableCell>
              <TableCell align="center">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users &&
              users.length > 0 &&
              users.map((user) => (
                <TableRow
                  key={user.id}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    {user.id}
                  </TableCell>
                  <TableCell align="center">{user.firstName}</TableCell>
                  <TableCell align="center">{user.lastName}</TableCell>
                  <TableCell align="center">{user.email}</TableCell>
                  <TableCell align="center">{user.address}</TableCell>
                  <TableCell align="center">
                    {" "}
                    <Link
                      to={`/edit-user/${user.id}`}
                      style={{ textDecoration: "none" }}
                    >
                      <Button variant="outlined" sx={{ mr: 2 }}>
                        <EditIcon /> Edit
                      </Button>
                    </Link>
                    <Button
                      color="error"
                      variant="outlined"
                      onClick={() => handleDelete(user.id)}
                    >
                      <DeleteIcon /> Delete
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}
