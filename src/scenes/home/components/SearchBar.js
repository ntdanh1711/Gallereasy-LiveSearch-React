import React from 'react';
import PropTypes from 'prop-types';

import styles from './Search_Bar.css';

const SearchBar = (props) => {
  const { displayValue, onInputChange, handleFetchMore, disabledFetch } = props; 
  return(
    <div className={styles.searchBar}>
      <input
        type='text'
        placeholder='Start searching for images!'
        name='querry'
        value={displayValue}
        id='search-input'
        onChange={onInputChange}
        className={styles.input}
      ></input>
      <input
        type='button'
        value='Fetch More'
        id='fetch-more'
        onClick={handleFetchMore}
        className={styles.fetchMore}
        disabled={disabledFetch}
      ></input>
    </div>
  );
}

SearchBar.propTypes = {
  displayValue: PropTypes.string,
  onInputChange: PropTypes.func,
  handleFetchMore: PropTypes.func,
  disabledFetch: PropTypes.bool
}



export default SearchBar;