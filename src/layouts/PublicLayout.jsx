import { Outlet } from "react-router-dom";

export default function PublicLayout() {
  return (
    <main style={{ padding: 32, maxWidth: 900, margin: "0 auto" }}>
      <Outlet />
    </main>
  );
}
