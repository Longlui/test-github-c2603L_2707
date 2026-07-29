import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Box, Button, Stack, Typography } from "@mui/material";

import axios from "axios";

export default function UserDetail() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [user, setUser] = useState({});
  const [works, setWorks] = useState([]);

  useEffect(() => {
    axios
      .get(`https://dummyjson.com/users/${id}`)
      .then((response) => {
        setUser(response.data);
      });

    axios
      .get(`https://dummyjson.com/todos/user/${id}?limit=0`)
      .then((response) => {
        setWorks(response.data.todos);
      });
  }, [id]);

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Chi tiết người dùng
      </Typography>

      <Stack
        spacing={1}
        sx={{
          p: 2,
          border: "1px solid #ddd",
          mb: 3,
        }}
      >
        <Typography>Họ tên: {user.firstName} {user.lastName}</Typography>

        <Typography>Email: {user.email}</Typography>

        <Typography>Số điện thoại: {user.phone}</Typography>
      </Stack>

      <Typography variant="h5" gutterBottom>
        Công việc của người dùng
      </Typography>

      <Stack spacing={1}>
        {works.map((work) => (
          <Box
            key={work.id}
            sx={{
              p: 2,
              border: "1px solid #ddd",
            }}
          >
            <Typography>{work.todo}</Typography>

            <Typography color="text.secondary">
              {work.completed ? "Đã hoàn thành" : "Chưa hoàn thành"}
            </Typography>
          </Box>
        ))}
      </Stack>

      <Button sx={{ mt: 3 }} variant="contained" onClick={() => navigate("/nguoi-dung")}>Quay lại</Button>
    </Box>
  );
}