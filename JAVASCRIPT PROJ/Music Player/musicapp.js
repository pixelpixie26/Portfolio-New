// ***********CARAOUSELS ***************

const carousel = [...document.querySelectorAll('.carousel img')];

let carouselImageIndex = 0;

const changeCarousel = () =>{
    carousel[carouselImageIndex].classList.toggle('active');

    if(carouselImageIndex >= carousel.length - 1){
        carouselImageIndex = 0;
    } else{
        carouselImageIndex++;
    }

    carousel[carouselImageIndex].classList.toggle('active');
} 

setInterval(() => {
    changeCarousel();
}, 3000);

//************ NAVIGATIONS***************


//************* Toggling Music Player 

const musicPlayerSection = document.querySelector('.music-player-section');

let clickCount = 1;

musicPlayerSection.addEventListener('click', ()=>{

    if(clickCount >= 2){
    musicPlayerSection.classList.add("active");
    clickCount=1;
    return;
    }
    clickCount++;
    setTimeout(() => {
        clickCount=1;
    }, 250);

});

//**********************Back from music player


const backToHomeBtn = document.querySelector('.music-player-section .back-btn');


backToHomeBtn.addEventListener('click',()=>{
    musicPlayerSection.classList.remove('active');
});


//**************** Access playlist


const playlistSection = document.querySelector('.playlist');
const navBtn = document.querySelector('.music-player-section .nav-btn');
const playListClickBtn = document.querySelectorAll('.playlist-card-img');


navBtn.addEventListener('click', ()=>{
    playlistSection.classList.add('active');
});

playListClickBtn.forEach(item=>{
    item.addEventListener('click', ()=>{
        playlistSection.classList.add('active');
    });
});

//******************** Back from playlist to music player

const backToMusicPlayer = document.querySelector('.playlist .back-btn');

backToMusicPlayer.addEventListener('click', ()=>{
    playlistSection.classList.remove('active');
});

//******************** Navigation done

//******************* MUSIC

let currentMusic = 0;

const music = document.querySelector("#audio-source");
console.log(music);

//Now select all buttons and seek-bar and all dynamic element

const seekBar = document.querySelector('.music-seek-bar');

const songName = document.querySelector('.current-song-name');

const artistName = document.querySelector('.artist-name');

const coverImage= document.querySelector('.cover');

const currentMusicTime = document.querySelector('.current-time');

const musicDuration = document.querySelector('.duration');
const queue = [...document.querySelectorAll('.queue')];

//*************** Select all buttons here

const forwardBtn = document.querySelector('.fa-forward');
const backwardBtn = document.querySelector('.fa-backward');
const playBtn = document.querySelector('.fas.fa-play');
console.log(playBtn);
const pauseBtn = document.querySelector('.fas.fa-pause');
console.log(pauseBtn);
const repeatBtn = document.querySelector('span.fa-redo');
repeatBtn.loop=true;
const volumeBtn = document.querySelector('span.fa-volume-up');
const volumeSlider = document.querySelector('.volume-slider');
let isPlaying = false;


//********** PlayButton Click Event

playBtn.addEventListener('click',()=>{
    music.play();
    playBtn.classList.remove('active');
    pauseBtn.classList.add('active');
    
});


//********** PauseButton Click Event

pauseBtn.addEventListener('click',()=>{
    music.pause();
    pauseBtn.classList.remove('active');
    playBtn.classList.add('active');
});


//************* Function for setting up music */

const setMusic = (i) =>{
    seekBar.value=0;
    let song= songs[i];
    currentMusic = i;
    music.src = song.path;

    songName.innerHTML = song.name;
    artistName.innerHTML = song.artist;
    coverImage.src = song.cover;

    //******set seekbar max value after some millisecond

    setTimeout(() => {
        "use strict";

        seekBar.max = music.duration; 

        music.addEventListener("loadeddata",()=>{
            musicDuration.innerHTML = formatTime(music.duration);
            console.log(formatTime(music.duration));
        });
        
        musicDuration.innerHTML = formatTime(music.duration);
    }, 300);

    currentMusicTime.innerHTML = '00:00';
    console.log("currentime"+currentMusic);
    queue.forEach(item=>item.classList.remove('active'));
    queue[currentMusic].classList.add('active');
}

setMusic(0);


//********************* Format duration in 00 : 00 format

const formatTime = (time) =>{
    let min = Math.floor(time/60);

    if(min < 10){
        min= `0` + min;
    }

    let sec = Math.floor(time % 60);
    if(sec < 10){
        sec=`0` + sec;
    }
    return `${min} : ${sec}`;
};



//**********************SEEKBAR EVENTS
//set Interval to update our seekbar


setInterval(() => {
   
        if(repeatBtn.className.includes('active')){

            setMusic(currentMusic);
            playBtn.click();

        } 
    
}, 500);
//setIntervak to update our seekbar

setInterval(() => {
    seekBar.value = music.currentTime;
    currentMusicTime.innerHTML=formatTime(music.currentTime);

    //to replay the music -- Redo button
        
    
    if(Math.floor(music.currentTime) === Math.floor(seekBar.max)){
        if(repeatBtn.className.includes('active')){

            setMusic(currentMusic);
            playBtn.click();
        } else{
            
            forwardBtn.click();
        }
    }
}, 500);

//now add Input event on seekBar 

seekBar.addEventListener('change', ()=>{
    music.currentTime = seekBar.value;
});

//************* FORWARD BUTTON

forwardBtn.addEventListener('click',()=>{
    if(currentMusic >= songs.length -1 ){
        currentMusic = 0;

    } else{
        currentMusic++;
    }
    setMusic(currentMusic);
    playBtn.click();
});

//********** BACKWARDS BUTTON */

backwardBtn.addEventListener('click',()=>{
    if(currentMusic <= 0 ){
        currentMusic = songs.length -1;

    } else{
        currentMusic--;
    }
    setMusic(currentMusic);
    playBtn.click();
});


//********************** REPEAT BUTTON 


repeatBtn.addEventListener('click', () => {
   
    repeatBtn.classList.toggle('active');

   setTimeout(() => {
    repeatBtn.classList.remove('active');
   }, 500);
   
})


// volume section

volumeBtn.addEventListener('click', () => {
    volumeBtn.classList.toggle('active');
    volumeSlider.classList.toggle('active');
})

volumeSlider.addEventListener('input', () => {
    music.volume = volumeSlider.value;
})

// ***** TO MAKE PLAYLIST FUNCTIONAL

queue.forEach((item, i) => {
    item.addEventListener('click', () => {
        setMusic(i);
     
        playBtn.click();
      // queuePauseBtn.classList.toggle('active');

    })
    
  
      
})
    


