import React from 'react';

import styles from './SearchBar.css';

const SearchBar = (props) => {
  const { displayValue, onInputChange, placeHolder } = props; 
  return(
    <div className={styles.searchBar}>
      <input
        type='text'
        placeholder={placeHolder || 'Start searching for images!'}
        name='querry'
        value={displayValue}
        id='search-input'
        onChange={onInputChange}
        className={styles.input}
      ></input>
    </div>
  );
}
export default SearchBar;