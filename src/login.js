import { useContext, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import {Box,Button,Stack,TextField,Typography,} from "@mui/material";

import { AuthContext } from "./context/AuthContext";

export default function Login() {
  const { login, user } = useContext(AuthContext);
  const navigate = useNavigate();

  const [username, setUsername] = useState("long");
  const [password, setPassword] = useState("longpass");

  if (user) {
    return <Navigate to="/dashboard" replace />;
  }

  const submit = async (event) => {
    event.preventDefault();

    const success = await login(username, password);

    if (success) {
      navigate("/dashboard");
    }
  };

  return (
    <Box
      component="form"
      onSubmit={submit}
      sx={{
        maxWidth: 420,
        mx: "auto",
        mt: 10,
        p: 3,
        border: "1px solid #ddd",
      }}
    >
      <Stack spacing={2}>
        <Typography variant="h4"> Đăng nhập</Typography>

        <TextField label="Tên đăng nhập" value={username} onChange={(e) => setUsername(e.target.value)}/>

        <TextField label="Mật khẩu" type="password" value={password}  onChange={(e) => setPassword(e.target.value)}/>

        <Button type="submit" variant="contained" fullWidth> Đăng nhập</Button>
      </Stack>
    </Box>
  );
}