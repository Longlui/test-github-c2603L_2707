import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import "./App.css";
import { AuthProvider } from "./context/AuthContext";
import Login from "./login";
import Dashboard from "./Dashboard";
import WorkList from "./Work/WorkList";
import WorkForm from "./Work/WorkForm";
import WorkDetail from "./Work/WorkDetail";
import UserList from "./User/UserList";
import UserDetail from "./User/UserDetail";

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<Navigate to="/dashboard" replace />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/cong-viec" element={<WorkList />} />
          <Route path="/cong-viec/them" element={<WorkForm mode="add" />} />
          <Route path="/cong-viec/:id" element={<WorkDetail />} />
          <Route path="/cong-viec/:id/chinh-sua" element={<WorkForm mode="edit" />} />
          <Route path="/nguoi-dung" element={<UserList />} />
          <Route path="/nguoi-dung/:id" element={<UserDetail />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}
