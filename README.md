# 🎵 Spotify Clone

![HTML](https://img.shields.io/badge/HTML-E34F26?style=flat&logo=html5&logoColor=white)
![CSS](https://img.shields.io/badge/CSS-1572B6?style=flat&logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=flat&logo=javascript&logoColor=black)
![Vercel](https://img.shields.io/badge/Vercel-000000?style=flat&logo=vercel&logoColor=white)

A Spotify-inspired music player built with vanilla HTML, CSS, and JavaScript. Supports multiple playlists, real-time seekbar, volume control, and dynamic song loading via `info.json`.

---

## ✨ Features

- ▶️ Play / Pause / Next / Previous
- 🎵 Multiple playlist folders (cs, ncs)
- 🔊 Volume control & seekbar
- 📱 Responsive hamburger sidebar
- ⏱️ Real-time song duration display
- 🚀 Deployed on Vercel

---

## 📁 Folder Structure

```
project/
├── Song/
│   ├── ncs/
│   │   ├── info.json
│   │   └── song.mp3 ...
│   └── cs/
│       ├── info.json
│       └── song.mp3 ...
├── index.html
├── script.js
├── style.css
└── utility.css
```

---

## 🚀 Run Locally

```bash
# Clone the repo
git clone https://github.com/yourusername/spotify-clone
cd spotify-clone/project

# Open with Live Server (VS Code)
# Right click index.html → Open with Live Server
```

---

## ⚙️ How Song Loading Works

Each playlist folder contains an `info.json` file listing all songs.
This is required for Vercel deployment since directory listing is not available on static hosts.

```json
[
  "hindi-song-385015.mp3",
  "tere-bin-249449.mp3",
  "phantomz-tere-118517 (1).mp3"
]
```

---

## 🌐 Deploy on Vercel

```bash
# Push to GitHub
git add .
git commit -m "your message"
git push origin main
```

Then on Vercel:
- **Framework Preset:** Other
- **Root Directory:** `project`

Vercel auto-redeploys on every push. ✅

---

## 🛠️ Tech Stack

- HTML5
- CSS3
- Vanilla JavaScript
- Web Audio API
- Vercel (deployment)

---

## 👨‍💻 Author

Built by **Fazal Rehman** · Inspired by Spotify
