// src/layouts/ProntfyCoreLayouts.jsx
import React, { useState, useEffect } from "react";
import {
  FiHome,
  FiSettings,
  FiUsers,
  FiSearch,
  FiLogIn,
  FiChevronDown,
  FiMenu,
  FiLogOut,
} from "react-icons/fi";
import { Outlet, useNavigate } from "react-router-dom";
import { supabase } from "../services/supabase";
import { useAuthStore } from "../store/auth";
import "./ProntfyCoreLayouts.css";

const menuItems = [
  { key: "painel", name: "Painel", icon: <FiHome />, subMenu: [] },
  { key: "usuarios", name: "Usuários", icon: <FiUsers />, subMenu: ["Lista de Usuários", "Permissões", "Atividades"] },
  { key: "config", name: "Configurações", icon: <FiSettings />, subMenu: ["Geral", "Segurança", "Notificações"] },
];

// Mantemos apenas imagem de fundo no rotator
const rotatingImages = ["/images/fundo.jpg"];

export default function ProntfyCoreLayouts() {
  const navigate = useNavigate();
  const { user, logout, loginWithGoogle, setCreatorFlagLocal } = useAuthStore();

  const [activeMenu, setActiveMenu] = useState("Painel");
  const [expandedMenu, setExpandedMenu] = useState(null);
  const [search, setSearch] = useState("");
  const [collapsed, setCollapsed] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % rotatingImages.length);
    }, 3500);
    return () => clearInterval(interval);
  }, []);

  const handleAvatarClick = () => {
    navigate("/painel");
  };

  return (
    <div className={`prontfy-core-container ${collapsed ? "sidebar-collapsed" : ""} claro`}>
      {/* SIDEBAR */}
      <aside className={`sidebar ${collapsed ? "collapsed" : ""}`} aria-label="Barra lateral">
        <div className="logo" title="Prontfy Core">
          {/* Usamos a versão com fundo branco pensada para o menu */}
          <div className="logo-icon">
            <img src="/images/logo-symbol-white.png" alt="Logo Prontfy" className="logo-img" />
          </div>
          {!collapsed && <span>Prontfy Core</span>}
        </div>

        <div className="menu-toggle" onClick={() => setCollapsed((c) => !c)} role="button" tabIndex={0} aria-label="Alternar menu">
          <FiMenu />
        </div>

        <nav className="menu" aria-label="Menu principal">
          {menuItems.map((item) => (
            <div key={item.key}>
              <div
                role="button"
                tabIndex={0}
                onKeyDown={(e) => { if (e.key === "Enter") setActiveMenu(item.name); }}
                className={`menu-item ${activeMenu === item.name ? "active" : ""} ${collapsed ? "collapsed-item" : ""}`}
                onClick={() => setActiveMenu(item.name)}
              >
                <div className="icon-wrapper" aria-hidden="true">{item.icon}</div>
                {!collapsed && <span className="menu-text">{item.name}</span>}
                {item.subMenu.length > 0 && !collapsed && (
                  <FiChevronDown className={`chevron ${expandedMenu === item.name ? "rotated" : ""}`} />
                )}
              </div>

              {item.subMenu.length > 0 && expandedMenu === item.name && !collapsed && (
                <ul className="submenu">
                  {item.subMenu.map((sub) => (
                    <li key={sub} className="submenu-item" role="button" tabIndex={0}>{sub}</li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </nav>

        <div className="sidebar-bottom">
          <button
            className="logout-btn"
            onClick={() => {
              logout();
              navigate("/login");
            }}
            aria-label="Sair"
          >
            <FiLogOut />
            {!collapsed && <span>Sair</span>}
          </button>
        </div>
      </aside>

      {/* MAIN */}
      <main className="main-content">
        {/* TOPBAR */}
        <div className="topbar-wrapper" role="banner">
          <div className="topbar">
            <div className="search-bar" role="search">
              <FiSearch />
              <input
                type="text"
                placeholder="Pesquisar..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                aria-label="Pesquisar"
              />
            </div>

            <div className="top-actions" role="group" aria-label="Ações superiores">
              <button className="publish-btn" onClick={() => navigate("/painel")}>Publicar MOD</button>
              <button className="community-btn">Comunidade</button>

              <div className="auth-buttons" role="group" aria-label="Autenticação">
                {!user && (
                  <>
                    <button className="login-btn" onClick={() => loginWithGoogle()} title="Entrar com Google">
                      <FiLogIn /> Entrar
                    </button>

                    <button className="signup-btn" onClick={() => loginWithGoogle()}>
                      Criar Conta
                    </button>
                  </>
                )}

                {user && (
                  <div className="user-box" title={user.email}>
                    <img
                      src={user.user_metadata?.avatar_url || "/images/logo-symbol.png"}
                      alt={user.user_metadata?.full_name || user.email}
                      className="avatar"
                      onClick={handleAvatarClick}
                      style={{ cursor: "pointer" }}
                    />
                    <div style={{ display: "flex", flexDirection: "column", marginLeft: 8 }}>
                      <span className="user-name">{user.user_metadata?.full_name || user.email}</span>
                      <span className="user-email">{user.email}</span>
                    </div>

                    {!user.isCreator && (
                      <button
                        className="be-creator-btn"
                        onClick={() => {
                          const confirm = window.confirm("Ativar Modo Criador? Você poderá criar módulos e ver o Prontfy Studio.");
                          if (confirm) {
                            const { setCreatorFlagLocal } = useAuthStore.getState();
                            setCreatorFlagLocal(true);
                            navigate("/painel");
                          }
                        }}
                      >
                        Seja um Criador
                      </button>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* HERO */}
        <div className="hero-section">
          <div className="cards-container" aria-hidden="true">
            <div className="card">Criar Novo Módulo</div>
            <div className="card">AutoCore</div>
            <div className="card">DataCore</div>
            <div className="card">Analytics</div>
          </div>

          <div className="rotating-container" aria-hidden="true">
            <img
              src={rotatingImages[currentImageIndex]}
              alt="Slide do painel"
              className="rotating-image"
              draggable="false"
            />
          </div>
        </div>

        <div style={{ padding: 20, width: "100%", boxSizing: "border-box" }}>
          <Outlet />
        </div>

        <section className="below-hero-section" />

        <div className="footer-section-wrapper">
          <footer className="footer-section" role="contentinfo">
            <div className="footer-columns">
              <div>
                <h4>Produto</h4>
                <ul>
                  <li>Últimos lançamentos</li>
                  <li>Kit de Criação Visual</li>
                  <li>Estúdio</li>
                  <li>Gestão de marca</li>
                  <li>Redes sociais</li>
                </ul>
              </div>
              <div>
                <h4>Sobre</h4>
                <ul>
                  <li>Sobre o Prontfy Core</li>
                  <li>Carreiras</li>
                  <li>Impacto social</li>
                  <li>Sustentabilidade</li>
                </ul>
              </div>
              <div>
                <h4>Planos</h4>
                <ul>
                  <li>Preços</li>
                  <li>Pro</li>
                  <li>Pro+</li>
                  <li>Enterprise</li>
                </ul>
              </div>
              <div>
                <h4>Ajuda</h4>
                <ul>
                  <li>Central de Ajuda</li>
                  <li>Segurança</li>
                  <li>IA segura</li>
                </ul>
              </div>
            </div>
            <div className="footer-bottom">
              &copy; {new Date().getFullYear()} Prontfy Core. Todos os direitos reservados.
            </div>
          </footer>
        </div>
      </main>
    </div>
  );
}

