import { useMemo } from "react";

export default function useBookStats(books) {
  return useMemo(() => {
    const total = books.length;
    const owned = books.filter((book) => book.status === "Milik saya").length;
    const reading = books.filter((book) => book.status === "Sedang dibaca").length;
    const wishlist = books.filter((book) => book.status === "Ingin dibeli").length;
    const authors = new Set(books.map((book) => book.author.trim().toLowerCase()).filter(Boolean));
    const statusCounts = [
      { label: "Milik saya", count: owned, color: "owned" },
      { label: "Sedang dibaca", count: reading, color: "reading" },
      { label: "Ingin dibeli", count: wishlist, color: "wishlist" },
    ];
    return { total, owned, reading, wishlist, authorCount: authors.size, statusCounts };
  }, [books]);
}
