import React, { Component } from 'react';
import Movie from './Movie';
import './App.css';

class App extends Component {

  state = {};

  componentDidMount(){
    this._getMovies();
  }

  _getMovies = async () => {
    const movies = await this._callApi();
    this.setState({
      // same thing -> movies : movies
      movies
    })
  }

  _callApi = () => {
    return fetch('https://yts.am/api/v2/list_movies.json?sort_by=rating')
    .then(response => response.json())
    .then(json => json.data.movies)
    .catch(err => console.error(err))
  }

  _renderMovies = () => {
    const movies = this.state.movies.map(movies => {
      return (
        <Movie 
          title={movies.title_long} 
          poster={movies.medium_cover_image}
          genres={movies.genres}
          synopsis={movies.synopsis}
          key={movies.id} />
      )
    })
    return movies
  }

  render() {
    const { movies } = this.state;
    return (
      <div className={movies ? "App" : "App--loading"}>
        {movies ? this._renderMovies() : 'LOADING!!'}
      </div>
    );
  }
}

export default App;
