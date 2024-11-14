import axios from 'axios';


export const registerUser = async (
  username: string,
  email: string,
  password: string
) => {

  const response = await axios.post(`/api/User/signup`, {
    username,
    email,
    password
  });
  return response.data;
};

export const loginUser = async (email: string, password: string) => {
  console.log(email,password);
  const response = await axios.post(`/api/User/login`, {
    email,
    password
  });
  return response.data;
};

