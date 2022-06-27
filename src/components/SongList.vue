<template>
    <div v-if="!isPlayerVisible">
        <div class="title-app">
             Music App
        </div>
        <div
            v-for="(song, songIndex) in data" v-bind:key="song.id"
            class="audio-container"
            v-on:click="playSong(songIndex)"
        >
            <div>
                <span class="text">{{ song.name }}</span>
                <br />
                <span class="text-content">
                    {{ song.artistName }} - 
                    <span class="text-content"> {{ song.albumName }} ({{ song.year }})</span>
                </span>
            </div>
            <div>
                <img
                    class="image  rounded"
                    v-bind:src="song.src"
                />
            </div>
        </div>
    </div>
    <div v-if="isPlayerVisible">
        <SongPlayer
            v-bind:song="data[currentSongIndex]"
            @goback="isPlayerVisible = !isPlayerVisible"
            @next="playNext"
            @previous="playPrevious"
        />
    </div>
</template>

<script>
import SongPlayer from './SongPlayer.vue';
import {list} from '../list'
export default {
    data () {
        return {
            isPlayerVisible: false,
            currentSongIndex: 0,
            data: [],
        }
    },
    created() {
      this.data = list
    },
   
    methods: {
        playSong (index) {
            this.currentSongIndex = index;
            this.isPlayerVisible = true;
        },
        playNext () {
           
            if (this.currentSongIndex < this.data.length - 1) {
                this.currentSongIndex += 1;
            } else {
                this.currentSongIndex = 0;
            }
        },
        playPrevious () {
           
            if (this.currentSongIndex != 0) {
                this.currentSongIndex -= 1;
            } else {
                this.currentSongIndex = this.data.length - 1;
            }
        } 
    },
    components: {
        SongPlayer
    },
    name: 'SongList'
}
</script>
<style scoped>
.image {
   max-height: 44px;
}
.title-app {
   color: white;
   text-align: center;
   font-size: 16px;
   width: 100%;
   height: 20px;
}
.audio-container {
   cursor: pointer;
   display: flex;
   justify-content: space-between;
   padding: 3px;
   height: 54px;
   align-items: center;
   text-align: left;
}
.audio-container:hover {
   background-color: rgba(212, 96, 41, 0.6);
}
.text {
   font-size: 20px;
   color: rgb(141, 138, 138);
}
.text-content {
   font-size: 14px;
   color: rgb(99, 97, 97);
}
</style>