import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Box, Button, Typography } from "@mui/material";
import axios from "axios";

export default function WorkDetail() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [work, setWork] = useState(null);

  useEffect(() => {
    const fetchWork = async () => {
      const response = await axios.get(
        `https://dummyjson.com/todos/${id}`
      );

      setWork(response.data);
    };

    fetchWork();
  }, [id]);

  return (
    <Box>
      <Typography variant="h4">Chi tiết công việc</Typography>

      <Typography> Nội dung: {work.todo}</Typography>

      <Typography>Trạng thái:{" "}
        {work.completed
          ? "Đã hoàn thành"
          : "Chưa hoàn thành"}
      </Typography>

      <Typography>Mã công việc: {work.id}</Typography>
      <Button onClick={() => navigate("/cong-viec")}>
        Quay lại
      </Button>
    </Box>
  );
}