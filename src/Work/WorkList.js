import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import { Box, Button, Stack, Typography } from "@mui/material";
import { WorkContext } from "../context/WorkContext";

export default function WorkList() {
  const { works, setWorks } = useContext(WorkContext);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get(
        "https://dummyjson.com/todos?limit=0"
      );

      setWorks(response.data.todos);
    };

    fetchData();
  }, [setWorks]);

  const remove = async (id) => {
    await axios.delete(`https://dummyjson.com/todos/${id}`);

    setWorks(works.filter((work) => work.id !== id));
  };

  return (
    <Box>
      <Typography variant="h4"> Quản lý công việc</Typography>

      <Button variant="contained" onClick={() => navigate("/cong-viec/them")}>Thêm công việc</Button>
      <Stack spacing={2}>
        {works.map((work) => (
          <Box
            key={work.id}
            sx={{
              border: "1px solid black",
              padding: 2,
            }}
          >
            <Typography>{work.todo}</Typography>

            <Typography>
              {work.completed? "Đã hoàn thành": "Chưa hoàn thành"}
            </Typography>

            <Button onClick={() =>  navigate(`/cong-viec/${work.id}`)}>Chi tiết</Button>
            <Button color="error" onClick={() => remove(work.id)}>Xóa</Button>
          </Box>
        ))}
      </Stack>
    </Box>
  );
}