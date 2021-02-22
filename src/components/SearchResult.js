import React from 'react';
import PhotoContainer from './PhotoContainer';

const SearchResult = ({match}) => {
  
  console.log(match.params.searchterm);

  return(
    <h2>Eventually there will be results here, how cool is that</h2>
  )
}

export default SearchResult;