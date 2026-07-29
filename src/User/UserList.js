import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Box, Button, Stack, Typography } from "@mui/material";
import axios from "axios";

export default function UserList() {
  const navigate = useNavigate();

  const [users, setUsers] = useState([]);

  useEffect(() => {
    axios
      .get("https://dummyjson.com/users?limit=0")
      .then((response) => {
        setUsers(response.data.users);
      });
  }, []);

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Quản lý người dùng
      </Typography>

      <Stack spacing={2}>
        {users.map((user) => (
          <Box key={user.id}>
            <Typography variant="h6">
              {user.firstName} {user.lastName}
            </Typography>

            <Typography>{user.email}</Typography>

            <Button onClick={() => navigate(`/nguoi-dung/${user.id}`)}>
              Xem chi tiết
            </Button>
          </Box>
        ))}
      </Stack>
    </Box>
  );
}