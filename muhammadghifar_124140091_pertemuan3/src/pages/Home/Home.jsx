import { useMemo, useState } from "react";
import BookForm from "../../components/BookForm/BookForm";
import BookList from "../../components/BookList/BookList";
import BookFilter from "../../components/BookFilter/BookFilter";
import { useBooks } from "../../context/BookContext";
import useBookStats from "../../hooks/useBookStats";
import "./Home.css";

export default function Home() {
  const { books, addBook, updateBook, deleteBook } = useBooks();
  const stats = useBookStats(books);
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("Semua");
  const [sort, setSort] = useState("newest");
  const [formOpen, setFormOpen] = useState(false);
  const [editing, setEditing] = useState(null);
  const [notice, setNotice] = useState("");

  const visibleBooks = useMemo(() => {
    const query = search.trim().toLowerCase();
    const filtered = books.filter((book) => {
      const matchesSearch = !query || book.title.toLowerCase().includes(query) || book.author.toLowerCase().includes(query);
      return matchesSearch && (status === "Semua" || book.status === status);
    });
    return [...filtered].sort((a, b) => {
      if (sort === "title") return a.title.localeCompare(b.title, "id");
      if (sort === "author") return a.author.localeCompare(b.author, "id");
      return new Date(b.createdAt || 0) - new Date(a.createdAt || 0);
    });
  }, [books, search, status, sort]);

  const openAdd = () => { setEditing(null); setFormOpen(true); setNotice(""); };
  const openEdit = (book) => { setEditing(book); setFormOpen(true); setNotice(""); };
  const saveBook = (data) => {
    if (editing) {
      updateBook(editing.id, data);
      setNotice("Perubahan buku berhasil disimpan.");
    } else {
      addBook(data);
      setNotice("Buku berhasil ditambahkan ke koleksi.");
    }
    setFormOpen(false);
    setEditing(null);
  };
  const removeBook = (book) => {
    if (window.confirm(`Hapus buku "${book.title}" dari koleksi?`)) {
      deleteBook(book.id);
      setNotice(`"${book.title}" telah dihapus.`);
    }
  };

  return (
    <>
      <div className="page-heading">
        <div><p className="eyebrow">Perpustakaan pribadi</p><h1>Koleksi Buku</h1><p className="subtitle">Catat buku yang kamu miliki, sedang baca, atau ingin dibeli. Semua data tersimpan di browser ini.</p></div>
        <button className="primary-btn" onClick={openAdd} type="button">＋ Tambah buku</button>
      </div>

      <div className="stats-grid">
        <div className="stat-card"><div className="stat-label">Total buku</div><div className="stat-value">{stats.total}</div><div className="stat-note">Semua buku di koleksi</div></div>
        <div className="stat-card"><div className="stat-label">Sedang dibaca</div><div className="stat-value">{stats.reading}</div><div className="stat-note">Buku yang sedang kamu baca</div></div>
        <div className="stat-card"><div className="stat-label">Ingin dibeli</div><div className="stat-value">{stats.wishlist}</div><div className="stat-note">Buku di daftar keinginan</div></div>
      </div>

      {notice && <div className="notice" role="status"><span>{notice}</span><button type="button" aria-label="Tutup pemberitahuan" onClick={() => setNotice("")}>×</button></div>}

      {formOpen && <section className="panel form-panel"><h2>{editing ? "Edit informasi buku" : "Tambah buku baru"}</h2><BookForm initialBook={editing} onSubmit={saveBook} onCancel={() => { setFormOpen(false); setEditing(null); }} /></section>}

      <section>
        <div className="list-heading"><h2 className="section-title">Daftar buku</h2><span className="result-count">{visibleBooks.length} dari {books.length} buku</span></div>
        <BookFilter search={search} onSearchChange={setSearch} status={status} onStatusChange={setStatus} sort={sort} onSortChange={setSort} />
        <BookList books={visibleBooks} onEdit={openEdit} onDelete={removeBook} />
      </section>
    </>
  );
}
