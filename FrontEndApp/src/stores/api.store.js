import {defineStore} from "pinia";
import axios from "axios";

export const useAPIStore = defineStore('api', {
    state: () => ({
        listBox: []
    }),
    actions: {
        async list() {
            return await axios.get('http://localhost/get-list-box')
        }
    }
})