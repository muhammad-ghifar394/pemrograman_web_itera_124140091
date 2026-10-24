import "./BookList.css";

function statusClass(status) {
  if (status === "Sedang dibaca") return "status-reading";
  if (status === "Ingin dibeli") return "status-wishlist";
  return "status-owned";
}

export default function BookList({ books, onEdit, onDelete }) {
  if (!books.length) {
    return <div className="empty-state"><strong>Belum ada buku yang cocok</strong><p>Coba ubah kata pencarian atau filter, atau tambahkan buku baru.</p></div>;
  }

  return (
    <div className="book-grid">
      {books.map((book) => (
        <article className="book-card" key={book.id}>
          <div className="book-card-top">
            <div className="book-symbol" aria-hidden="true">▤</div>
            <span className={`status ${statusClass(book.status)}`}>{book.status}</span>
          </div>
          <h3>{book.title}</h3>
          <div className="book-author">oleh {book.author}</div>
          <div className="book-meta">{[book.year, book.genre].filter(Boolean).join(" · ") || "Detail belum ditambahkan"}</div>
          {book.notes && <p className="book-description">{book.notes}</p>}
          <div className="card-actions">
            <button className="secondary-btn small-btn" type="button" onClick={() => onEdit(book)}>Edit</button>
            <button className="danger-btn small-btn" type="button" onClick={() => onDelete(book)}>Hapus</button>
          </div>
        </article>
      ))}
    </div>
  );
}
