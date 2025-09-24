import MovieCard from "../components/MovieCard"
import { useState, useEffect } from "react";
import "../css/Home.css"
import {searchMovies, getPopularMovies} from "../services/api"

function Home() {
   const [searchQuery,setSearchQuery] = useState("");
   const [movies, setMovies] = useState([]);    
   const [error, setError] = useState(null);
   const [loading, setLoading] = useState(true)
   
   useEffect(() => {
    const loadPopularMovies = async () => {
        try{
            const popularMovies = await getPopularMovies()
            setMovies(popularMovies)
        }catch(err){
            console.log(err)
            setError("failed to load movies ...")
        }
        finally{
            setLoading(false)
        }
    }
    loadPopularMovies()

   }, [])

    const handleSearch = async (e) => {
        e.preventDefault()
        if(!searchQuery.trim()) return
        if (loading ) return 
        setLoading(true)   
        try{
            const searchResults = await searchMovies(searchQuery)
            setMovies(searchResults)
            setError(null)
        }catch(err){
            console.log(err)
            setError("Failed to search movies...")
        }
        finally{
            setLoading(false)
        }

        setSearchQuery("--------")
    };

    return (
        <div className="home">
            <form onSubmit={handleSearch} className="Search-form">
                <input 
                type="text"
                placeholder="search for movies ...." 
                className="search-input" 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                />
                <button type="submit" className="search-button">Search</button>


            </form>
                 {error && <div className="error-message">{error}</div>}
             
            {loading? <div className="loading"> 
               Loading..    
            </div>: <div className="movie-grid">
            {movies.map(movie => (
                <MovieCard movie={movie} key={movie.id}></MovieCard>
            ))}
        </div>}
        
    </div>
)
}

export default Home     