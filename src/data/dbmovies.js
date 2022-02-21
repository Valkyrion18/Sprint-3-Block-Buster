import { url } from '../helpers/url';

const dbmovies = () => {

  fetch(url)
      .then(response => response.json())
      .then(data => data.results)
      .catch(error => console.log(error))

  return data.results
    
}

export default dbmovies