
const sleep = ms =>
  new Promise(resolve => setTimeout(resolve, ms));

async function fetchDenganRetry(url, maxPercobaan = 4) {
  for (let percobaan = 0; percobaan < maxPercobaan; percobaan++) {
    try {
      console.log(`Percobaan ke-${percobaan + 1}`);

      const response = await fetch(url);

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      const percobaanTerakhir =
        percobaan === maxPercobaan - 1;

      if (percobaanTerakhir) {
        throw error;
      }

      const jeda = 1000 * 2 ** percobaan;

      console.log(
        `Gagal: ${error.message}. Coba lagi dalam ${jeda} ms`
      );

      await sleep(jeda);
    }
  }
}

async function main() {
  try {
    const data = await fetchDenganRetry(
      "https://jsonplaceholder.typicode.com/posts/1"
    );

    console.log("Data berhasil diambil:", data);
  } catch (error) {
    console.error("Semua percobaan gagal:", error.message);
  }
}

main();
