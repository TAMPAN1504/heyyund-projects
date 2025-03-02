document.addEventListener("DOMContentLoaded", () => {
  const startButton = document.getElementById("start-button");
  const startContainer = document.getElementById("start-container");
  const lyricsContainer = document.getElementById("lyrics-container");
  const finalMessage = document.getElementById("final-message");
  const firstLoad = document.querySelector(".first-load");
  const flowers = document.getElementById("main-content"); // Halaman main content

  const lyrics = [
      { text: "Come on", delay: 700 },
      { text: "Come on", delay: 700 },
      { text: "Come on", delay: 2000 },
      { text: "Number 1", delay: 2000 },
      { text: "Party Anthem", delay: 3900 },
      { text: "Before the moment's gone", delay: 2500 },
      { text: "Numberr 1", delay: 2000 },
      { text: "Party Anthemmm", delay: 500 },
  ];

  const songs = [
      { title: "Kemon Kemon", src: "assets/audio/kemonkemon.mp3" },
      { title: "Song 2", src: "assets/audio/spotifydown.com - Perfect.mp3" },
      { title: "Song 3", src: "assets/audio/spotifydown.com - Aku Milikmu.mp3" },
      { title: "Song 4", src: "assets/audio/spotifydown.com - I Love You So.mp3" },
      { title: "Song 5", src: "assets/audio/spotifydown.com - penjaga hati.mp3" },
  ];

  let currentSongIndex = 0;
  const audio = document.getElementById("background-audio");

  // Fungsi untuk memutar lagu berikutnya
  function playNextSong() {
      currentSongIndex++;
      if (currentSongIndex < songs.length) {
          audio.src = songs[currentSongIndex].src;
          audio.play();
      } else {
          console.log("Semua lagu sudah selesai diputar.");
      }
  }

  // Event listener untuk melanjutkan ke lagu berikutnya saat lagu selesai
  audio.addEventListener("ended", playNextSong);

  // Fungsi untuk efek fade-out
  function fadeOutElement(element, duration = 1000) {
      element.style.transition = `opacity ${duration}ms`;
      element.style.opacity = "0";

      setTimeout(() => {
          element.style.display = "none";
      }, duration);
  }

  // Fungsi untuk efek fade-in
  function fadeInElement(element, duration = 1000) {
      element.style.display = "flex"; // Tampilkan elemen
      element.style.opacity = "0";   // Mulai dari transparan
      element.style.transition = `opacity ${duration}ms`;
      setTimeout(() => {
          element.style.opacity = "1";
      }, 10);
  }

  startButton.addEventListener("click", () => {
      // Sembunyikan tombol mulai
      startContainer.style.display = "none";

      // Tampilkan lirik dan mulai audio
      lyricsContainer.style.display = "flex";
      audio.src = songs[currentSongIndex].src; // Set lagu pertama
      audio.play();

      let currentIndex = 0;

      const showNextLyric = () => {
          if (currentIndex < lyrics.length) {
              const lyric = lyrics[currentIndex].text;

              // Jika lirik adalah "Come on", "Number 1", atau "Party Anthem", tampilkan sebagai satu baris
              if (lyric === "Come on" && currentIndex < 3) {
                  // Gabungkan "Come on" menjadi satu baris
                  const line = document.getElementById("lyric-line");
                  if (!line) {
                      const newLine = document.createElement("p");
                      newLine.id = "lyric-line";
                      newLine.classList.add("lyric-line");
                      lyricsContainer.appendChild(newLine);
                  }
                  const currentLine = document.getElementById("lyric-line");
                  currentLine.textContent += lyric + " ";
              } else if (lyric === "Number 1" || lyric === "Party Anthem") {
                  // Gabungkan "Number 1" dan "Party Anthem" menjadi satu baris
                  const line = document.getElementById("number-party-line");
                  if (!line) {
                      const newLine = document.createElement("p");
                      newLine.id = "number-party-line";
                      newLine.classList.add("lyric-line");
                      lyricsContainer.appendChild(newLine);
                  }
                  const currentLine = document.getElementById("number-party-line");
                  currentLine.textContent += lyric + " ";
              } else {
                  // Untuk lirik lainnya, tampilkan seperti biasa
                  const newLyric = document.createElement("p");
                  newLyric.textContent = lyric;
                  newLyric.classList.add("lyric-line");
                  lyricsContainer.appendChild(newLyric);
              }

              setTimeout(() => {
                  currentIndex++;
                  showNextLyric();
              }, lyrics[currentIndex].delay);
          } else {
              // Setelah lirik selesai
              setTimeout(() => {
                  fadeOutElement(firstLoad, 1000); // Fade-out firstLoad (lirik)
                  setTimeout(() => {
                      fadeInElement(flowers, 1000); // Fade-in halaman flowers (main content)
                  }, 1000); // Tunggu hingga fade-out selesai
              }, 2000);
          }
      };

      showNextLyric();
  });
});




  document.addEventListener("DOMContentLoaded", () => {
    const typingText = document.querySelector(".neon-typing");
    const img = document.querySelector(".img");
    const anotherText = document.querySelector(".another-text")
  
    // Total delay 6 detik sebelum animasi dimulai
    setTimeout(() => {
      typingText.style.opacity = 1; // Menampilkan teks
      typingText.classList.add("start-typing"); // Mulai animasi typing
  
      img.style.opacity = 1; // Menampilkan gambar
      img.classList.add("start-img"); // Mulai animasi gambar
    }, 23000); // Delay 6 detik
    setTimeout(() => {
      anotherText.style.opacity = 1;
      anotherText.classList.add("start-text");
    }, 26000);
  });

  // Animasi image on scroll
  
  document.addEventListener("DOMContentLoaded", () => {
    const slideImages = document.querySelectorAll(".hidden-img");
  
    const observerOptions = {
      root: null, // Pantau viewport
      threshold: 0.1, // 10% elemen terlihat
    };
  
    const observer = new IntersectionObserver((entries, observer) => {
      entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            entry.target.style.opacity = "1";
            entry.target.style.transform = `${entry.target.dataset.transform} translateY(-5px)`; // Gabungkan transform asli dengan animasi slideUp
            entry.target.style.transition = "transform 0.8s ease, opacity 0.8s ease";
            observer.unobserve(entry.target); // Hentikan pengamatan untuk elemen ini
          }, index * 500); // Tambahkan jeda bergantian per gambar
        }
      });
    }, observerOptions);
  
    slideImages.forEach((image) => {
      // Simpan transform asli sebagai data atribut
      const originalTransform = window.getComputedStyle(image).transform || "none";
      image.dataset.transform = originalTransform;
  
      // Reset gaya awal untuk animasi
      image.style.opacity = "0";
      image.style.transform = "translateY(150px)"; // Awal slideUp
      observer.observe(image);
    });
  });
  
  
  
  

  
  