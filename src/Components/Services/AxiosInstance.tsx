import axios,{CancelTokenSource} from "axios";

const  AxiosInstance = axios.create({
    baseURL:"http://localhost:4000",
    timeout:10000
})
 
 const cancelTokenSource:CancelTokenSource=axios.CancelToken.source();

export  {AxiosInstance,cancelTokenSource, axios};