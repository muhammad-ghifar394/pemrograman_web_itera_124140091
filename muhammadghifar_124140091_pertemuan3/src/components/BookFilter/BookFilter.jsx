import { BOOK_STATUSES } from "../../context/BookContext";
import "./BookFilter.css";

export default function BookFilter({ search, onSearchChange, status, onStatusChange, sort, onSortChange }) {
  return (
    <div className="toolbar" aria-label="Pencarian dan filter buku">
      <div className="search-wrap">
        <span className="search-icon" aria-hidden="true">⌕</span>
        <input aria-label="Cari judul atau penulis" value={search} onChange={(event) => onSearchChange(event.target.value)} placeholder="Cari judul buku atau nama penulis..." />
      </div>
      <select aria-label="Filter status" value={status} onChange={(event) => onStatusChange(event.target.value)}>
        <option value="Semua">Semua status</option>
        {BOOK_STATUSES.map((item) => <option key={item} value={item}>{item}</option>)}
      </select>
      <select aria-label="Urutkan buku" value={sort} onChange={(event) => onSortChange(event.target.value)}>
        <option value="newest">Terbaru ditambahkan</option>
        <option value="title">Judul A–Z</option>
        <option value="author">Penulis A–Z</option>
      </select>
    </div>
  );
}
