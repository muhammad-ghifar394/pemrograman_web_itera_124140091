
async function ambilSemuaData() {
  try {
    const [usersResponse, postsResponse] = await Promise.all([
      fetch("https://jsonplaceholder.typicode.com/users"),
      fetch("https://jsonplaceholder.typicode.com/posts")
    ]);

    if (!usersResponse.ok || !postsResponse.ok) {
      throw new Error("Gagal mengambil data dari API");
    }

    const [users, posts] = await Promise.all([
      usersResponse.json(),
      postsResponse.json()
    ]);

    const hasil = users.map(user => ({
      id: user.id,
      nama: user.name,
      email: user.email,
      jumlahPostingan: posts.filter(
        post => post.userId === user.id
      ).length
    }));

    console.log("=== HASIL GABUNGAN DATA ===");
    console.table(hasil);

    return hasil;
  } catch (error) {
    console.error("Terjadi kesalahan:", error.message);
  }
}

ambilSemuaData();
