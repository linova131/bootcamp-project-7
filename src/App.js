import React, {Component} from 'react';
import apiKey from './config';
import SearchForm from './components/SearchForm';
import Nav from './components/Nav';
import PhotoContainer from './components/PhotoContainer';

class App extends Component {
  render() {
    return (
      <div>
        <SearchForm />
        <Nav />
        <PhotoContainer />
      </div>
    );
  }
}

export default App;
