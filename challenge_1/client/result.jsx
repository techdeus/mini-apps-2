import React, { Component } from 'react';
import Edit from './edit.jsx';

export default class Result extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showEdit: false,
            viewEdit: false,
        }
        this.dateCheck = this.dateCheck.bind(this);
        this.toggleOptions = this.toggleOptions.bind(this);
        // this.editResult = this.editResult.bind(this);
    }

    toggleOptions() {
        const { showEdit } = this.state;
        this.setState({ showEdit: !showEdit });
    }

    dateCheck(date) {
        if (date.length === 4) {
            return `${date} BC`;
        } else if (date.length === 3) {
            return `${date} AD`;
        } else {
            return `${date}`;
        }
    }
    
    // editResult() {

    // };

    render() {
        const { entry } = this.props;
        const { showEdit, viewEdit } = this.state;
        const displayEditTextArea = !viewEdit ? `comDisplayNone` : `editTextBox`
        return (
            <div
              className="resultContainer"
              onMouseEnter={this.toggleOptions}
              onMouseLeave={this.toggleOptions}
            >
                <Edit status={showEdit} click={this.editResult} />
                <div className="date"><strong>Date:</strong> {this.dateCheck(entry.date)}</div>
                <form>
                    <textarea className={`${displayEditTextArea}`} value={entry.description}></textarea>
                </form>
                <div className="description"><strong>Description:</strong> {entry.description}</div>
                <div className="language"><strong>Language:</strong> {entry.lang}</div>
                <div className="category"><strong>Category:</strong> {entry.category1}</div>  
            </div>
        );
    }
}