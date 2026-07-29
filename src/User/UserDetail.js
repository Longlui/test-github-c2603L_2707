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
      <Typography variant="h4" gutterBottom>Chi tiết người dùng</Typography>

      <Stack spacing={1}>
        <Typography>Họ tên: {user.firstName} {user.lastName}</Typography>
        <Typography>Email: {user.email}</Typography>
        <Typography>Số điện thoại: {user.phone}</Typography>
      </Stack>

      <Typography variant="h5" gutterBottom sx={{ mt: 2 }}>
        Công việc của người dùng
      </Typography>

      <Stack spacing={1}>
        {works.map((work) => (
          <Box key={work.id}>
            <Typography>{work.todo}</Typography>

            <Typography>
              {work.completed ? "Đã hoàn thành" : "Chưa hoàn thành"}
            </Typography>
          </Box>
        ))}
      </Stack>

      <Button
        variant="contained"
        sx={{ mt: 2 }}
        onClick={() => navigate("/nguoi-dung")}
      >
        Quay lại
      </Button>
    </Box>
  );
}