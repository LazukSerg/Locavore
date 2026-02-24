import React from 'react';
import './Footer.css';
import { withRouter } from '../common/with-router';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <React.Fragment>
        <footer className="footer">
            <div className="footer-container">
              <p className="copyright">
                © {currentYear} "Локаворство". Все права защищены.
              </p>
            </div>
        </footer>
    </React.Fragment>
    
  );
};

export default withRouter(Footer);