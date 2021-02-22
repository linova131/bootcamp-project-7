import { render } from '@testing-library/react';
import React, {Component} from 'react';
import PhotoContainer from './PhotoContainer';

const Icebergs = (props) => {

  return(
    <PhotoContainer data={props.photos}/>
  )

}

export default Icebergs;