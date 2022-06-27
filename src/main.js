import { createApp } from 'vue'
import App from './App.vue'
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import {  faVolumeHigh  } from '@fortawesome/free-solid-svg-icons'
import {  faVolumeXmark  } from '@fortawesome/free-solid-svg-icons'
import {  faPlay  } from '@fortawesome/free-solid-svg-icons'
import {  faPause  } from '@fortawesome/free-solid-svg-icons'
import {  faForward  } from '@fortawesome/free-solid-svg-icons'
import {  faBackward  } from '@fortawesome/free-solid-svg-icons'

//==========================================================================

const app = createApp(App)

library.add( faVolumeHigh , faVolumeXmark ,faPlay , faPause , faForward , faBackward )

app.component('fa-icon' , FontAwesomeIcon)

app.mount('#app')