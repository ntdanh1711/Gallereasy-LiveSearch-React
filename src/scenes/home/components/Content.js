import React, { PureComponent } from 'react';
import PropTypes from "prop-types";

import styles from './Content.css';
import Spinner from '../../../images/spinner.gif';
import ImageList from './ImageList';

class Content extends PureComponent {
  renderSearchResults = () => {
    const { imageList, handleLikeImage, isSearchTab } = this.props;

    if(imageList && imageList.length > 0) {
      return (
        <div>
          <ImageList
            imageList={imageList}
            handleLikeImage={handleLikeImage}
            isSearchTab={isSearchTab}
          />
        </div>
			)
    }
  }

  render() {
    const { isLoading, errorMess } = this.props;

    return(
      <div>
        { isLoading === true
          ? <img src={ Spinner } className={`${styles.searchLoading} ${ isLoading ? 'show' : 'hide' }`} alt="loader"/>
          : errorMess
            ? <p className={styles.message}>{ errorMess }</p>
            : this.renderSearchResults()}
      </div>
    );
  }
}

Content.propTypes = {
  isLoading: PropTypes.bool,
  errorMess: PropTypes.string,
  imageList: PropTypes.array,
  handleLikeImage: PropTypes.func,
  isSearchTab: PropTypes.bool
}

export default Content;