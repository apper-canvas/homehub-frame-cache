import React from 'react';

const Textarea = ({ className, rows = 4, ...props }) => {
    return (
        <textarea
            rows={rows}
            className={`w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-accent focus:border-accent outline-none resize-none ${className || ''}`}
            {...props}
        />
    );
};

export default Textarea;