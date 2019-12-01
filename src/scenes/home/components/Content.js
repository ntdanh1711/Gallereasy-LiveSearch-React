import React, { PureComponent } from 'react';

import styles from './Content.css';
import Spinner from '../../../images/spinner.gif';
import ImageList from './ImageList';

class Content extends PureComponent {
  renderSearchResults = () => {
    const { imageList, handleLikeImage, handleOnImage, isSearchTab } = this.props;

    if(imageList && imageList.length > 0) {
      return (
        <div>
          <ImageList
            imageList={imageList}
            handleLikeImage={handleLikeImage}
            handleOnImage={handleOnImage}
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
export default Content;