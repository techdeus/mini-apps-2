import React from 'react';

const GraphDate = ({ handleGraphDateChange }) => (
    <div className="formComponents">
        <label>
            Date Range: 
            <select id="date" className="select" defaultValue="week" onChange={handleGraphDateChange}>
                <option value="today">Today</option>
                <option value="yesterday">Yesterday</option>
                <option value="week">Last Week</option>
                <option value="month">Last Month</option>
                <option value="3">3 Months</option>
                <option value="6">6 Months</option>
                <option value="year">1 Year</option>
            </select>
        </label>
    </div>
);

export default GraphDate;
