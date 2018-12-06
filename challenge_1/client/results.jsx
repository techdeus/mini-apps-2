import React, { Component } from 'react';
import Result from './result.jsx';

export default class Results extends Component {
    constructor(props) {
        super(props);
    
    }

    render() {
        const { results } = this.props;
        
        return (
            <div className="events">
                {results.map((entry, i) => (
                    <div key={i} className="entry">
                    <Result entry={entry} />
                    </div>
                ))}    
            </div>
        );
    }
}