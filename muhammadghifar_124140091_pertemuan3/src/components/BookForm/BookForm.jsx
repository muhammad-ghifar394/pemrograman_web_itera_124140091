import { useEffect, useState } from "react";
import { BOOK_STATUSES } from "../../context/BookContext";
import "./BookForm.css";

const EMPTY_BOOK = { title: "", author: "", status: "Milik saya", year: "", genre: "", notes: "" };

export default function BookForm({ initialBook, onSubmit, onCancel }) {
  const [form, setForm] = useState(EMPTY_BOOK);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    setForm(initialBook ? {
      title: initialBook.title ?? "",
      author: initialBook.author ?? "",
      status: initialBook.status ?? "Milik saya",
      year: initialBook.year ?? "",
      genre: initialBook.genre ?? "",
      notes: initialBook.notes ?? "",
    } : EMPTY_BOOK);
    setErrors({});
  }, [initialBook]);

  const change = (event) => {
    const { name, value } = event.target;
    setForm((current) => ({ ...current, [name]: value }));
    setErrors((current) => ({ ...current, [name]: "" }));
  };

  const submit = (event) => {
    event.preventDefault();
    const nextErrors = {};
    if (!form.title.trim()) nextErrors.title = "Judul buku wajib diisi.";
    if (!form.author.trim()) nextErrors.author = "Nama penulis wajib diisi.";
    if (form.year && (!/^\d{4}$/.test(String(form.year)) || Number(form.year) < 0 || Number(form.year) > new Date().getFullYear() + 5)) {
      nextErrors.year = "Masukkan tahun yang valid (4 digit).";
    }
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length) return;
    onSubmit({
      title: form.title.trim(),
      author: form.author.trim(),
      status: form.status,
      year: form.year ? Number(form.year) : "",
      genre: form.genre.trim(),
      notes: form.notes.trim(),
    });
    setForm(EMPTY_BOOK);
  };

  return (
    <form onSubmit={submit} noValidate>
      {Object.keys(errors).length > 0 && <div className="form-error" role="alert">Periksa kembali kolom yang ditandai sebelum menyimpan.</div>}
      <div className="form-grid">
        <div className="form-group">
          <label htmlFor="book-title">Judul buku *</label>
          <input id="book-title" className="field" name="title" value={form.title} onChange={change} placeholder="Contoh: Laskar Pelangi" aria-invalid={Boolean(errors.title)} />
          {errors.title && <span className="error-text">{errors.title}</span>}
        </div>
        <div className="form-group">
          <label htmlFor="book-author">Penulis *</label>
          <input id="book-author" className="field" name="author" value={form.author} onChange={change} placeholder="Nama penulis" aria-invalid={Boolean(errors.author)} />
          {errors.author && <span className="error-text">{errors.author}</span>}
        </div>
        <div className="form-group">
          <label htmlFor="book-status">Status buku *</label>
          <select id="book-status" className="field" name="status" value={form.status} onChange={change}>
            {BOOK_STATUSES.map((status) => <option key={status} value={status}>{status}</option>)}
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="book-year">Tahun terbit</label>
          <input id="book-year" className="field" name="year" inputMode="numeric" value={form.year} onChange={change} placeholder="Contoh: 2022" maxLength={4} aria-invalid={Boolean(errors.year)} />
          {errors.year && <span className="error-text">{errors.year}</span>}
        </div>
        <div className="form-group full">
          <label htmlFor="book-genre">Kategori / genre</label>
          <input id="book-genre" className="field" name="genre" value={form.genre} onChange={change} placeholder="Misalnya: Fiksi, Teknologi, Sejarah" />
        </div>
        <div className="form-group full">
          <label htmlFor="book-notes">Catatan (opsional)</label>
          <input id="book-notes" className="field" name="notes" value={form.notes} onChange={change} placeholder="Catatan singkat tentang buku" />
        </div>
      </div>
      <div className="form-actions">
        <button className="secondary-btn" type="button" onClick={onCancel}>Batal</button>
        <button className="primary-btn" type="submit">{initialBook ? "Simpan perubahan" : "Tambah buku"}</button>
      </div>
    </form>
  );
}
