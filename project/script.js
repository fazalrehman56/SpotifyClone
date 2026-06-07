let currentSong = new Audio();
let songs = [];
let currentIndex = 0;

function secondsToMinutesSeconds(seconds) {
    if (isNaN(seconds) || seconds < 0) return "00:00";
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = Math.floor(seconds % 60);
    return `${String(minutes).padStart(2, '0')}:${String(remainingSeconds).padStart(2, '0')}`;
}

async function getSongs(folder) {
    let response = await fetch(`/${folder}/info.json`);
    let songFiles = await response.json();

    let songs = songFiles.map(file =>
        `${window.location.origin}/${folder}/${encodeURIComponent(file)}`
    );

    let songul = document.querySelector(".Song-list ul");
    songul.innerHTML = "";

    songs.forEach((songUrl, i) => {
        let displayName = songFiles[i]
            .replace(".mp3", "")
            .replaceAll("-", " ")
            .replace("by ashir hindi top trending viral song", "")
            .replace(/\(\d+\)$/, "")
            .trim();

        songul.innerHTML += `<li>
            <img src="music.svg" alt="">
            <div class="info">
                <div>${displayName}</div>
                <div>Song artist</div>
            </div>
            <div class="play-now">
                <span>Play now</span>
                <img class="invert" src="play.svg" alt="">
            </div>
        </li>`;
    });

    Array.from(document.querySelector(".Song-list").getElementsByTagName("li")).forEach((element, index) => {
        element.addEventListener("click", () => {
            let displayName = element.querySelector(".info").firstElementChild.innerHTML;
            currentIndex = index;
            playMusic(songs[index]);
            document.querySelector(".soninfo").innerHTML = displayName;
        });
    });

    return songs;
}

function playMusic(url) {
    currentSong.src = url;
    currentSong.play();
    play.src = "pause.svg";
}

async function main() {
    songs = await getSongs("Song/ncs");
    console.log("Songs loaded:", songs);
}

// Play/Pause button
let play = document.querySelector("#play");
play.addEventListener("click", () => {
    if (currentSong.paused) {
        currentSong.play();
        play.src = "pause.svg";
    } else {
        currentSong.pause();
        play.src = "play.svg";
    }
});

// Time update
currentSong.addEventListener("timeupdate", () => {
    document.querySelector(".songtime").innerHTML =
        `${secondsToMinutesSeconds(currentSong.currentTime)}/${secondsToMinutesSeconds(currentSong.duration)}`;
    if (!isNaN(currentSong.duration)) {
        document.querySelector(".circle").style.left =
            (currentSong.currentTime / currentSong.duration) * 100 + "%";
    }
});

// Seekbar click
document.querySelector(".seekbar").addEventListener("click", e => {
    if (!isNaN(currentSong.duration)) {
        let percent = (e.offsetX / e.target.getBoundingClientRect().width) * 100;
        document.querySelector(".circle").style.left = percent + "%";
        currentSong.currentTime = (currentSong.duration * percent) / 100;
    }
});

// Hamburger menu
document.querySelector(".hmburger").addEventListener("click", () => {
    document.querySelector(".left").style.left = "0";
});

document.querySelector(".close").addEventListener("click", () => {
    document.querySelector(".left").style.left = "-120%";
});

// Previous button
document.querySelector("#previous").addEventListener("click", () => {
    if (currentIndex > 0) {
        currentIndex--;
        let fileName = decodeURIComponent(songs[currentIndex].split("/").pop());
        let displayName = fileName
            .replace(".mp3", "")
            .replaceAll("-", " ")
            .replace("by ashir hindi top trending viral song", "")
            .replace(/\(\d+\)$/, "")
            .trim();
        playMusic(songs[currentIndex]);
        document.querySelector(".soninfo").innerHTML = displayName;
    } else {
        console.log("No previous song");
    }
});

// Next button
document.querySelector("#next").addEventListener("click", () => {
    if (currentIndex < songs.length - 1) {
        currentIndex++;
        let fileName = decodeURIComponent(songs[currentIndex].split("/").pop());
        let displayName = fileName
            .replace(".mp3", "")
            .replaceAll("-", " ")
            .replace("by ashir hindi top trending viral song", "")
            .replace(/\(\d+\)$/, "")
            .trim();
        playMusic(songs[currentIndex]);
        document.querySelector(".soninfo").innerHTML = displayName;
    } else {
        console.log("No next song");
    }
});

// Volume control
document.querySelector(".range").getElementsByTagName("input")[0].addEventListener("change", (e) => {
    currentSong.volume = parseInt(e.target.value) / 100;
});

// Card click - folder change
Array.from(document.getElementsByClassName("card")).forEach(e => {
    e.addEventListener("click", async item => {
        let folder = item.currentTarget.dataset.folder;
        if (!folder) return;
        songs = await getSongs(`Song/${folder}`);
        currentIndex = 0;
    });
});

main();