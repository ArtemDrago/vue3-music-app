<template>
    <audio v-bind:src="song.songSrc" preload="auto" class="audio" autoplay  ref="audioPlayer"
      @ended="next"
      @timeupdate="updateProgress" />  
    <div class="container">
        <div class="header">
            
            <div class="title-app"> Music App</div>
            <button class="btn-back" v-on:click="goback">Back</button>
        </div>
        <div>
            <div class="image-container">
               <img class="image-full" v-bind:src="song.src" />
            </div>
            <div class="content">
                <span class="text">{{ song.name }}</span>
                <span class="text-content">{{ song.artistName }} - {{ song.albumName }} ({{ song.year }})</span>

            </div>
         </div>

         <div class="setting">
            <span class="time"> {{ this.timeCurMin }}:{{ this.timeCurSec }} </span>
              <div class="progress-conteiner" @click="setProgress">
                  <div class="progress" ref="progress" id="prog" ></div>
              </div>
         <span class="time" v-if="isNaN(this.current) != true"> {{ this.timeDurationMin }}:{{ this.timeDurationSec }} </span>
         <span class="time" v-else>0:00 </span>
         </div>

         <div class="button-container">
                <button class="btn-setting" @click="previous">
                   <fa-icon icon="backward" class="icons"/>
                </button>
                <button class="btn-play"
                    @click="togglePlay"
                >
                <fa-icon icon="pause" class="icons-play icons" v-if="isPlaying"/>
                  <fa-icon icon="play" class="icons-play icons" v-else/>
                </button>
                <button class="btn-setting" @click="next">
                   <fa-icon icon="forward" class="icons"/>
                </button>
         </div>

           <div class="vol-container" >
                  <div class="volcont" @click="vollum">
                  <fa-icon icon="volume-high" class="icons" v-if="volume"/>
                  <fa-icon icon="volume-xmark" class="icons" v-else/>
                  </div>
                  <div class="progress-volume" @click="setVolProgress">
                  <div class="progress-vol"  ></div>
                  </div>
                  
            </div>
      </div>
         
    
</template>

