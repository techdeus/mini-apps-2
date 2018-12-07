import React from 'react';

const GraphType = ({ handleGraphTypeChange }) => (
    
    <div className="formComponents">
        <label>
            Choose a Chart: 
            <select id="type" className="select" onChange={handleGraphTypeChange}>
                <option value="bar">Bar</option>
                <option value="line">Line</option>
            </select>
        </label>
    </div>
);

export default GraphType;