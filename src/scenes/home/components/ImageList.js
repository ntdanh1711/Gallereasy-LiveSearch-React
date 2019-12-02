import React from 'react';
import PropTypes from 'prop-types';

import styles from './ImageList.css';
import Heart from '../../../images/heart.png';

const ImageList = (props) => {
  const { imageList, handleLikeImage, isSearchTab } = props
  return(
    <div className={styles.resultsContainer}>
      { imageList.map( image => {
        const styleOverlay = (image.liked || !isSearchTab) ? styles.overlayLiked : styles.overlay;
        const imgUrl = image.images.original_still.url
        return(
          <a key={ image.id } onClick={(e) => handleLikeImage(e, imgUrl, image)} href={ imgUrl } className={styles.resultItem}>
            <div className={styles.imageWrapper}>
              <img className={styles.image} src={ imgUrl } alt={image.title}/>
              <div id={ image.id } className={styleOverlay}>
                <img src={Heart} alt='love'></img>
              </div>
            </div>
          </a>
        )}
      )}
    </div>
  );
}

ImageList.propTypes = {
  imageList: PropTypes.array,
  handleLikeImage: PropTypes.func
}

export default ImageList;