import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';

import { Loading, MovieForm } from '../components';
import * as movieAPI from '../services/movieAPI';


class EditMovie extends Component {
  constructor(props) {
    super(props);
    this.state = {
      status: 'loading',
      shouldRedirect: false,
      movie: {},
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.fetchMovie = this.fetchMovie.bind(this)
  }

  // id: 1,
  //   title: 'Kingsglaive',
  //   subtitle: 'Final Fantasy XV',
  //   storyline: "King Regis, who oversees the land of Lucis, commands his army of soldiers to protect the kingdom from the Niflheim empire's plans to steal the sacred crystal.",
  //   rating: 4.5,
  //   imagePath: 'images/Kingsglaive_Final_Fantasy_XV.jpg',
  //   bookmarked: true,
  //   genre: 'action',

  handleSubmit(updatedMovie) {
    this.setState(
      {status: 'loading'},
      async () => {
        await movieAPI.updateMovie(updatedMovie);
        this.setState({
          shouldRedirect: true,
        })
      }
    );

  }

  fetchMovie(movieId) {
    this.setState(
      { loading: true },
      async () => {
        const requestResponse = await movieAPI.getMovie(movieId);
        this.setState({
          movie: requestResponse,
          status: 'loaded',
        });
      }
    );
  }

  componentDidMount() {
    const { id } = this.props.match.params;
    this.fetchMovie(id);
  }

  render() {
    const { status, shouldRedirect, movie } = this.state;
    if (shouldRedirect) {
      return (<Redirect to="/" />);
    }

    if (status === 'loading') {
      return (<Loading /> );
    }

    return (
      <div data-testid="edit-movie">
        <MovieForm movie={movie} onSubmit={this.handleSubmit} />
      </div>
    );
  }
}

export default EditMovie;
