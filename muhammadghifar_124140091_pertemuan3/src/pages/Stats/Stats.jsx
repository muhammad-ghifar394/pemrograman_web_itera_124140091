import { useBooks } from "../../context/BookContext";
import useBookStats from "../../hooks/useBookStats";
import "./Stats.css";

export default function Stats() {
  const { books } = useBooks();
  const stats = useBookStats(books);
  const maxCount = Math.max(1, ...stats.statusCounts.map((item) => item.count));
  const recent = [...books].sort((a, b) => new Date(b.createdAt || 0) - new Date(a.createdAt || 0)).slice(0, 5);

  return (
    <>
      <div className="page-heading"><div><p className="eyebrow">Ringkasan koleksi</p><h1>Statistik Buku</h1><p className="subtitle">Lihat ringkasan koleksi dan distribusi status buku yang kamu catat.</p></div></div>
      <div className="stats-grid">
        <div className="stat-card"><div className="stat-label">Total buku</div><div className="stat-value">{stats.total}</div><div className="stat-note">Jumlah seluruh catatan buku</div></div>
        <div className="stat-card"><div className="stat-label">Penulis berbeda</div><div className="stat-value">{stats.authorCount}</div><div className="stat-note">Berdasarkan nama penulis</div></div>
        <div className="stat-card"><div className="stat-label">Sudah dimiliki</div><div className="stat-value">{stats.owned}</div><div className="stat-note">Buku berstatus milik saya</div></div>
      </div>
      <div className="stats-layout">
        <section className="panel"><h2>Distribusi status</h2>
          {stats.statusCounts.map((item) => (
            <div className="bar-row" key={item.label}>
              <div className="bar-label"><span>{item.label}</span><strong>{item.count} ({stats.total ? Math.round(item.count / stats.total * 100) : 0}%)</strong></div>
              <div className="bar-track"><div className={`bar-fill bar-${item.color}`} style={{ width: `${item.count / maxCount * 100}%` }} /></div>
            </div>
          ))}
          {!stats.total && <p className="stats-empty">Tambahkan buku untuk mulai melihat statistik.</p>}
        </section>
        <section className="panel"><h2>Terakhir ditambahkan</h2>
          {recent.length ? <div className="recent-list">{recent.map((book) => <div className="recent-item" key={book.id}><div className="book-symbol">▤</div><div><strong>{book.title}</strong><span>{book.author} · {book.status}</span></div></div>)}</div> : <div className="empty-state"><strong>Belum ada data</strong><p>Buku yang kamu tambahkan akan muncul di sini.</p></div>}
        </section>
      </div>
    </>
  );
}
