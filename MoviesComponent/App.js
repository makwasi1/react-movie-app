import React, { useEffect, useState } from 'react'
import Header from "./Header"
import Movies from "./Movies"
import Search from "./Search"
import "./Movie.css"

const MOVIE_API_URL = "https://www.omdbapi.com/?s=man&apikey=4a3b711b"; //api thats providing our movies

const App = () => {
  const [loading, setLoading] = useState(true)
  const [movies, setMovies] = useState([])
  const [errorMessage, setErrorMessage] = useState(null)

  useEffect(() =>{
    fetch(MOVIE_API_URL)
    .then(response => response.json())
    .then(jsonResponse =>{
      setMovies(jsonResponse.Search)
      setLoading(false)
    })
  },[])

  const search = searchValue =>{
    setLoading (true)
    setErrorMessage(null)

    fetch(`https://www.omdbapi.com/?s=${searchValue}&apikey=4a3b711b`)
    .then(response => response.json())
    .then(jsonResponse =>{
      if(jsonResponse.Response === "True"){
        setMovies(jsonResponse.search)
        setLoading(false)
      } else {
        setErrorMessage(jsonResponse.Error)
        setLoading(false)
      }
    })
  }

  return(
  <div className="App">
  <Header header="UgaFlix" />
  <Search search={search} />
    <p className="App-intro">Sharing a few of our latest movies!!</p>
    <div className="movies">
      {loading && !errorMessage ? (
        <span>Loading....</span>
      ):errorMessage? (<div className=""errorMessage>{errorMessage}</div>)
      :(movies.map((movie,index)=>(<Movies key={`${index}-${movie.Title}`} movie={movie} />)))
      }
    </div>
  </div>

  )
}

export default App