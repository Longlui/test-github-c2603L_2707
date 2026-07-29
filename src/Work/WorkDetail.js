import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Box, Button, Chip, Stack, Typography } from "@mui/material";
import axios from "axios";
import { findSavedWork } from "./workStorage";

export default function WorkDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [work, setWork] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadWork = async () => {
      const saved = findSavedWork(id);
      if (saved) {
        setWork(saved);
        return;
      }

      try {
        const { data } = await axios.get(`https://dummyjson.com/todos/${id}`);
        setWork(data);
      } catch {
        setError("Không thể tải chi tiết công việc.");
      }
    };

    loadWork();
  }, [id]);

  return (
    <Box sx={{ maxWidth: 600 }}>
      <Typography variant="h4" gutterBottom>Chi tiết công việc</Typography>
      {error && <Typography color="error">{error}</Typography>}
      {work && <Stack spacing={2} sx={{ p: 2, border: "1px solid #ddd", borderRadius: 1 }}>
        <Typography>{work.todo}</Typography>
        <Chip
          label={work.completed ? "Đã hoàn thành" : "Chưa hoàn thành"}
          color={work.completed ? "success" : "default"}
          sx={{ width: "fit-content" }}
        />
        <Typography color="text.secondary">Mã công việc: {work.id}</Typography>
      </Stack>}
      <Stack direction="row" spacing={1} sx={{ mt: 3 }}>
        {work && <Button variant="contained" onClick={() => navigate(`/cong-viec/${id}/chinh-sua`)}>Chỉnh sửa</Button>}
        <Button onClick={() => navigate("/cong-viec")}>Quay lại</Button>
      </Stack>
    </Box>
  );
}
