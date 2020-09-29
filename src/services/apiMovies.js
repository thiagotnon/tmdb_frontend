import axios from 'axios';

const apiMovies = axios.create({
  baseURL: 'https://api.themoviedb.org/3',
  headers: {
    'content-type':'application/json;charset=utf-8',
    'Authorization': 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIyNDg4NTYxNTFmOGE4NTI4MzMzMDM1Mjk3NmYzNzJmOSIsInN1YiI6IjVlYWExOTJkMDcyOTFjMDAyNWVjNmZjYyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.LrOKQrCtbx9aPlxk3kk1P84NWld4LToMl0ZepY8gHxY'
  }
});

export default apiMovies;