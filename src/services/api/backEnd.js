import axios from 'axios'


export default {
    postCalls(route, data, config) {
        console.log(data)
        console.log(config)
        return axios.post('http://10.64.92.213:8883' + route, data, config)
            .then(response => {
                console.log(response)
                return response;
            })
    },
    getCalls(route, config) {
        // console.log(headers)
        return axios.get('http://10.64.92.213:8883' + route, config)
            .then(response => {
                return response
            })
    },
    deleteCalls(route, headers) {
        return axios.delete('http://10.64.92.213:8883' + route, headers)
            .then(response => {
                return response;
            })
    },
    putCalls(route, data, headers) {
        return axios.put('http://10.64.92.213:8883' + route, data, headers)
            .then(response => {
                return response;
            })
    }
}
