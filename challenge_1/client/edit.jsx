import React, { Component } from 'react';

export default class Edit extends Component {
    constructor(props) {
        super(props);
        this.state = {
            click: false,
        };
    }

    render() {
        const { status } = this.props;

        if (!status) {
            return (
                <div className="comDisplayNone" />
            )
        }
        return (
            <div className="comEditButton">
                <button title="edit" type="button">
                    <i className="fa fa-pencil-square" />
                Edit    
                </button>
            </div>
        )
    }    
}
