import React, { Component } from 'react';
import { Loading } from '../components';
import MovieCard from '../components/MovieCard';

import * as movieAPI from '../services/movieAPI';

class MovieList extends Component {
  constructor() {
    super();

    this.fetchMovies = this.fetchMovies.bind(this);

    this.state = {
      movies: [],
      loading: true,
    }
  }
  // fetchMovies() { 
  //   this.setState(
  //     { loading: true },
  //     async () => { 
  //       const data = await movieAPI.getMovies();
  //       this.setState({
  //         movies: data,
  //         loading: false
  //       }
  //       );
  //     }
  //     );
  //   } 
  
  
  fetchMovies() {
    this.setState(
      { loading: true },
      async () => {
        const requestResponse = await movieAPI.getMovies();
        this.setState({
          movies: requestResponse,
          loading: false
        }
        );
      }

    );
  }

  // renderMovieList() {
  //   const { movies } = this.state;
  //   movies.map((movie) => <MovieCard key={movie.title} movie={movie} />)
  // }

  componentDidMount() {
    this.fetchMovies();
  }

  render() {
    const { movies, loading } = this.state;
    // console.log(this.state)


    // Render Loading here if the request is still happening

    return (
      <div data-testid="movie-list">
        {loading ?
          <Loading /> :
          movies.map((movie) => <MovieCard key={movie.title} movie={movie} />)}
      </div>
    );
  }
}

export default MovieList;
