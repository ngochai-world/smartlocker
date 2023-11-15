import {defineStore} from "pinia";
export const useDBStore = defineStore('db', {
    state: () => ({}),
    actions: {
        async list(){
            let box1 = localStorage.getItem('box_1')
            let box2 = localStorage.getItem('box_2')
            let box3 = localStorage.getItem('box_3')
            return [strongToObject(box1),strongToObject(box2),strongToObject(box3)]
        },
        async edit(key, value){
            localStorage.setItem(key, JSON.stringify(value))
        }
    }
})

const strongToObject = (string) => {
    return JSON.parse(string)
}