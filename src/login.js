import { useContext, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { Button, Stack, TextField, Typography } from "@mui/material";

import { AuthContext } from "./context/AuthContext";

export default function Login() {
  const { login, user } = useContext(AuthContext);
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  if (user) {
    return <Navigate to="/dashboard" replace />;
  }

  const handleLogin = async () => {
    const success = await login(username, password);

    if (success) {
      navigate("/dashboard");
    } else {
      alert("Sai tài khoản hoặc mật khẩu");
    }
  };

  return (
    <Stack spacing={2} sx={{ width: 300, margin: "50px auto" }}>
      <Typography variant="h4">
        Đăng nhập
      </Typography>

      <TextField
        label="Tên đăng nhập"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />

      <TextField
        label="Mật khẩu"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <Button
        variant="contained"
        onClick={handleLogin}
      >
        Đăng nhập
      </Button>
    </Stack>
  );
}