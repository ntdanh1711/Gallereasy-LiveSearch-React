import React, { PureComponent } from 'react';
import { withRouter } from 'react-router-dom';

import Header from './components/Header';
import Footer from './components/Footer';
import SearchTab from './Tabs/SearchTab';
import FavoriteTab from './Tabs/FavoriteTab';

class Home extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      renderSearchTab: true,
      numberFavorite: localStorage.getItem('favoriteUrls')
        ? JSON.parse(localStorage.getItem('favoriteUrls')).length
        : 0
    }
  }

  handleRenderTab = (isSearchTab) => {
    return this.setState({
      renderSearchTab: isSearchTab
    });
  }

  updateFavorite = (number) => {
    return this.setState({
      numberFavorite: number
    });
  }

  render() {
    const { renderSearchTab, numberFavorite } = this.state;

    return(
      <div>
        <Header
          callbackChangeTab={this.handleRenderTab}
          numberFav={numberFavorite}
        />
        <div style={{minHeight: window.innerHeight}}>
          {renderSearchTab
            ? <SearchTab callbackUpdateFavorite={this.updateFavorite} />
            : <FavoriteTab
                callbackUpdateFavorite={this.updateFavorite}
                isSearchTab={renderSearchTab}
              />}
        </div>
        <Footer />
      </div>
    );
  }
}
export default withRouter(Home);