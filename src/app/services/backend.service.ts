import axios, { AxiosRequestConfig } from "axios";
class BackendApiService {
    constructor(
        private readonly baseUrl: string

    ){}
    getUrl(path:string):string{

        return `${this.baseUrl}${path}`

    }
    post<T>(path: string, data?: T, config?: AxiosRequestConfig<T> | undefined){

        const url = this.getUrl(path);

        return axios.post(url, data, config);
    }
    get(path: string, config?: AxiosRequestConfig<unknown> | undefined){

        const url = this.getUrl(path);

        return axios.get(url, config);

    }
    patch<T>(path: string, data?: T, config?: AxiosRequestConfig<T> | undefined) {
        const url = this.getUrl(path);
        console.log('Making PATCH request to:', url);
    
        return axios.patch(url, data, {
            ...config,
            headers: {
                'Content-Type': 'application/json',
                ...config?.headers
            },
            withCredentials: true
        }).catch(error => {
            if (error.response) {
                throw new Error(error.response.data.message || 'Failed to update car');
            }
            throw error;
        });
    }
    delete(path: string, config?: AxiosRequestConfig) {
        const url = this.getUrl(path);
        console.log('Making DELETE request to:', url);
    
        return axios.delete(url, {
            ...config,
            headers: {
                'Content-Type': 'application/json',
                ...config?.headers
            },
            withCredentials: true
        }).catch(error => {
            if (error.response) {
                throw new Error(error.response.data.message || 'Failed to delete car');
            }
            throw error;
        });
    }
}

export const backendApiService = new BackendApiService(`https://express-dun-sigma.vercel.app/api`)