<script>
export default {
    data () {
        return {
            isPlaying: true,
            timeCurMin : 0 ,
            timeCurSec: '00',
            timeDurationMin: 0,
            timeDurationSec: '00' ,
            current: '' ,
            volume: true ,
            vlumeProgress: 50,
            volAllProgress: 50,
        }
    },
    name: 'SongPlayer',
    props: {
        song: {
            id: Number,
            name: String,
            artistName: String,
            albumName: String,
            year: Number,
            src: String,
            songSrc: String
         },
      },
      emits: ['goback', 'next', 'previous'],

      methods: {
         vollum() {
         const prg = document.querySelector('.progress-vol')
         const w = document.querySelector('.audio')
      if (this.volume == true ) {
            
            w.volume = 0
            prg.style.width = `${0}%`
            this.volAllProgress = 0
         
            
      } 
      const volCur = this.vlumeProgress / 100
         if (this.volume == false) {
               w.volume = volCur
               const pug = volCur * 100
               prg.style.width = `${pug}%`
               this.volAllProgress = pug
         }
      this.volume = !this.volume
         },

         setVolProgress(e) {
               const d = document.querySelector('.progress-volume')
               const width = d.clientWidth
               const clickX = e.offsetX
               this.volAllProgress = clickX
               const w = document.querySelector('.audio')
               w.volume = ( clickX / width )
               const prg = document.querySelector('.progress-vol')
               const progressProcent = Math.floor(( clickX / width ) * 100)
               prg.style.width = `${progressProcent}%`
               this.vlumeProgress = progressProcent
               this.volume = true
      
         },
          
         //////////////////////////////////////////////
         goback () {
            this.$emit('goback');
         },
         togglePlay () {
            if (this.isPlaying) {
               this.$refs.audioPlayer.pause();
            } else {
               this.$refs.audioPlayer.play();
            }
            this.isPlaying = !this.isPlaying;
         },
         next () {
            this.isPlaying = true
            this.$emit('next');
            
         },
         previous () {
            this.isPlaying = true
            this.$emit('previous');
            
         },
         setProgress(e) {
         const d = document.querySelector('.progress-conteiner')
         const width = d.clientWidth
         const clickX = e.offsetX
         const w = document.querySelector('.audio')
         const duration = w.duration
         w.currentTime = ( clickX / width ) * duration
         },
         
      updateProgress(e ) {
         const {duration , currentTime} = e.srcElement
         const progressProcent = Math.floor(( currentTime / duration ) * 100)
         let timer = Math.floor(currentTime)
         this.current = duration
         this.timeDurationMin = Math.floor(duration / 60)

   if ( Math.floor( duration % 60 ) < 10 ) {
      this.timeDurationSec = `0` + `${Math.floor(duration % 60)}`
   } else {
   this.timeDurationSec = Math.floor(duration % 60)
   }

   if ( Math.floor( timer % 60 ) < 10 ) {
      this.timeCurSec = `0` + `${Math.floor(timer % 60)}`
   } else {
   this.timeCurSec = Math.floor(timer % 60)
   }
   this.timeCurMin = Math.floor(timer / 60)

         const prg = document.querySelector('.progress')
         prg.style.width = `${progressProcent}%`
         },
      },
   mounted() {
   const d = document.querySelector('.progress-vol')
   d.style.width = `${this.volAllProgress}%`
         const w = document.querySelector('.audio')
         w.volume = this.volAllProgress / 100

        
   },
}
</script>
<style scoped>
.vol-container {
display: flex;
align-items: center;
justify-content: left;
height: 25px;
width: 100%;
margin: 10px 0;
padding-left: 5px;
}
.progress-volume {
margin-left: 5px;
width: 80%;
height: 14px;
background-color: gray;
display: flex;
align-items: center;
border-radius: 10px;
padding: 0px 1px;
}
.progress-vol {
   height: 10px;
   background: rgb(32, 32, 32);
   border-radius: 5px;
}
/* //------------------------------------------------------------------------ */
.header {
display: flex;
justify-content: space-between;
align-items: center;
color: white;
width: 100%;
height: 24px;
padding: 3px;
margin-bottom: 5px;
}
.title-app {
 color: white;
   text-align: left;
   font-size: 20px;
   width: 100%;
   height: 20px;
}
.image-full {
  position: absolute;
  width: 100%;
  height: 100%;
  object-fit: cover;
  left: 0;
  top: 0;
}
.image-container {
 max-width: 100%;
   margin-bottom: 5px;
   height: 250px;
   position: relative;
   object-fit: cover;
   border-radius: 5px ;
}
.btn-back {
width: 46px;
height: 24px;
display: flex;
align-items: center;
justify-content: center;
border: 1px solid rgb(190, 184, 184);
border-radius: 5px;
background-color: rgb(175, 159, 159);
color: rgb(0, 0, 0);
margin-right: 5px;
}
.btn-back:hover {
   border: 1px solid rgb(255, 253, 253);
   background-color: rgb(68, 67, 67);
   color: rgb(255, 255, 255);
}
.content {
   display: flex;
   align-items: center;
   justify-content: center;
   flex-direction: column;
   width: 100%;
   height: 70px;
   padding: 5px 0;
}
.container {
   display: flex;
   flex-direction: column;
   min-height: 510px;
   padding: 0px 5px;
}

.text-content {
font-size: 16px;
color: rgb(99, 98, 98);
font-weight: 400;
}
.text {
font-size: 18px;
color: gray;
font-weight: 600;
margin-bottom: 5px;
}
/* ------------------------------------------------------------------------------ */
.button-container {
display: flex;
align-items: center;
justify-content: center;
height: 40px;
padding: 5px;
}
.btn-setting {
display: flex;
align-items: center;
justify-content: center;
border-radius: 5px;
width: 46px;
height: 24px;
color: #fff;
background-color: rgb(170, 64, 64);
border: 1px solid wheat;
}
.btn-setting:hover {
color: #000;
background-color: rgb(199, 113, 113);
border: 1px solid rgb(219, 165, 65);
}
.icons-play {
   font-size: 20px;
}
.btn-play {
   
width: 45px;
height: 45px;
margin: 0px 5px;
display: flex;
align-items: center;
justify-content: center;
border-radius: 50%;
background-color: rgb(170, 64, 64);
border: 1px solid gray;

}
.btn-play:hover {
color: rgb(0, 0, 0);
background-color: rgb(199, 113, 113);
}
.icons {
   color: rgb(255, 255, 255);
   z-index: 2;
}
.icons:hover {
   color:rgb(7, 1, 59);
}
/* --------------------------------------------------------------------------------- */
.progress-conteiner {
   width: 80%;
   height: 14px;
   background: grey;
   border-radius: 10px;
   display: flex;
   align-items: center;
   padding: 0px 1px;
   
}
.progress {
   
   height: 10px;
   background: rgb(32, 32, 32);
   border-radius: 5px;
}
.setting {
   margin: 10px 0;
   height: 20px;
   display: flex;
   align-items: center;
   justify-content: space-between;
}
.time {
   font-size: 14px;
   color: #fff;
}
</style>