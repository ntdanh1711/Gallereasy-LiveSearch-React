import React, { PureComponent } from 'react';

import styles from './Footer.css';

class Footer extends PureComponent {
  render() {
    return(
      <div className={styles.footer}>
        <div className={styles.text}>
          <p>Gallereasy POC web app</p>
        </div>
        <div className={styles.text}>
          <p>2359 Media</p>
        </div>
      </div>
    );
  }
}
export default Footer;