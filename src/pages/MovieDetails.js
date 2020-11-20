import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';

import { Loading } from '../components';
import * as movieAPI from '../services/movieAPI';

class MovieDetails extends Component {
  constructor() {
    super();

    this.fetchMovie = this.fetchMovie.bind(this);
    this.deleteMovie = this.deleteMovie.bind(this);

    this.state = {
      movie: [],
      loading: true,
    };
  }

  componentDidMount() {
    const { id } = this.props.match.params;
    this.fetchMovie(id);
  }

  fetchMovie(movieId) {
    this.setState(
      { loading: true },
      async () => {
        const requestResponse = await movieAPI.getMovie(movieId);
        this.setState({
          movie: requestResponse,
          loading: false,
          shouldRedirect: false,
        });
      },
    );
  }

  async deleteMovie() {
    const { id } = this.state.movie;
    await movieAPI.deleteMovie(id);

    /* this.setState(
      { loading: true },
      async () => {
        await movieAPI.deleteMovie(id);
        this.setState({
          loading: false,
          shouldRedirect: true,
        });
      },
    ); */
  }

  render() {
    // Change the condition to check the state
    // if (true) return <Loading />;
    const { loading, shouldRedirect } = this.state;
    const { id, title, storyline, imagePath, genre, rating, subtitle } = this.state.movie;
    if (shouldRedirect) {
      return (<Redirect to="/" />);
    }

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
            <Link to="/" onClick={this.deleteMovie}>DELETAR</Link>

          </div>)
          }
      </div>
    );
  }
}

MovieDetails.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
};

export default MovieDetails;
