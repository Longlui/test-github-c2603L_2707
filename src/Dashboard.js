import { useEffect, useState } from "react";
import { Box, Stack, Typography } from "@mui/material";
import axios from "axios";

const labels = {
  total: "Tổng số công việc",
  done: "Đã hoàn thành",
  pending: "Chưa hoàn thành",
  users: "Tổng số người dùng",
};

export default function Dashboard() {
  const [stats, setStats] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const todos = await axios.get(
        "https://dummyjson.com/todos?limit=0"
      );

      const users = await axios.get(
        "https://dummyjson.com/users?limit=0"
      );

      const works = todos.data.todos;

      setStats({
        total: works.length,
        done: works.filter((work) => work.completed).length,
        pending: works.filter((work) => !work.completed).length,
        users: users.data.total,
      });
    };

    fetchData();
  }, []);

  return (
    <Box>
      <Typography variant="h4">
        Tổng quan
      </Typography>

      <Stack spacing={2}>
        {Object.keys(labels).map((key) => (
          <Box
            key={key}
            sx={{
              border: "1px solid black",
              padding: 2,
            }}
          >
            <Typography>
              {labels[key]}
            </Typography>

            <Typography variant="h5">
              {stats ? stats[key] : "..."}
            </Typography>
          </Box>
        ))}
      </Stack>
    </Box>
  );
}