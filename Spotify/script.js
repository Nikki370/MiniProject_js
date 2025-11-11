
async function getSongs() {
    let a = await fetch("http://127.0.0.1:5501/songs/song.html")
    let response = await a.text();

    let element = document.createElement("div")
    element.innerHTML = response;
    let as = element.getElementsByTagName("a")
    
    let songs = [];
    for (let i = 0; i < as.length; i++) {
        const element = as[i];
        if (element.href.endsWith(".mp3")) {
            songs.push(element.href.split("/songs/"))[0]
        }
    }
    return songs
}

function convertSecondsToTime(seconds) {
    if (isNaN(seconds) || seconds < 0) {
        return "00:00";
    }
    let minutes = Math.floor(seconds / 60);            // Get the full minutes
    let remainingSeconds = Math.floor(seconds % 60);   // Get the remaining seconds (rounding down)

    let formattedMinutes = String(minutes).padStart(2, '0');
    let formattedSeconds = String(remainingSeconds).padStart(2, '0');

    return `${formattedMinutes}:${formattedSeconds}`;
}


let currSong = new Audio();
const playMusic = (track, pause = false) => {
    // let audio = new Audio("/songs/" + track)
    currSong.src = track
    if (!pause) {
        currSong.play();
    }

    //song name and song duration
    let songInfo = document.querySelector(".songinfo")
    let songTime = document.querySelector(".songtime")

    songInfo.innerHTML = `${String(track).replaceAll("_", " ").replace(".mp3", "").split('/').pop()}`
    songTime.innerHTML = `00:00/00:00`
}

function convertUrl(originalUrl) {
    let baseUrl = originalUrl.substring(0, originalUrl.lastIndexOf('/'));
    let filename = originalUrl.substring(originalUrl.lastIndexOf('/') + 1).replace(/ /g, '_') + '.mp3';
    return `${baseUrl}/${filename}`;
}

let songs;
async function main() {

    // get the list of all songs
    songs = await getSongs()

    let songUL = document.querySelector(".songs").getElementsByTagName("ul")[0]
    for (const song of songs) {
        songUL.innerHTML = songUL.innerHTML + 

        `<li>
        <img src="music.svg" alt="">
                  <div class="song-info">
                    <div>${String(song).replaceAll("_", " ").replace(".mp3", "").split('/').pop()}</div>
                  </div>
                  <div class="play-now">
                    <div>play now <img src="play.svg" alt="" style="filter: invert(1);">
                    </div>
                  </div>
        </li>`

    }

    // play the first song
    let audio = new Audio(songs[1]);
    // audio.play();

    // duration of the song
    audio.addEventListener("loadeddata", () => {
        let duration = audio.duration;
    })

    // attach an event listener to each song
    Array.from(document.querySelector(".songs").getElementsByTagName("li")).forEach(e => {
        e.addEventListener('click', element = () => {
            play.src = "pause.svg"
            let songName = e.querySelector(".song-info").firstElementChild.innerHTML;
    
            // Construct the full URL for the song
            let fullUrl = 'http://127.0.0.1:5501/lists/' + songName;
        
            // Log the URL to check if it's correctly formed
            playMusic(convertUrl(fullUrl))
        })
    })

    // attach event listeners to play, next and previous
    let play = document.getElementById("play")
    play.addEventListener('click', () => {
        if (currSong.paused) {
            currSong.play()
            play.src = "pause.svg"
        } else {
            currSong.pause()
            play.src = "play.svg"
        }
    })

    //Listen for time update event
    currSong.addEventListener("timeupdate", () => {
        document.querySelector(".songtime").innerHTML = `${convertSecondsToTime(currSong.currentTime)}/${convertSecondsToTime(currSong.duration)}`
        document.querySelector(".circle").style.left = (currSong.currentTime/ currSong.duration) * 100 + "%";
    })

    // add an event listener to the seekbar
    document.querySelector(".seekbar").addEventListener("click", e => {
        let percent = (e.offsetX / e.target.getBoundingClientRect().width)
        document.querySelector(".circle").style.left = percent * 100 + "%";
        currSong.currentTime = currSong.duration * percent;
    })

    document.querySelector(".hamburger").addEventListener('click', () => {
        document.querySelector(".side-bar").style.left = 0
    })

    document.querySelector(".cross").addEventListener("click", () => {
        document.querySelector(".side-bar").style.left = "-1000px"
    })
    

    //  add an event listener to previous and next song
    let flatSongs = songs.map(songArray => songArray[0]);
    document.querySelector("#previous").addEventListener("click", () => {
        let currentFileName = currSong.src.split("/").pop(); // Extract only the file name

        // Find the index of the current song in the flattened array
        let index = flatSongs.indexOf(`http://127.0.0.1:5501/lists/${currentFileName}`);


        // if ((index - 1) >= 0) {
        // }
        playMusic(songs[index - 1])
    })

    document.querySelector("#next").addEventListener("click", () => {
        currSong.pause()
        // let index = songs.indexOf(currSong.src.split("/").slice(-1))
        let currentFileName = currSong.src.split("/").pop(); // Extract only the file name

        // Find the index of the current song in the flattened array
        let index = flatSongs.indexOf(`http://127.0.0.1:5501/lists/${currentFileName}`);

        // console.log(flatSongs, index)
        // if ((index + 1) < length) {
        // }
        playMusic(songs[index + 1])
    })

    // volume range
    document.querySelector(".range").getElementsByTagName("input")[0].addEventListener("change", (e) => {
        // setting volume to out of 100
        currSong.volume = parseInt(e.target.value, 10)/100
    })

    // add event listener to mute the track
    document.querySelector(".volBtn").addEventListener("click", () => {
        document.querySelector(".volBtn").style.display = "none"
        document.querySelector(".muteVol").style.display = "block"
        currSong.volume = 0
        document.querySelector(".range").getElementsByTagName("input")[0].value = 0
    })

    document.querySelector(".muteVol").addEventListener("click", () => {
        document.querySelector(".muteVol").style.display = "none"
        document.querySelector(".volBtn").style.display = "block"
        currSong.volume = 0.30;
        document.querySelector(".range").getElementsByTagName("input")[0].value = 30
    })

}
main()