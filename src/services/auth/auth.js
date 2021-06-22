import axios from 'axios'

const API_HOST = process.env.VUE_APP_API_HOST

require('../../security/interceptors')

const forgotPassword = (data) => {
    return axios.post(`${API_HOST}/api/v1/auth/forgot-password`, data)
        .then(response => {
            return response
        })
        .catch(error => {
            return error.response
        })
}

const updatePassword = (data) => {
    return axios.post(`${API_HOST}/api/v1/auth/update-password`, data)
        .then(response => {
            return response
        })
        .catch(error => {
            return error.response
        })
}

const login = (data) => {
    return axios.post(`${API_HOST}/api/v1/auth/login`, data)
        .then(response => {
            return response
        })
        .catch(error => {
            return error.response
        })
}

const create = (data) => {
    return axios.post(`${API_HOST}/api/v1/auth/create`, data)
        .then(response => {
            return response
        })
        .catch(error => {
            return error.response
        })
}

export default {
    forgotPassword,
    updatePassword,
    login,
    create
}
