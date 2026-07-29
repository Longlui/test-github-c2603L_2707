import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Box, Button, Checkbox, FormControlLabel, Stack, TextField, Typography } from "@mui/material";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";
import { addWork, findSavedWork, saveWork } from "./workStorage";

export default function WorkForm({ mode }) {
  const isEditing = mode === "edit";
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);
  const [todo, setTodo] = useState("");
  const [completed, setCompleted] = useState(false);
  const [loading, setLoading] = useState(isEditing);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!isEditing) return;

    const loadWork = async () => {
      const saved = findSavedWork(id);
      if (saved) {
        setTodo(saved.todo);
        setCompleted(saved.completed);
        setLoading(false);
        return;
      }

      try {
        const { data } = await axios.get(`https://dummyjson.com/todos/${id}`);
        setTodo(data.todo);
        setCompleted(data.completed);
      } catch {
        setError("Không thể tải công việc.");
      } finally {
        setLoading(false);
      }
    };

    loadWork();
  }, [id, isEditing]);

  const submit = async (event) => {
    event.preventDefault();
    const trimmedTodo = todo.trim();
    if (!trimmedTodo) {
      setError("Vui lòng nhập nội dung công việc.");
      return;
    }

    setSaving(true);
    setError("");
    const work = { todo: trimmedTodo, completed, userId: user?.id || 1 };

    try {
      if (isEditing) {
        await axios.put(`https://dummyjson.com/todos/${id}`, work);
        saveWork({ ...work, id: Number(id) });
      } else {
        await axios.post("https://dummyjson.com/todos/add", work);
        addWork(work);
      }
      navigate("/cong-viec");
    } catch {
      setError(isEditing ? "Không thể cập nhật công việc." : "Không thể thêm công việc.");
    } finally {
      setSaving(false);
    }
  };

  const title = isEditing ? "Chỉnh sửa công việc" : "Thêm công việc";
  const submitLabel = isEditing ? "Cập nhật" : "Lưu";

  return (
    <Box component="form" onSubmit={submit} sx={{ maxWidth: 600 }}>
      <Stack spacing={2}>
        <Typography variant="h4">{title}</Typography>
        {error && <Typography color="error">{error}</Typography>}
        {loading ? <Typography>Đang tải...</Typography> : <>
          <TextField required label="Nội dung công việc" value={todo} onChange={(event) => setTodo(event.target.value)} />
          <FormControlLabel control={<Checkbox checked={completed} onChange={(event) => setCompleted(event.target.checked)} />} label="Đã hoàn thành" />
          <Stack direction="row" spacing={1}>
            <Button type="submit" variant="contained" disabled={saving}>{saving ? "Đang lưu..." : submitLabel}</Button>
            <Button onClick={() => navigate("/cong-viec")} disabled={saving}>Hủy</Button>
          </Stack>
        </>}
      </Stack>
    </Box>
  );
}
