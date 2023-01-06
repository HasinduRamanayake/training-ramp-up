import "./App.css";
import "@progress/kendo-theme-default/dist/all.css";
import { TablePage } from "./pages/tablePage";
import { Navigate, Route, Routes } from "react-router-dom";
import { RegisterPage } from "./Authentication/RegisterPage";
import { LoginPage } from "./Authentication/LoginPage";

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Navigate to="/signin" />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/home" element={<TablePage />} />
        <Route path="/signin" element={<LoginPage />} />
      </Routes>
    </div>
  );
}

export default App;
