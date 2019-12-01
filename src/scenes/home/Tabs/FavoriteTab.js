import React, { PureComponent } from 'react';

import Content from '../components/Content';

class FavoriteTab extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      imageLikedList: localStorage.getItem('imageLikedList')
        ? JSON.parse(localStorage.getItem('imageLikedList'))
        : [],
    }
  }

  handleOnImage = (e) => {
    e.preventDefault();
  }

  handleLikeImage = (e, removeUrl) => {
    e.preventDefault();
    const { callbackUpdateFavorite } = this.props;
    const imageLikedList = JSON.parse(localStorage.getItem('imageLikedList'));
    const urlList = JSON.parse(localStorage.getItem('favoriteUrls'));
    if(imageLikedList.length > 0) {
      //remove liked list
      const newImageLikedList = imageLikedList.filter(img => (
        img.images.original_still.url !== removeUrl
      ));
      const newUrlList = urlList.filter(url => (
        url !== removeUrl
      ));

      localStorage.removeItem('imageLikedList');
      localStorage.removeItem('favoriteUrls');

      localStorage.setItem('imageLikedList', JSON.stringify(newImageLikedList));
      localStorage.setItem('favoriteUrls', JSON.stringify(newUrlList));
      //callback update number favorite
      callbackUpdateFavorite(newUrlList.length);

      this.setState({
        imageLikedList: newImageLikedList
      })
    }
  }

  render() {
    const { imageLikedList } = this.state;
    const errorMessage = (imageLikedList && imageLikedList.length > 0)
      ? ''
      : 'There is no image!'
    return(
      <div>
        <Content
          imageList={imageLikedList}
          handleLikeImage={this.handleLikeImage}
          handleOnImage={this.handleOnImage}
          isSearchTab={this.props.isSearchTab}
          isLoading={false}
          errorMess={errorMessage}
        />
      </div>
    );
  }
}
export default FavoriteTab;