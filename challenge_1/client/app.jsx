import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import ReactPaginate from 'react-paginate';
import Results from './results.jsx';

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            searchValue: '',
            results: [],
            offset: 0,
            pageCount: 0,
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handlePageClick = this.handlePageClick.bind(this);
    }

    handleChange(event) {
        this.setState({
            searchValue: event.target.value
        });
    };

    handlePageClick(data) {
        let selected = data.selected;

        this.setState({offset: selected + 1 }, () => {
            this.handlePageChange();
        });
    };

    handlePageChange() {
        const { searchValue, offset } = this.state;
        event.preventDefault();     
        fetch(`/events?_limit=10&_page=${offset}&q=${searchValue}`, {
            method: 'GET',
            headers: {
                "Content-Type": "application/json; charset=utf-8",
            }
        })
        .then((res) =>  {
            // const pageCount = Math.ceil(res.headers.get('X-Total-Count') / 10);
            
            // this.setState({pageCount: pageCount});
            return res.json();
        })
        .then((data) => {
            console.log(data);
            this.setState({ results: data });
        })
        .catch((error) => {
            console.log(error);
        });
    };

    handleSubmit(event) {
        const { searchValue, offset } = this.state;
        event.preventDefault();     
        fetch(`/events?_start=0&_limit=10&q=${searchValue}&_page=${offset}`, {
            method: 'GET',
            headers: {
                "Content-Type": "application/json; charset=utf-8",
            }
        })
        .then((res) =>  {
            const pageCount = Math.ceil(res.headers.get('X-Total-Count') / 10);
            console.log(pageCount);
            this.setState({pageCount: pageCount});
            return res.json();
        })
        .then((data) => {
            console.log(data);
            this.setState({ results: data });
        })
        .catch((error) => {
            console.log(error);
        });
    };

    render() {
        const { results, pageClicked } = this.state;
        return (
            <div>
                <div className="container">
                    <div className="title">
                        Historical Events Finder
                    </div>

                    <form onSubmit={this.handleSubmit}>
                            <input 
                            type="text"
                            className="searchBox" 
                            value={this.state.value} 
                            placeholder="Find an Event" 
                            onChange={this.handleChange}
                            />
                    </form>
                    <Results results={results} />
                    <ReactPaginate 
                        previousLabel={"previous"}
                        nextLabel={"next"}
                        breaklabel={"..."}
                        breakClassName={"break-me"}
                        pageCount={this.state.pageCount}
                        marginPagesDisplayed={2}
                        pageRangeDisplayed={5}
                        onPageChange={this.handlePageClick}
                        containerClassName={"pagination"}
                        subContainerClassName={"pages pagination"}
                        activeClassName={"active"}
                    />
                </div>
            </div>
        );
    }
}

ReactDOM.render(<App />, document.getElementById('app'));

