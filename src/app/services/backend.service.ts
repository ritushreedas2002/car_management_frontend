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



}





export const backendApiService = new BackendApiService(`http://localhost:5000/api`)


