import React from 'react';

const ChooseDate = ({handleCalendarDateChange, handleCalendarDateSubmit}) => (
    <div className="formComponents">
    <form>
        <label>Start Date:
            <input id="start" type="date" onChange={handleCalendarDateChange}></input>
        </label>

        <label>To Date:
            <input id ="end" type="date" onChange={handleCalendarDateChange}></input>
        </label>
        <button type="button" onClick={handleCalendarDateSubmit}>Filter</button>
    </form>
</div>
)

export default ChooseDate;