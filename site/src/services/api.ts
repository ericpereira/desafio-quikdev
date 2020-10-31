import axios from 'axios'

const api = axios.create({
    baseURL: 'http://localhost/api/public' //tive que mudar para o ip da máquina localmente que roda a api, pois o android reconhece o localhost e o 127.0.0.1 como sendo local dele
})

export default api;