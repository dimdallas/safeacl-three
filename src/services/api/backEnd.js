import axios from 'axios'


export default {
    postCalls(route, data, headers) {
        // console.log(data)
        // console.log(headers)
        return axios.post('http://10.64.92.213:8883' + route, data, headers)
            .then(response => {
                return response;
            })
    },
    getCalls(route, headers) {
        // console.log(headers)
        const config = {
            headers: headers
        }
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
