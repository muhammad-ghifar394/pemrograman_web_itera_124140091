import { createContext, useContext, useMemo } from "react";
import useLocalStorage from "../hooks/useLocalStorage";

const BookContext = createContext(null);
export const BOOK_STATUSES = ["Milik saya", "Sedang dibaca", "Ingin dibeli"];

export function BookProvider({ children }) {
  const [books, setBooks] = useLocalStorage("ruangbaca-books-v1", []);

  const addBook = (bookData) => {
    const newBook = {
      ...bookData,
      id: `${Date.now()}-${Math.random().toString(36).slice(2)}`,
      createdAt: new Date().toISOString(),
    };
    setBooks((current) => [newBook, ...current]);
    return newBook;
  };

  const updateBook = (id, updates) => {
    setBooks((current) => current.map((book) => book.id === id ? { ...book, ...updates, updatedAt: new Date().toISOString() } : book));
  };

  const deleteBook = (id) => setBooks((current) => current.filter((book) => book.id !== id));

  const value = useMemo(() => ({ books, addBook, updateBook, deleteBook }), [books]);
  return <BookContext.Provider value={value}>{children}</BookContext.Provider>;
}

export function useBooks() {
  const context = useContext(BookContext);
  if (!context) throw new Error("useBooks harus digunakan di dalam BookProvider.");
  return context;
}
