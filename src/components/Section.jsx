import React from 'react';
import { motion } from 'framer-motion';

const Section = ({ children, className = '', delay = 0 }) => (
    <motion.section className={'section ' + (className)}
        initial={{ y: 10, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.3, delay }}
    >
        <div className="section__container">
            {children}
        </div>
    </motion.section>
);

export default Section;
