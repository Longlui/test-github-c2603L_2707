import { useEffect, useState } from "react";
import { Box, Stack, Typography } from "@mui/material";
import axios from "axios";
import { mergeWorks } from "./Work/workStorage";

const labels = {
  total: "Tổng số công việc",
  done: "Đã hoàn thành",
  pending: "Chưa hoàn thành",
  users: "Tổng số người dùng",
};

export default function Dashboard() {
  const [stats, setStats] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    Promise.all([
      axios.get("https://dummyjson.com/todos?limit=0"),
      axios.get("https://dummyjson.com/users?limit=0"),
    ])
      .then(([todos, users]) => {
        const works = mergeWorks(todos.data.todos);
        setStats({
          total: works.length,
          done: works.filter((work) => work.completed).length,
          pending: works.filter((work) => !work.completed).length,
          users: users.data.total,
        });
      })
      .catch(() => setError("Không thể tải số liệu."));
  }, []);

  return <><Typography variant="h4" gutterBottom>Tổng quan</Typography>{error && <Typography color="error">{error}</Typography>}<Stack direction={{ xs: "column", sm: "row" }} spacing={2} flexWrap="wrap">{Object.keys(labels).map((key) => <Box key={key} sx={{ minWidth: 200, p: 2, border: "1px solid #ddd" }}><Typography>{labels[key]}</Typography><Typography variant="h4">{stats ? stats[key] : "..."}</Typography></Box>)}</Stack></>;
}
