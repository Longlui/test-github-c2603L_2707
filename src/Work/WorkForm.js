import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import { Box, Button, TextField, Typography } from "@mui/material";
import { AuthContext } from "../context/AuthContext";
import { WorkContext } from "../context/WorkContext";

export default function WorkForm() {
  const [todo, setTodo] = useState("");

  const { user } = useContext(AuthContext);
  const { works, setWorks } = useContext(WorkContext);

  const navigate = useNavigate();

  const submit = async (event) => {
    event.preventDefault();

    const response = await axios.post(
      "https://dummyjson.com/todos/add",
      {
        todo: todo,
        completed: false,
        userId: user?.id || 1,
      }
    );

    setWorks([...works, response.data]);

    navigate("/cong-viec");
  };

  return (
    <Box component="form" onSubmit={submit}>
      <Typography variant="h4">
        Thêm công việc
      </Typography>

      <TextField
        label="Nội dung công việc"
        value={todo}
        onChange={(e) => setTodo(e.target.value)}
        fullWidth
        required
      />

      <Button
        type="submit"
        variant="contained"
      >
        Lưu
      </Button>

      <Button onClick={() => navigate("/cong-viec")}>
        Hủy
      </Button>
    </Box>
  );
}