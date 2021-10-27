import axios from "axios";

export const cancelTokenSource = axios.CancelToken.source();


const instance = axios.create({
  baseURL: "https://api.themoviedb.org/3",
  cancelToken: cancelTokenSource.token,
});



export default instance;
