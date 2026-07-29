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
      <Typography variant="h4" gutterBottom> Quản lý người dùng</Typography>

      <Stack spacing={1}>
        {users.map((user) => (
          <Box
            key={user.id}
            sx={{
              p: 2,
              border: "1px solid #ddd",
            }}
          >
            <Typography variant="h6">{user.firstName} {user.lastName}</Typography>

            <Typography color="text.secondary">{user.email}</Typography>

            <Button
              sx={{ mt: 1 }}
              onClick={() => navigate(`/nguoi-dung/${user.id}`)}
            >
              Xem chi tiết
            </Button>
          </Box>
        ))}
      </Stack>
    </Box>
  );
}