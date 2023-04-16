import React from 'react';

export const Footer = () => (
    <footer className="footer">
        <div className="footer__container">
            <div className="footer__logo">
                Onlycats
            </div>
            <div className="footer__copyright">
                &copy; {new Date().getFullYear()}  &nbsp;<a href="https://www.pieronanni.me" target="_blank" rel="noreferrer">Piero Nanni</a>
            </div>
        </div>
    </footer>
);

export default Footer;
