import axios from 'axios';

import constants from './constants';

const fetchImageList = (querryObject, cancelToken, callbackSuccess, callbackFail) => {
  const url = `${constants.gifUrl}?api_key=${constants.apiKey}&q=${querryObject.querry}&limit=${querryObject.limit}&offset=${querryObject.offset}`;
  axios.get(`https://${url}`, {
      cancelToken
    }).then(res => {
      if(res && res.data) {
        callbackSuccess(res.data);
      }
    }).catch(error => {
      callbackFail(error);
    })
}

export default { fetchImageList }
