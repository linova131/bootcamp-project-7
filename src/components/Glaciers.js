import { render } from '@testing-library/react';
import React, {Component} from 'react';
import PhotoContainer from './PhotoContainer';

const Glaciers = (props) => {

  return(
    <PhotoContainer data={props.photos}/>
  )

}

export default Glaciers;