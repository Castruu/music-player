const stopClass = "fa fa-pause";
const playClass = "fa fa-play";
const audio = document.getElementById("audio");
const img = document.getElementById("poster");
const playIco = document.getElementById("playIco");
const seekBar = document.getElementById("time");

const currentTime = document.getElementById("current-time");
const maxTime = document.getElementById("max-time");


const album = document.getElementById("album");
const nome = document.getElementById("name");
const artist = document.getElementById("artist");

let index = 0;

const musics = [
      createMusic("stop_this_train.mp3", "continuum.jpg", "John Mayer", "Stop This Train", "Continuum", "4:52"),
      createMusic("yellow.mp3", "parachutes.jpg", "Coldplay", "Yellow", "Parachutes", "4:32"),
      createMusic("coldplay_o.mp3", "flyon.jpg", "Coldplay", "O", "Ghost Stories", "5:23"),
      createMusic("everybody_wants_to_rule_the_world.mp3", "everybody.jpg", "Tears For Fears", "Everybody Wants to Rule the World", "Songs from the Big Chair", "4:11"),
      createMusic("locked_out_of_heaven.mp3", "locked.jpg", "Bruno Mars", "Locked out of Heaven", "Unorthodox Jukebox", "3:54")
]


audio.ontimeupdate = () => {
    seekBar.value = audio.currentTime;
    currentTime.innerText = formatTime(audio.currentTime);
}

audio.onended = () => {
    fastFoward()
}

seekBar.onchange = () => {
    audio.currentTime = seekBar.value;
    audio.paused ? audio.pause() : audio.play()
}


function play() {
    if(audio.paused) {
      audio.play();
      playIco.setAttribute("class", stopClass)
    } else {
        audio.pause();
        playIco.setAttribute("class", playClass)
    }
}

function fastFoward() {
    index++;
    if(index > 4) index = 0;
    selectMusic(index)
}

function fastBackward() {
    index--;
    if(index < 0) index = 4;
    selectMusic(index)
}



function createMusic(music, image, artist, name, album, duration) {
    return {
        audio: music,
        img: image,
        artist: artist,
        name: name,
        album: album,
        duration: duration
    }
}

function selectMusic(index) {
    let music = musics[index];
    let musicName = music.audio;
    let musicImg = music.img;
    audio.setAttribute("src", "./tracks/" + musicName);
    img.setAttribute("src", "./artists/" + musicImg);
    audio.currentTime = 0;
    audio.pause();
    playIco.setAttribute("class", playClass);
    maxTime.innerText = music.duration;
    changeNames(music.artist, music.name, music.album);
}

function changeNames(musicArtist, musicName, musicAlbum) {
        album.innerText = musicAlbum;
        nome.innerText = musicName;
        artist.innerText = musicArtist;
        
}

const formatTime = function(time){
    let min = Math.floor(time / 60)
    if(min < 10){
        min = `${min}`
    }
    let sec = Math.floor(time % 60)
        if(sec < 10){
            sec = `0${sec}`
        }

        return `${min}:${sec}`
    
}