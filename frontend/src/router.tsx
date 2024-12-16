import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginView from "./views/LoginView";
import RegisterView from "./views/RegisterView";
import AuthLayouts from "./assets/AuthLayouts";

export default function Router() {
  return (
    <BrowserRouter>
        <Routes>
            <Route element={<AuthLayouts />}>
                <Route path="/auth/register" element={<RegisterView />} />
                <Route path="/auth/login" element={<LoginView />} />
            </Route>
            <Route path="/" element={<RegisterView />} />
           
            <Route path="*" element={<div>404</div>} />
        </Routes>
    </BrowserRouter>
  );
}