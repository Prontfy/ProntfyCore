import Header from "../components/Header";
import Sidebar from "../components/Sidebar";

export default function MyLayout({ children }) {
  return (
    <div className="flex h-screen bg-gray-100">

      {/* Sidebar fixa */}
      <Sidebar />

      {/* Área principal */}
      <div className="flex flex-col flex-1">

        {/* Header */}
        <Header />

        {/* Conteúdo que muda (Body, Reader, etc) */}
        <main className="p-6 overflow-auto">
          {children}
        </main>
      </div>

    </div>
  );
}
