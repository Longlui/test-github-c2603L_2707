import axios from "axios";
import { useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";

import { Box, Button, Stack, Typography } from "@mui/material";

import { WorkContext } from "./WorkContext";

export default function WorkList() {
  const { works, setWorks } = useContext(WorkContext);
  const navigate = useNavigate();

  const fetchData = async () => {
    const response = await axios.get(
      "https://dummyjson.com/todos?limit=0"
    );

    setWorks(response.data.todos);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const remove = async (id) => {
    if (!window.confirm("Bạn có chắc muốn xóa?")) return;

    await axios.delete(
      `https://dummyjson.com/todos/${id}`
    );

    setWorks((oldWorks) =>
      oldWorks.filter((work) => work.id !== id)
    );
  };


  return (
    <Box>

      <Stack
        direction="row"
        justifyContent="space-between"
        sx={{ mb: 2 }}
      >
        <Typography variant="h4">
          Quản lý công việc
        </Typography>

        <Button variant="contained" onClick={() => navigate("/cong-viec/them")}>
          Thêm công việc
        </Button>
      </Stack>


      <Stack spacing={2}>

        {works.map((work) => (

          <Box
            key={work.id}
            sx={{
              p: 2,
              border: "1px solid #ddd",
              borderRadius: 2,
            }}
          >

            <Typography variant="h6">
              {work.todo}
            </Typography>

            <Typography>
              Trạng thái: {work.completed ? "Đã hoàn thành" : "Chưa hoàn thành"}
            </Typography>


            <Stack direction="row" spacing={1} sx={{ mt: 2 }}>

              <Button onClick={() => navigate(`/cong-viec/${work.id}`)}>Chi tiết</Button>
              <Button onClick={() => navigate(`/cong-viec/${work.id}/chinh-sua`)}>Sửa</Button>
              <Button  onClick={() => remove(work.id)} >  Xóa</Button>
            </Stack>

          </Box>

        ))}

      </Stack>

    </Box>
  );
}