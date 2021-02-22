import React, {Component} from 'react';
import Photo from './Photo';

const PhotoContainer = (props) => {

  const photoData = props.data;
  let photos = [];

  photos = photoData.map(photo =>
      <Photo server={photo.server} id={photo.id} secret={photo.secret} title={photo.title} />
    );

  return (
    <div className="photo-container">
      <h2>Results</h2>
      <ul>
      {photos}
      </ul>
    </div>
  )
}

export default PhotoContainer;