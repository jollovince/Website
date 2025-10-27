let currentSong = null;
let progressInterval = null;

function playSong(id, element) {
  const audios = document.querySelectorAll("audio");
  const progressContainer = document.getElementById("progress-container");
  const progressBar = document.getElementById("progress-bar");

  // Make sure progress bar starts hidden
  progressContainer.style.display = "none";
  progressBar.style.width = "0%";

  // Pause and reset all songs
  audios.forEach(audio => {
    audio.pause();
    audio.currentTime = 0;
  });

  // Clear any running progress intervals
  clearInterval(progressInterval);

  // Get the selected song
  const song = document.getElementById(id);
  currentSong = song;

  // Only show progress bar when a song is played
  progressContainer.style.display = "block";
  progressBar.style.width = "0%";

  // Play song
  song.play();

  // Update progress bar in real time
  progressInterval = setInterval(() => {
    const maxPreview = 15; // 15 seconds preview limit
    const progress = Math.min((song.currentTime / maxPreview) * 100, 100);
    progressBar.style.width = progress + "%";

    // Stop after 15 seconds
    if (song.currentTime >= maxPreview) {
      song.pause();
      song.currentTime = 0;
      progressContainer.style.display = "none";
      clearInterval(progressInterval);
    }
  }, 200);

  // Hide progress bar when song naturally ends
  song.addEventListener("ended", () => {
    progressContainer.style.display = "none";
    clearInterval(progressInterval);
  });
}

// Hide progress bar immediately when the page loads
window.addEventListener("load", () => {
  const progressContainer = document.getElementById("progress-container");
  const progressBar = document.getElementById("progress-bar");
  if (progressContainer && progressBar) {
    progressContainer.style.display = "none";
    progressBar.style.width = "0%";
  }
});
