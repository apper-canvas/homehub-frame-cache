import React from 'react';
import { motion } from 'framer-motion';

const Button = ({ onClick, children, className, type = 'button', ...motionProps }) => {
    // Determine if motion.button should be used based on provided motionProps
    const Component = Object.keys(motionProps).some(key => 
        ['initial', 'animate', 'exit', 'transition', 'whileHover', 'whileTap', 'variants'].includes(key)
    ) ? motion.button : 'button';

    return (
        <Component 
            onClick={onClick} 
            className={className} 
            type={type} 
            {...motionProps}
        >
            {children}
        </Component>
    );
};

export default Button;