import * as types from "./actionType";
import * as servicesAPI from "../servicesAPI/userAPI";

const getUsers = (users) => ({
  type: types.GET_USERS,
  payload: users,
});

export const listUsers = () => {
  return async (dispatch) => {
    let res = await servicesAPI.getAllUsers();
    dispatch(getUsers(res.data));
  };
};

const add_user = () => ({
  type: types.ADD_USER,
});

export const addUser = (user) => {
  return async (dispatch) => {
    await servicesAPI.createUser(user);
    dispatch(add_user());
    dispatch(listUsers());
  };
};

const delete_user = () => ({
  type: types.DELETE_USER,
});

export const deleteUser = (id) => {
  return async (dispatch) => {
    await servicesAPI.deleteUserService(id);
    dispatch(delete_user());
    dispatch(listUsers());
  };
};

const edit_user = () => ({
  type: types.EDIT_USER,
});

export const editUser = (user) => {
  return async (dispatch) => {
    await servicesAPI.updateUser(user);
    dispatch(edit_user());
    dispatch(getUsers());
  };
};
