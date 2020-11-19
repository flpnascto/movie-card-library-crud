import React, { Component } from 'react';

import * as movieAPI from '../services/movieAPI';
import { Loading } from '../components';
import { Link } from 'react-router-dom';

class MovieDetails extends Component {
  constructor() {
    super();

    this.fetchMovie = this.fetchMovie.bind(this);

    this.state = {
      movie: [],
      loading: true,
    }
  }

  fetchMovie(movieId) {
    this.setState(
      { loading: true },
      async () => {
        const requestResponse = await movieAPI.getMovie(movieId);
        this.setState({
          movie: requestResponse,
          loading: false
        });
      }
    );
  }

  componentDidMount() {
    const { id } = this.props.match.params;
    this.fetchMovie(id);
  }

  render() {
    // Change the condition to check the state
    // if (true) return <Loading />;
    const { loading } = this.state
    const { id, title, storyline, imagePath, genre, rating, subtitle } = this.state.movie;

    return (
      <div data-testid="movie-details">
        {loading ?
          <Loading /> :
          (<div>
            <img alt="Movie Cover" src={`../${imagePath}`} />
            <p>{`Subtitle: ${title}`}</p>
            <p>{`Subtitle: ${subtitle}`}</p>
            <p>{`Storyline: ${storyline}`}</p>
            <p>{`Genre: ${genre}`}</p>
            <p>{`Rating: ${rating}`}</p>
            <Link to="/">VOLTAR</Link>
            <Link to={`/movies/${id}/edit`}>EDITAR</Link>

          </div>)
          }

        
      </div>
    );
  }
}

export default MovieDetails;
