import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import Search from './components/Search.jsx';
import RepoList from './components/RepoList.jsx';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      repos: []
    }

    this.search = this.search.bind(this)
  }

  search (term) {
    console.log(`${term} was searched`);
    // TODO
    $.ajax({
      url: "/repos",
      method: 'POST',
      data: JSON.stringify({username: term}),
      contentType: "application/json; charset=utf-8",
      success: (data) => {
        console.log(data)
        this.setState({
          repos: data
        })
      },
      error: (err) => {
        console.log(err)
      }

    })
  }

  componentDidMount() {
    $.ajax({
      url: "/repos",
      method: 'GET',
      success: (response) => {
        console.log('successful get', response)
        this.setState({
          repos: response
        })
      },
      error: (err) => {
        console.log(err)
      }
    })
  }


  render () {
    return (<div>
      <h1>Github Fetcher</h1>
      <Search onSearch={this.search}/>
      <RepoList repos={this.state.repos}/>
    </div>)
  }
}

ReactDOM.render(<App />, document.getElementById('app'));