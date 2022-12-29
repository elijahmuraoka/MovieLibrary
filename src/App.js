import { useEffect, useState } from "react";
import "./App.css";
import SearchIcon from "./search.svg";
import MovieCard from "./components/MovieCard.jsx";

function App() {
    const API_KEY = "a2723861";
    const API_URL = `http://omdbapi.com?apikey=${API_KEY}`;

    const searchMovies = async (title) => {
        await fetch(`${API_URL}&s=${title}`)
            .then((response) => {
                if (!response.ok) {
                    throw new Error("Unable to retrieve data properly.");
                } else {
                    return response.json();
                }
            })
            .then((data) => {
                console.log("Movie Data: ", data.Search);
                setMovies(data.Search);
            })
            .catch((error) => {
                alert(error);
            });
    };

    const handleEnterKey = (e) => {
        if (e.key === "Enter") {
            console.log("Search icon was clicked with value: ", searchQuery);
            setSearchQuery("");
            searchMovies(searchQuery);
        }
    };

    const [movies, setMovies] = useState([]);
    const [searchQuery, setSearchQuery] = useState("");

    useEffect(() => {
        searchMovies("Batman");
    }, []);

    return (
        <div id="app">
            <h1>MovieLibrary</h1>
            <div className="search">
                <input
                    type="text"
                    placeholder="Search for movies"
                    value={searchQuery}
                    onChange={(e) => {
                        setSearchQuery(e.target.value);
                    }}
                    onKeyDown={handleEnterKey}
                />
                <img
                    src={SearchIcon}
                    alt="search icon"
                    onClick={() => {
                        console.log(
                            "Search icon was clicked with value: ",
                            searchQuery
                        );
                        setSearchQuery("");
                        searchMovies(searchQuery);
                    }}
                />
            </div>
            {movies?.length > 0 ? (
                <div className="container">
                    {movies.map((movie) => {
                        return <MovieCard key={movie.imdbID} movie={movie} />;
                    })}
                </div>
            ) : (
                <div className="empty">
                    <h2>No Movies or TV Series Found</h2>
                </div>
            )}
        </div>
    );
}

export default App;
