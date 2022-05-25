
const songs = [
    {
        img: "./img/arabicnased.png",
        artistName: "Ahmed Buktahir",
        songName: "Arabic nashed",
        song:"./audio/Arabic Nasheed _ Liyakun _ Beautiful Arabic nasheed _ Ahmed Bukhatir _ liyakun nasheed(MP3_320K).mp3",
        color: "#38736d"
    },
  {   
      img: "./img/aharun.jpg",
      artistName: "yearit pitichia",
      songName: "Aharun aharun",
      song: "./audio/Ahrarun Ahrarun Arabic nasheed 2021(MP3_320K).mp3",
      color: "#f5c63d"
  },
  {
      img:"./img/ai mise duniai.jpg",
      artistName: "sadman sakib",
      songName: "ai mise duniai",
      song:"./audio/এই মিছে দুনিয়ায় তুমি থাকবা কতদিন।(MP3_160K).mp3",
      color: "#afc5c3"
  },
  {
      img: "./img/who hai mer nobi.jpg",
      artistName: "Aqib Farid",
      songName: "who hai mera nobi",
      song: "./audio/WOH HAI MERA NABI - AQIB FARID _ ABDULBASIT HASSANI (VOCALS ONLY)(MP3_320K).mp3",
      color: "#74c2dd"
  },
  {
      img: "./img/yeah allah hu.jpg",
      artistName: "qari ejaj",
      songName: "yeah allah hu",
      song: "./audio/Ya Allaho Ya Rahman(MP3_320K).mp3",
      color: "#a3b8b0"
  },
 
  {
      img: "./img/sddefault.jpg",
      artistName: "sadman sakib",
      songName: "asi go dobe ami",
      song: "./audio/আছি গো ডুবে আমি পাপেরই সাগরে _ Achi go duba ami papere Sagore _ Bangla Gojol(MP3_320K).mp3",
      color: "#a4b1b2"
  },

  {
      img: "./img/maxresdefault.jpg",
      artistName: "Tanvir evan",
      songName: "baba tumi beche",
      song: "./audio/Baba Tumi Amar Beche Thakar Karon (Lyrics) _ বাবা তুমি আমার _ Apon OST _ Tanveer Evan _ Piran Khan(MP3_160K).mp3",
      color: "#8098ce"
  },
  {
      img: "./img/lirik-sholawat-huwannur.jpg",
      artistName: "Ai khodija",
      songName: "Huwannur",
      song: "./audio/হৃদয় স্পর্ষকাতর আরাবিক গজল  । HUWANNUR । حوانور । হুয়ান্নুর । Bangla lyric । H creative studio(MP3_320K).mp3",
      color: "#1a91bd"
  }
];

const playbtn=document.querySelector(".playbtn")
const title=document.querySelector(".title")
const artist=document.querySelector(".artist_name")
const musicImage=document.querySelector(".music_img img")
const nextbtn=document.querySelector(".nextbtn")
const prevbtn=document.querySelector(".prevbtn")
const imageanimation=document.querySelector(".music_img")
const audio=document.querySelector("audio")
const startTime=document.querySelector(".start_time")
const endTime=document.querySelector(".end_time")
const volume=document.querySelector(".volume")
const progressbar=document.querySelector('.progressbar')
const progressbarContainer=document.querySelector(".progressbar_container")
const closebtn=document.querySelector(".closebtn")
const listbBtn=document.querySelector(".listbtn")
const musicListActive=document.querySelector(".music_list ")
const songlist=document.querySelector(".song_list")


let index=0
let isplaying=false


function loadtrak(index){
    audio.src=songs[index].song
    title.innerHTML=songs[index].songName
    artist.innerHTML=songs[index].artistName
    musicImage.src=songs[index].img
     
}
loadtrak(index)

const playsong=()=>{
   audio.play()
   isplaying=true
   playbtn.innerHTML=`<i class="icofont-ui-play"></i>`
   imageanimation.classList.add("play")
}
const pausesong=()=>{
    audio.pause()
    isplaying=false
    playbtn.innerHTML=`<i class="icofont-pause"></i>`
    imageanimation.classList.remove("play")
 }

playbtn.addEventListener("click",()=>{
 
        if(isplaying==false){
            playsong()
        }else{
            pausesong()
        }
     
})
nextbtn.addEventListener("click",()=>{
    if(index<songs.length-1){
        index+=1
        loadtrak(index)
        playsong()
    }else{
        index=0
        loadtrak(index)
        playsong()
    }
})
prevbtn.addEventListener("click",()=>{
    if(index>0){
        index-=1
        loadtrak(index)
        playsong()
    }else{
        index=songs.length-1
        loadtrak(index)
        playsong()
    }
})

const timeformat=(time)=>{

  return Math.floor(time/60) + ":" + ("0" + Math.floor(time%60)).slice(-2)

}
audio.addEventListener("loadedmetadata",()=>{
    startTime.innerHTML=timeformat(audio.currentTime)
    endTime.innerHTML=timeformat(audio.duration)
})
const updateprogress=()=>{
    progressbar.style.width=`
    ${(audio.currentTime/audio.duration)*100}%
    `
}
audio.addEventListener("timeupdate",()=>{
    startTime.innerHTML=timeformat(audio.currentTime)
    updateprogress()
})


volume.addEventListener("change",(e)=>{
    audio.volume=e.target.value/100
})

function setprogress(e){
    const width =this.clientWidth
    console.log(width)
    const cotainerwidth=e.offsetX
    const duration=audio.duration
     audio.currentTime=(cotainerwidth/width)*duration
}
progressbarContainer.addEventListener("click",setprogress);

(()=>{
    songs.map(e=>{
        songlist.innerHTML+=`
        <div class="song" data-song="${e.song}">
        <img src="${e.img}" alt="song">
        <h3>${e.songName}</h3>
    </div>
        `
    })
})();

const allsongs =document.querySelectorAll('.song')

allsongs.forEach((song,id)=>{
    song.addEventListener("click",()=>{
        allsongs.forEach(e=>e.classList.remove("active"))
    song.classList.add("active")
    changedata(id)
    })
    
})
function changedata(id){
    audio.src=songs[id].song
    title.innerHTML=songs[id].songName
    artist.innerHTML=songs[id].artistName
    musicImage.src=songs[id].img
    isplaying=false
    if(isplaying==false){
        playsong()
    }else{
        pausesong()
    }
}


listbBtn.addEventListener('click',()=>{
    musicListActive.classList.add("active")
})
closebtn.addEventListener('click',()=>{
    musicListActive.classList.remove("active")
})