import React from 'react';

export const Footer = () => (
    <footer className="footer">
        <div className="footer__container">
            &copy; {new Date().getFullYear()}  &nbsp;<a href="Piero Nanni" target="_blank" rel="noreferrer">Piero Nanni</a>
        </div>
    </footer>
);

export default Footer;
