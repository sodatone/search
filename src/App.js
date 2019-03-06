import React, { Component } from 'react';
import $ from 'jquery'
import './App.css';

const API_KEY = "430711e29ad09c493dad2831eb0bbd08"

// http://ws.audioscrobbler.com/2.0/?method=artist.search&artist=chief%20keef&
// api_key=430711e29ad09c493dad2831eb0bbd08&format=json&limit=10
class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      searchQuery: "",
      searchResults: [],
    }
    this.updateSearchQuery = this.updateSearchQuery.bind(this)
    this.timeout = null
  }

  fetchResults() {
    if (!this.state.searchQuery.replace(/\s/g, '').length) {
      this.setState({ searchResults: [] })
      return
    }

    const searchQuery = this.state.searchQuery

    $.ajax({
      type: 'GET',
      url: "http://ws.audioscrobbler.com/2.0",
      data: {
        method: "artist.search",
        artist: searchQuery,
        format: "json",
        limit: 10,
        api_key: API_KEY
      }
    }).done(function(res) {
      if (searchQuery === this.state.searchQuery) {
        this.setState({ searchResults: res.results.artistmatches.artist })
      }
    }.bind(this)
    ).fail(function(res) {
      if (searchQuery === this.state.searchQuery) {
        alert("bad request!")
      }
    }.bind(this))
  }

  updateSearchQuery(e) {
    this.setState({ searchQuery: e.target.value }, () => {
      if (this.timeout) {
        clearTimeout(this.timeout)
      }
      this.timeout = setTimeout(() => {
        this.fetchResults()
      }, 100)
    })
  }

  render() {
    return (
      <div>
        <input
          type="text"
          name="search"
          value={this.state.searchQuery}
          onChange={this.updateSearchQuery}
        />
        {
          this.state.searchResults.map(result => {
            return (
              <div>
                <div>
                  {result.name}
                </div>
              </div>
            )
          })
        }
      </div>
    )
  }
}

export default App;
