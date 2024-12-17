import axios, { AxiosResponse, AxiosError } from 'axios';


axios.defaults.baseURL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8081/api/';

const idle = () => new Promise(resolve => setTimeout(resolve, 100));
const responseBody = (response: AxiosResponse) => response.data;


axios.interceptors.response.use(
    async (response) => {
        await idle();
        return response;
    },
);


const requests = {
    get: (url: string) => axios.get(url).then(responseBody),
    post: (url: string, body: object) => axios.post(url, body).then(responseBody),
    put: (url: string, body: object) => axios.put(url, body).then(responseBody),
    delete: (url: string) => axios.delete(url).then(responseBody),
};

const Store = {
    list: () => requests.get('products'),
    details: (id: number) => requests.get(`products/${id}`),
};

const agent = {
    Store,
};

export default agent;
