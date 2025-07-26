const API_KEY = "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"; // Ganti ini!

const chat = document.getElementById("chat");
const input = document.getElementById("input");

async function kirim() {
  const userMessage = input.value.trim();
  if (!userMessage) return;

  tampilkanPesan("Kamu", userMessage);
  input.value = "";

  // Tampilkan indikator mengetik
  tampilkanPesan("Bot", "Mengetik...");

  try {
    const res = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${API_KEY}`
      },
      body: JSON.stringify({
        model: "gpt-3.5-turbo",
        messages: [
          { role: "system", content: "Kamu adalah asisten pintar buatan Keza." },
          { role: "user", content: userMessage }
        ]
      })
    });

    const data = await res.json();
    const reply = data.choices?.[0]?.message?.content || "Gagal mendapatkan jawaban.";

    // Hapus indikator "mengetik..." sebelum menampilkan jawaban
    hapusPesanTerakhir();
    tampilkanPesan("Bot", reply);
  } catch (err) {
    hapusPesanTerakhir();
    tampilkanPesan("Bot", `Terjadi error: ${err.message}`);
  }
}

function tampilkanPesan(pengirim, pesan) {
  chat.innerHTML += `<b>${pengirim}:</b> ${pesan}<br>`;
  chat.scrollTop = chat.scrollHeight;
}

function hapusPesanTerakhir() {
  const baris = chat.innerHTML.trim().split("<br>");
  baris.pop(); // hapus pesan terakhir
  chat.innerHTML = baris.join("<br>") + "<br>";
}