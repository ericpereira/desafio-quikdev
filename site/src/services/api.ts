import axios from 'axios'

const api = axios.create({
    baseURL: 'http://127.0.0.1:8000' //tive que mudar para o ip da máquina localmente que roda a api, pois o android reconhece o localhost e o 127.0.0.1 como sendo local dele
})

export default api;