import React from 'react';

const Loader = () => {
    return (
        <div className="flex flex-col items-center justify-center">
            <div>{ ' '}</div>
            <progress className="progress w-full"></progress>
        </div>
    );
};

export default Loader;