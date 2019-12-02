import React, { PureComponent } from 'react';
import PropTypes from "prop-types";

import styles from './Header.css';

class Header extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      isSearchTab: true
    }
  }

  handleChangeTab = (e) => {
    const chosenTab = e.target.value;
    const { callbackChangeTab } = this.props;

    if(chosenTab === 'search') {
      this.setState({ isSearchTab: true }, () => {
        callbackChangeTab(this.state.isSearchTab);
      });
    }else {
      this.setState({ isSearchTab: false }, () => {
        callbackChangeTab(this.state.isSearchTab);
      });
    }
  }

  render() {
    const { isSearchTab } = this.state;
    const { numberFav = 0 } = this.props;
    const backgroundSearchTab = isSearchTab ? styles.tabLinksChosen : styles.tabLinks;
    const backgroundFavoritesTab = !isSearchTab ? styles.tabLinksChosen :styles.tabLinks;
    return(
      <div>
        <div className={styles.flexContainer}>
          <div className={styles.logo}>
            <p className={styles.bold}>Galler<b>easy</b></p>
          </div>
          <button value="search" className={backgroundSearchTab} onClick={this.handleChangeTab}>
            Search
          </button>
          <button value="favourites" className={backgroundFavoritesTab} onClick={this.handleChangeTab}>
            Favourites({numberFav})
          </button>
        </div>
        <hr/>
      </div>
    );
  }
}

Header.propTypes = {
  numberFav: PropTypes.number,
  callbackChangeTab: PropTypes.func
}

export default Header;