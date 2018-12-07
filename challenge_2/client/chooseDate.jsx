import React from 'react';

const ChooseDate = ({handleCalendarDateSubmit}) => (
    <div className="formComponents">
    <form onSubmit={handleCalendarDateSubmit}>
        <label>Start Date:
            <input id="start" type="date"></input>
        </label>

        <label>To Date:
            <input id ="end" type="date"></input>
        </label>
        <button type="submit">Filter</button>
    </form>
</div>
)

export default ChooseDate;