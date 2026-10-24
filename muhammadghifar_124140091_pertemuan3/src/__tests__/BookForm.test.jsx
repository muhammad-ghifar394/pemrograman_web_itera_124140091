import React from "react";
import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import BookForm from "../components/BookForm/BookForm";

afterEach(() => cleanup());

describe("BookForm", () => {
  test("menampilkan pesan validasi jika judul dan penulis kosong", () => {
    render(<BookForm onSubmit={jest.fn()} onCancel={jest.fn()} />);
    fireEvent.click(screen.getByRole("button", { name: "Tambah buku" }));
    expect(screen.getByText("Judul buku wajib diisi.")).toBeTruthy();
    expect(screen.getByText("Nama penulis wajib diisi.")).toBeTruthy();
  });

  test("mengirim data ketika judul dan penulis valid", () => {
    const onSubmit = jest.fn();
    render(<BookForm onSubmit={onSubmit} onCancel={jest.fn()} />);
    fireEvent.change(screen.getByLabelText("Judul buku *"), { target: { value: "Laskar Pelangi" } });
    fireEvent.change(screen.getByLabelText("Penulis *"), { target: { value: "Andrea Hirata" } });
    fireEvent.click(screen.getByRole("button", { name: "Tambah buku" }));
    expect(onSubmit).toHaveBeenCalledWith(expect.objectContaining({
      title: "Laskar Pelangi",
      author: "Andrea Hirata",
      status: "Milik saya",
    }));
  });

  test("menolak tahun terbit yang tidak valid", () => {
    const onSubmit = jest.fn();
    render(<BookForm onSubmit={onSubmit} onCancel={jest.fn()} />);
    fireEvent.change(screen.getByLabelText("Judul buku *"), { target: { value: "Buku Uji" } });
    fireEvent.change(screen.getByLabelText("Penulis *"), { target: { value: "Penulis Uji" } });
    fireEvent.change(screen.getByLabelText("Tahun terbit"), { target: { value: "abc" } });
    fireEvent.click(screen.getByRole("button", { name: "Tambah buku" }));
    expect(screen.getByText("Masukkan tahun yang valid (4 digit).")).toBeTruthy();
    expect(onSubmit).not.toHaveBeenCalled();
  });

  test("memuat nilai awal ketika mengedit buku", () => {
    const book = { title: "Bumi", author: "Tere Liye", status: "Sedang dibaca", year: 2014, genre: "Fiksi", notes: "Catatan" };
    render(<BookForm initialBook={book} onSubmit={jest.fn()} onCancel={jest.fn()} />);
    expect(screen.getByLabelText("Judul buku *").value).toBe("Bumi");
    expect(screen.getByLabelText("Penulis *").value).toBe("Tere Liye");
    expect(screen.getByRole("button", { name: "Simpan perubahan" })).toBeTruthy();
  });

  test("memanggil callback batal", () => {
    const onCancel = jest.fn();
    render(<BookForm onSubmit={jest.fn()} onCancel={onCancel} />);
    fireEvent.click(screen.getByRole("button", { name: "Batal" }));
    expect(onCancel).toHaveBeenCalledTimes(1);
  });
});
