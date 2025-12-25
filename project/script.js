let currentSong  = new Audio();
let songs;
function secondsToMinutesSeconds(seconds) {
    if (isNaN(seconds) || seconds < 0) {
        return "00:00";
    }

    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = Math.floor(seconds % 60);

    const formattedMinutes = String(minutes).padStart(2, '0');
    const formattedSeconds = String(remainingSeconds).padStart(2, '0');

    return `${formattedMinutes}:${formattedSeconds}`;
}

async function getSongs(folder) {
  let a = await fetch(`${folder}`); // jaha sy ham lay rahy hm song
  let response = await a.text();
  let div = document.createElement("div");
  div.innerHTML = response;
  let as = div.getElementsByTagName("a");

  let songs = [];

  for (let index = 0; index < as.length; index++) {
    const element = as[index];
    if (element.href.endsWith(".mp3")) {
      songs.push(element.href); // keep full URL
    }
  }
let songul = document.querySelector(".Song-list ul");
songul.innerHTML=""
  songs.forEach((songUrl) => {
    // 1. Get only file name from URL
    let fileName = songUrl.split("%5CSong%5C")[1];

    // 2. Clean filename
    let displayName = fileName
      .replace(".mp3", "")
      .replace("cs%5C","")
      .replace("n","")
      .replace("ncs%5C","")
      .replaceAll("%20", " ")
      .replace(/[-(]\d+[)]?$/, "")
      .replaceAll("-", " ")
      .replace("by ashir hindi top trending viral song", "")
      .trim();
 
    // Add clickable list item
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
                        </li> `;
  });

Array.from(document.querySelector(".Song-list").getElementsByTagName("li")).forEach((element, index) => {
  element.addEventListener("click", () => {
    let displayName = element.querySelector(".info").firstElementChild.innerHTML;
    let realUrl = songs[index];

    console.log("▶ Playing:", displayName);
    console.log("🔗 URL:", realUrl);

    playMsuic(realUrl);

    // also update UI with song name
    document.querySelector(".soninfo").innerHTML = displayName;
  });
});
}

function playMsuic(audo) {
  // let audio = new Audio(audo);

  currentSong.src = audo       
  currentSong.play();
  
  play.src = "pause.svg"
  document.querySelector(".soninfo").innerHTML=
  document.querySelector(".songtime").innerHTML="12:22"
}

async function main() {
   songs = await getSongs("Song/ncs");
  console.log(songs); 

  
     
  // ✅ Play first song automatically
  
}

let play = document.querySelector("#play");
play.addEventListener("click",()=>{
   if(currentSong.paused){
      currentSong.play();
      play.src = "pause.svg"
   }
   else {
    currentSong.pause();
    play.src = "play.svg"
   }
})

currentSong.addEventListener("timeupdate",()=>{
  // console.log(currentSong.currentTime,currentSong.duration)
  document.querySelector(".songtime").innerHTML=`${secondsToMinutesSeconds(currentSong.currentTime)}/${secondsToMinutesSeconds(currentSong.duration)}`
  document.querySelector(".circle").style.left=(currentSong.currentTime/currentSong.duration)*100 + "%"
})
 document.querySelector(".seekbar").addEventListener("click", e => {
        let percent = (e.offsetX / e.target.getBoundingClientRect().width) * 100;
        document.querySelector(".circle").style.left = percent + "%";
        currentSong.currentTime = ((currentSong.duration) * percent) / 100
    });
    document.querySelector(".hmburger").addEventListener("click", () => {
        document.querySelector(".left").style.left = "0"
    })
    document.querySelector(".close").addEventListener("click", () => {
        document.querySelector(".left").style.left = "-120%"
    })
    
   document.querySelector("#previous").addEventListener("click", () => {
  let currentIndex = songs.indexOf(currentSong.src);

  if (currentIndex > 0) {
    let prevUrl = songs[currentIndex - 1];
    playMsuic(prevUrl);

    // Extract file name from URL
    let fileName = prevUrl.split("%5CSong%5C")[1] || prevUrl.split("/").pop();

    let displayName = fileName
      .replace(".mp3", "")
      .replace("ncs%5C","")
      .replaceAll("%20", " ")
      .replace(/[-(]\d+[)]?$/, "")
      .replaceAll("-", " ")
      .replace("by ashir hindi top trending viral song", "")
      .trim();

    document.querySelector(".soninfo").innerHTML = displayName;
  } else {
    console.log("🚫 No previous song");
  }
});


  document.querySelector("#next").addEventListener("click",()=>{
    
 let currentIndex = songs.indexOf(currentSong.src);

  if (currentIndex < 4) {
    let prevUrl = songs[currentIndex + 1];
    playMsuic(prevUrl);

    // Extract file name from URL
    let fileName = prevUrl.split("%5CSong%5C")[1] || prevUrl.split("/").pop();

    let displayName = fileName
      .replace(".mp3", "")
      .replace("ncs%5C"," ")
      .replaceAll("%20", " ")
      .replace(/[-(]\d+[)]?$/, "")
      .replaceAll("-", " ")
      .replace("by ashir hindi top trending viral song", "")
      .trim();

    document.querySelector(".soninfo").innerHTML = displayName;

  }
})

document.querySelector(".range").getElementsByTagName("input")[0].addEventListener("change",(e)=>{
  console.log(e.target.value )
  currentSong.volume = parseInt(e.target.value)/100;
})


 Array.from(document.getElementsByClassName("card")).forEach(e => { 
        e.addEventListener("click", async item => {
            console.log(item.currentTarget.dataset.folder,"Fetching Songs")
            songs = await getSongs(`Song/${item.currentTarget.dataset.folder}`)  
            

        })
    })


main();



   

     

// const playMusic = (track)=>{
//     // let audio = new audio("/Song/" +  track)
//     currentSong.src = "/Song/" +  track;
//     currentSong.play();
//      play.src = "play.svg"
// }

// async function main() {
    
//     let songs = await getSongs();
//     let songUL = document.querySelector(".Song-list").getElementsByTagName("ul")[0];
//     console.log(songs);
//   for (const song of songs) {
//     let fileName = decodeURIComponent(song.split("/").pop());
//    let readableName = songNameMap[fileName] || fileName.replace(".mp3", "").slice(0, 15) + "..."; // fallback if not mapped
//     songUL.innerHTML += ` <li data-file="${fileName}"> 
//                             <img src="music.svg" alt="">
//                             <div class="info">
//                                 <div>${readableName} </div>
//                              <div>artist</div>
//                             </div>
//                             <div class="play-now">
//                                 <span>Play now</span>
//                             <img class="invert" src="play.svg" alt="">
//                             </div>
//                         </li>`;
//                         //data-file="..." holds the actual file name of the song.
//     // <li>${readableName}</li>
// }

// // // `<li> ${song.replaceAll("mp3/"," ")} </li>`
// //     var audio = new Audio (songs[0]);
// //      audio.play();

// //     audio.addEventListener("loadeddata",()=>{
// //         console.log(audio.duration,audio.currentSrc,audio.currentTime)
// //     });   

//    // attached an eventlisntner for each song
//   Array.from(document.querySelector(".Song-list").getElementsByTagName("li")).forEach(e=>{
//     e.addEventListener("click",element=>{
//       const file = e.getAttribute("data-file"); // actual file name
//         playMusic(file);
//     })
    
//   })
//   // attached to eventListner for paly ,previous and next 
//   play.addEventListener("click",()=>{
//     if (currentSong.paused) {
//     currentSong.play();
//     play.src = "pause.svg"; // update icon to pause when playing
// } else {
//     currentSong.pause();
//     play.src = "play.svg"; // update icon to play when paused
// }
//   })
    
// }
