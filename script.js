const songList = [
  {
    name: "Ghost",
    artist: "Justin Bieber",
    src: "assets/1.mp3",
    cover: "assets/1.jpg",
  },
  {
    name: "Shut Up My Mom's Calling",
    artist: "Hotel Ugly",
    src: "assets/2.mp3",
    cover: "assets/2.jpg",
  },
  {
    name: "You're Losing Me - Sped Up",
    artist: "Taylor Swift",
    src: "assets/3.mp3",
    cover: "assets/3.jpg",
  },
  {
    name: "Saturn - Sped Up",
    artist: "SZA",
    src: "assets/4.mp3",
    cover: "assets/4.jpg",
  },
  {
    name: "Small Girl",
    artist: "Lee Young Ji",
    src: "assets/5.mp3",
    cover: "assets/5.jpg",
  },
  {
    name: "I Don't Wanna Love You Anymore",
    artist: "Lany",
    src: "assets/6.mp3",
    cover: "assets/6.jpg",
  },
  {
    name: "Leave Em Alone",
    artist: "Layton Greene",
    src: "assets/7.mp3",
    cover: "assets/7.jpg",
  },
];

const artistName = document.querySelector(".artist-name");
const musicName = document.querySelector(".song-name");
const fillBar = document.querySelector(".fill-bar");
const time = document.querySelector(".time");
const cover = document.getElementById("cover");
const playBtn = document.getElementById("play");
const prevBtn = document.getElementById("prev");
const nextBtn = document.getElementById("next");
const prog = document.querySelector(".progress-bar");
const volume = document.querySelector(".volume");
const volumeControl = document.querySelector(".volumeControl");

let song = new Audio();
let currentSong = 0;
let playing = false;
let muted = false;
song.volume = 0.2;
volumeControl.value = song.volume * 100;

// console.dir(song);

document.addEventListener("DOMContentLoaded", () => {
  loadSong(currentSong);
  song.addEventListener("timeupdate", updateProgress);
  song.addEventListener("ended", nextSong);
  prevBtn.addEventListener("click", prevSong);
  nextBtn.addEventListener("click", nextSong);
  playBtn.addEventListener("click", togglePlayPause);
  prog.addEventListener("click", seek);
  volume.addEventListener("click", toggleVolume);
  volumeControl.addEventListener("change", controlVolume);
});

const controlVolume = (e) => {
  //   console.log(volumeControl.value);
  //   console.log(e.target.value);

  song.volume = e.target.value / 100;
  const adjustVolumeUnit = song.volume * 100;
  console.log(adjustVolumeUnit);

  if (adjustVolumeUnit === 0) {
    volume.classList.toggle("fa-volume-xmark");
    volume.classList.toggle("fa-volume-high");
    volume.classList.contains("fa-volume-xmark") && (song.muted = true);
  } else {
    volume.classList.contains("fa-volume-xmark") &&
      volume.classList.toggle("fa-volume-xmark");
    !volume.classList.contains("fa-volume-high") &&
      volume.classList.add("fa-volume-high");
    volume.classList.contains("fa-volume-high") && (song.muted = false);
  }
};

const loadSong = (index) => {
  const { name, artist, src, cover: thumb } = songList[index];
  artistName.innerText = artist;
  musicName.innerText = name;
  song.src = src;
  cover.style.backgroundImage = `url(${thumb})`;
};

const updateProgress = () => {
  if (song.duration) {
    const pos = (song.currentTime / song.duration) * 100;
    fillBar.style.width = `${pos}%`;

    const duration = formatTime(song.duration);
    const currentTime = formatTime(song.currentTime);
    time.innerText = `${currentTime} - ${duration}`;
  }
};

const formatTime = (seconds) => {
  const minutes = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${minutes}:${secs < 10 ? "0" : ""}${secs}`;
};

const togglePlayPause = () => {
  if (playing) {
    song.pause();
  } else {
    song.play();
  }
  playing = !playing;
  playBtn.classList.toggle("fa-pause", playing);
  playBtn.classList.toggle("fa-play", !playing);
  cover.classList.toggle("active", playing);
};

const toggleVolume = () => {
  volume.classList.toggle("fa-volume-high");
  volume.classList.contains("fa-volume-high") && (song.muted = false);

  volume.classList.toggle("fa-volume-xmark");
  volume.classList.contains("fa-volume-xmark") && (song.muted = true);
};

const nextSong = () => {
  currentSong = (currentSong + 1) % songList.length;
  playMusic();
};

const prevSong = () => {
  currentSong = (currentSong - 1 + songList.length) % songList.length;
  playMusic();
};

const playMusic = () => {
  loadSong(currentSong);
  song.play();
  playing = true;
  playBtn.classList.add("fa-pause");
  playBtn.classList.remove("fa-play");
  cover.classList.add("active");
};

const seek = (e) => {
  const pos = (e.offsetX / prog.clientWidth) * song.duration;
  song.currentTime = pos;
};
