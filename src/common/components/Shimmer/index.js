import React from 'react';

function Shimmer(props) {
    return (
        <div>
            {Array(props.count).fill(1).map((el, i) =>
                <div key={i} className="placeholder">
                    <div className="animated-background"></div>
                </div>
            )}
        </div>
    );
}

export default Shimmer;