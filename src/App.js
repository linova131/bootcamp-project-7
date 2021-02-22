import React, {Component} from 'react';
import {
  BrowserRouter,
  Route,
  Switch
} from 'react-router-dom';
import apiKey from './config';


//App Components
import SearchForm from './components/SearchForm';
import Nav from './components/Nav';
import Fjords from './components/Fjords';
import Glaciers from './components/Glaciers';
import Icebergs from './components/Icebergs';
import PhotoContainer from './components/PhotoContainer';

class App extends Component {

  constructor() {
    super();
    this.state= {
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
    fetch(`https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=1f38b6734054154f700f8001ae0c691e&text=${query}&format=json&nojsoncallback=1&per_page=24`)
      .then(data=> data.json())
      .then(results=> {
        results = results.photos.photo
        this.setState({
          photos: results
        });
      })
      .catch((error) => {
        console.log('Error with the fetch',error);
      })
  }

  render() {
    return (
      <BrowserRouter>
        <div>
          <SearchForm onSearch={this.performSearch}/>
          <Nav />
          {/* <PhotoContainer data={this.state.fjordPhotos}/> */}
          
          <Route path="/fjords" render={() => <Fjords photos={this.state.fjordPhotos} />} />
          <Route path="/icebergs" render={() => <Icebergs photos={this.state.icebergPhotos} />} />
          <Route path="/glaciers" render={() => <Glaciers photos={this.state.glacierPhotos} />} />       

        </div>
      </BrowserRouter>
    );
  }
}

export default App;
