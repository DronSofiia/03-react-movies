import { useState } from 'react'
import './App.css'
import SearchBar from '../SearchBar/SearchBar'
import Loader from '../ErrorMessage/Loader/Loader'
import type { Movie } from '../../types/movie';
import fetchMovies from '../../services/movieService';
import toast, { Toaster } from 'react-hot-toast';
import ErrorMessage from '../ErrorMessage/ErrorMessage';
import MovieGrid from '../MovieGrid/MovieGrid';
import MovieModal from '../MovieModal/MovieModal';

function App() {

  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [movies, setMovies] = useState<Movie[]>([]);
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);

  async function handleSearch(query:string) {
    try {
      setMovies([]);
      setError(false);
      setLoading(true);

      const data = await fetchMovies(query);

      if (data.length === 0) {
        toast.error("No movies found for your request.");
      }

      setMovies(data);
    } catch {
      setError(true);
    } finally {
      setLoading(false);
    }
  }

  return (<>
    <SearchBar onSubmit={handleSearch} />
    <Toaster/>
    
    {loading && <Loader />}
    {error && <ErrorMessage />}
    {movies.length > 0 && (<MovieGrid movies={movies} onSelect={setSelectedMovie} />)}
    {selectedMovie&&(<MovieModal movie={selectedMovie} onClose={()=> setSelectedMovie(null)}/>)}
  </>
    
  )
}

export default App
