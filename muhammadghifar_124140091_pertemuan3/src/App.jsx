import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { BookProvider } from "./context/BookContext";
import Home from "./pages/Home/Home";
import Stats from "./pages/Stats/Stats";
import "./styles.css";

export default function App() {
  return (
    <BookProvider>
      <BrowserRouter>
        <div className="app-shell">
          <header className="topbar">
            <a className="brand" href="/" aria-label="Manajemen Buku - Beranda">
              <span className="brand-icon">▤</span>
              <span>RuangBaca</span>
            </a>
            <nav aria-label="Navigasi utama">
              <a href="/">Koleksi Buku</a>
              <a href="/stats">Statistik</a>
            </nav>
          </header>
          <main className="page-container">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/stats" element={<Stats />} />
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </main>
          <footer className="footer">RuangBaca · Kelola koleksi buku pribadimu dengan mudah.</footer>
        </div>
      </BrowserRouter>
    </BookProvider>
  );
}
