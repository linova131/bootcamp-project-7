import React, {Component} from 'react';
import {
  BrowserRouter,
  Route,
  Switch,
  Redirect
} from 'react-router-dom';
import apiKey from './config';


//App Components
import SearchForm from './components/SearchForm';
import Nav from './components/Nav';
import Home from './components/Home';
import Fjords from './components/Fjords';
import Glaciers from './components/Glaciers';
import Icebergs from './components/Icebergs';
import NotFound from './components/NotFound';
import SearchResult from './components/SearchResult';
import PhotoContainer from './components/PhotoContainer';

class App extends Component {

  constructor() {
    super();
    this.state= {
      photos: [],
      fjordPhotos: [],
      glacierPhotos: [],
      icebergPhotos: []
    }
  }  

  componentDidMount() {
    fetch('https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=1f38b6734054154f700f8001ae0c691e&text=fjords&format=json&nojsoncallback=1&per_page=24&sort=relevance')
      .then(data=> data.json())
      .then(results=> {
        results = results.photos.photo
        this.setState({
          fjordPhotos: results
        });
      })
      .catch((error) => {
        console.log('Error with the fjord fetch',error);
      })
    
    fetch('https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=1f38b6734054154f700f8001ae0c691e&text=glaciers&format=json&nojsoncallback=1&per_page=24&sort=relevance')
      .then(data=> data.json())
      .then(results=> {
        results = results.photos.photo
        this.setState({
          glacierPhotos: results
        });
      })
      .catch((error) => {
        console.log('Error with the glacier fetch',error);
    })

    fetch('https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=1f38b6734054154f700f8001ae0c691e&text=icebergs&format=json&nojsoncallback=1&per_page=24&sort=relevance')
      .then(data=> data.json())
      .then(results=> {
        results = results.photos.photo
        this.setState({
          icebergPhotos: results
        });
      })
      .catch((error) => {
        console.log('Error with the iceberg fetch',error);
  })
  }

  performSearch = (query) => {
    fetch(`https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=1f38b6734054154f700f8001ae0c691e&text=${query}&format=json&nojsoncallback=1&per_page=24&sort=relevance`)
      .then(data=> data.json())
      .then(results=> {
        results = results.photos.photo
        this.setState({
          photos: results
        });
      })
      .then(() => <Redirect to="/" /> )
      .catch((error) => {
        console.log('Error with the fetch',error);
      })
  }

  displaySearch = (data) => {

  }

  render() {
    return (
      <BrowserRouter>
        <div>
          <SearchForm onSearch={this.performSearch}/>
          <Nav />

          <Switch>
            <Route exact path="/" render={() => <PhotoContainer data={this.state.photos} />}/>
            <Route path="/fjords" render={() => <Fjords photos={this.state.fjordPhotos} />} />
            <Route path="/icebergs" render={() => <Icebergs photos={this.state.icebergPhotos} />} />
            <Route path="/glaciers" render={() => <Glaciers photos={this.state.glacierPhotos} />} />
            <Route path="/search/:searchterm" component={SearchResult}/>
            <Route component={NotFound} />      
          </Switch>
          
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
