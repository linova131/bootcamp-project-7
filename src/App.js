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
import Home from './components/Home';
import NotFound from './components/NotFound';
import PhotoContainer from './components/PhotoContainer';

class App extends Component {

  constructor() {
    super();
    this.state= {
      photos: [],
      fjordPhotos: [],
      glacierPhotos: [],
      icebergPhotos: [],
      searchTerm: null
    }
  }  

  //Upon creation of app, the three preset searches are run and the results are saved in state
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

  //Method that will run all other searches
  performSearch = (query) => {
    fetch(`https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=1f38b6734054154f700f8001ae0c691e&text=${query}&format=json&nojsoncallback=1&per_page=24&sort=relevance`)
      .then(data=> data.json())
      .then(results=> {
        results = results.photos.photo
        this.setState({
          photos: results,
          searchTerm: query
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

          <Switch>
            <Route exact path="/" component={Home}/>
            <Route path="/fjords" render={() => <PhotoContainer title= "fjords" data={this.state.fjordPhotos} />} />
            <Route path="/icebergs" render={() => <PhotoContainer title= "icebergs" data={this.state.icebergPhotos} />} />
            <Route path="/glaciers" render={() => <PhotoContainer title="glaciers" data={this.state.glacierPhotos} />} />
            <Route path="/search/:searchterm" render={()=> <PhotoContainer title={this.state.searchTerm} data={this.state.photos} onSearch={this.performSearch}/>} />
            <Route component={NotFound} />      
          </Switch>
          
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
