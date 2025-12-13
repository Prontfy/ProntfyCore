import { BrowserRouter, Routes, Route } from "react-router-dom";
import ProntfyCoreLayouts from "./layouts/ProntfyCoreLayouts";
import Login from "./pages/Login";

export default function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>

        {/* Página de Login — sem layout */}
        <Route path="/login" element={<Login />} />

        {/* Todas as páginas que usam o layout principal */}
        <Route path="/" element={<ProntfyCoreLayouts />}>

          {/* Página inicial (usa o layout completo) */}
          <Route index element={<></>} />

        </Route>

      </Routes>
    </BrowserRouter>
  );
}
