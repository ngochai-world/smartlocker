for (let i = 1; i <= 3; i++){
    if (!localStorage.getItem('box_' + i)){
        localStorage.setItem('box_'+i, JSON.stringify({
            key: 'box_' + i,
            name: 'Box ' + i,
            password: 123456,
            status: false
        }))
    }
}
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import Swal from 'sweetalert2'

import App from './App.vue'
import router from './router'

const app = createApp(App)

app.use(createPinia())
app.use(router)

app.mount('#app')

window.swal = Swal