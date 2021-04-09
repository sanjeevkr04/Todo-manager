import axios from 'axios';

axios.defaults.baseURL = 'https://todo-managr.herokuapp.com/api/v1';
axios.defaults.headers.post['Content-Type'] = 'application/json'

const instance = axios.create({
    baseURL: 'https://todo-managr.herokuapp.com/api/v1',
    headers: {
        post: {
            'Content-Type': 'application/json',
        },
        common: {
            'x-access-token': localStorage.getItem('access-token')
        }
    }
})

export default instance

export const emptyData = {
    _id: '',
    title: '',
    todos: [],
    in_process: [],
    completed: [],
}

export const signIn = async (token) => {
    const data = JSON.stringify({
        token: token
    })
    const res =  await axios.post('/signin', data)
    localStorage.setItem('access-token', res.data.accessToken);
    instance.defaults.headers.common['x-access-token'] = res.data.accessToken;
}