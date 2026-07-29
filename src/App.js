import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import "./App.css";

import { AuthProvider } from "./context/AuthContext";
import { WorkProvider } from "./context/WorkContext";

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
      <WorkProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/cong-viec" element={<WorkList />} />
            <Route path="/cong-viec/them" element={<WorkForm />} />
            <Route path="/cong-viec/:id" element={<WorkDetail />} />
            <Route path="/nguoi-dung" element={<UserList />} />
            <Route path="/nguoi-dung/:id" element={<UserDetail />} />
          </Routes>
        </BrowserRouter>
      </WorkProvider>
    </AuthProvider>
  );
}