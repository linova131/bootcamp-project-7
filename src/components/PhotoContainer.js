import React, {Component} from 'react';
import Photo from './Photo';
import {withRouter} from 'react-router';

const PhotoContainer = (props) => {

  const urlTerm = props.match.params.searchterm;
  const photoData = props.data;
  const searchTerm = props.title;
  let photos = [];

  //Changes the API information into photo items
  photos = photoData.map(photo =>
      <Photo server={photo.server} id={photo.id} secret={photo.secret} title={photo.title} key={photo.id}/>
    );

  //The logic here is to allow for users to search by copy pasting into the search bar. It compares the URL
  //params with the current searchTerm state of the app, and will rerun a search if they do not match  
  if (urlTerm === searchTerm) {
    return (
      <div className="photo-container">
        <h2>Results for {props.title}</h2>
        <ul>
        {photos}
        </ul>
      </div>
    )
  } else if (urlTerm != searchTerm && props.onSearch) {
    props.onSearch(urlTerm)
    return (
      <div className="photo-container">
      <h2>Results for {props.title}</h2>
      <ul>
      {photos}
      </ul>
    </div>
    )
  } else {
    return (
      <div className="photo-container">
      <h2>Results for {props.title}</h2>
      <ul>
      {photos}
      </ul>
    </div>
    )
  };
}

export default withRouter(PhotoContainer);