import React, { PureComponent } from 'react';
import axios from 'axios';

import Content from '../components/Content';
import SearchBar from '../components/SearchBar'
import services from '../services';
import unique from '../../../utils/uniqueArray';

class SearchTab extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      querry: '',
      images: [],
      errorMessage: '',
      count: 0,
      offset: 0,
      limit: 8,
      loading: false,
      renderSearchTab: true,
      imageUrlList: localStorage.getItem('favoriteUrls')
        ? JSON.parse(localStorage.getItem('favoriteUrls'))
        : [],
      imageLikedList: [],
      rerender: 0
    }

    this.cancel = '';
  }

  onInputChange = (event) => {
    const querry = event.target.value;
    if(!querry) {
      this.setState({ querry, images: [], limit: 8 });
    } else {
      this.setState({ querry, loading: true, limit: 8 }, () => {
        this.fetchSearchResult(querry)
      });
    }
  }

  fetchSearchResult = (querry) => {
    const { offset, limit }  = this.state;

    if( this.cancel ) {
			this.cancel.cancel();
		}
    this.cancel = axios.CancelToken.source();

    const querryObject = { querry, offset, limit };
    services.fetchImageList(querryObject, this.cancel.token, this.onSuccess, this.onFail);
  }

  onSuccess = (imageList) => {
    const errorMessage = imageList.data.length === 0
      ? 'There are no more search results. Please try a new search'
      : '';
    return this.setState({
      images: imageList.data,
      errorMessage,
      count: imageList.pagination.count,
      offset: imageList.pagination.offset,
      loading: false
    });
  }

  onFail = (error) => {
    return this.setState({
      loading: false,
      errorMessage: error.message || 'Fail to fetch data.Please check the network!'
    })
  }

  handleLikeImage = (e, imageUrl, imageObject)  => {
    e.preventDefault();
    const { callbackUpdateFavorite } = this.props;
    const urlList = JSON.parse(localStorage.getItem('favoriteUrls'));
    const imageList = JSON.parse(localStorage.getItem('imageLikedList'));

    if(urlList && urlList.length > 0) {
      const newUrlList = unique.uniqueArray([...urlList, imageUrl]);
      const isUnique = unique.checkUniqueArrayObject(imageList, imageObject);
      const newImageList = isUnique ? [...imageList, imageObject] :  [...imageList];

      localStorage.setItem('favoriteUrls', JSON.stringify(newUrlList));
      localStorage.setItem('imageLikedList', JSON.stringify(newImageList));

      this.setState({
        imageUrlList: newUrlList,
        imageLikedList: newImageList,
        rerender: newUrlList.length
      });
      callbackUpdateFavorite(newUrlList.length);
    }else {
      localStorage.setItem('favoriteUrls',JSON.stringify([imageUrl]));
      localStorage.setItem('imageLikedList',JSON.stringify([imageObject]));

      this.setState({
        imageUrlList:[imageUrl],
        imageLikedList: [imageObject],
        rerender: 1
      });
      callbackUpdateFavorite(1);
    }
  }

  handleFetchMore = () => {
    const { limit, querry } = this.state;
    const newLimit = limit + 8;
    this.setState({ limit: newLimit }, () => this.fetchSearchResult(querry));
    return true;
  }

  render() {
    const { querry, loading, images, errorMessage, imageUrlList, renderSearchTab, rerender } = this.state;
    const imageLikedList = JSON.stringify(imageUrlList);
    const enableFetchMore = querry && images && images.length >= 8;


    if(images.length > 0) {
      images.map(img => {
        const indexImageLiked = imageLikedList.indexOf(img.images['original_still'].url);
       (indexImageLiked !== -1) ? img.liked = true : img.liked = false;
        return img
      })
    }

    return(
      <div>
        <SearchBar
          displayValue={querry}
          onInputChange={this.onInputChange}
          handleFetchMore={this.handleFetchMore}
          disabledFetch={!enableFetchMore}
        />
        <Content
          imageList={images}
          handleLikeImage={this.handleLikeImage}
          handleOnImage={this.handleOnImage}
          isLoading={loading}
          errorMess={errorMessage}
          isSearchTab={renderSearchTab}
          rerender={rerender}
        />
      </div>
    );
  }
}
export default SearchTab;