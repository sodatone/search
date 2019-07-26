import React, { Component } from "react";
import "./App.css";
import { Artists } from "./Artists";

// API Docs: https://www.last.fm/api/show/artist.search
const API_URL = "http://ws.audioscrobbler.com/2.0/";
const API_KEY = "430711e29ad09c493dad2831eb0bbd08";
const DEBOUNCE_INTERVAL = 200;

class App extends Component {
  state = { artists: [] };
  pid = 0;
  nextSeq = 1;

  onTextChange = async event => {
    const term = event.target.value.trim();

    if (this.pid) {
      clearTimeout(this.pid);
    }

    const seq = this.nextSeq++;
    if (term) {
      this.pid = setTimeout(async () => {
        const result = await (await fetch(
          `${API_URL}?method=artist.search&artist=${term}&api_key=${API_KEY}&format=json`
        )).json();

        if (seq !== this.nextSeq - 1) {
          console.log("OUT OF SEQ");
          return;
        }

        this.setState({
          artists: result.results.artistmatches.artist.map(a => ({
            name: a.name,
            id: a.mbid
          }))
        });
      }, DEBOUNCE_INTERVAL);
    } else {
      this.setState({ artists: [] });
    }
  };

  render() {
    const { artists } = this.state;
    return (
      <div>
        <input type="text" onChange={this.onTextChange} />
        <Artists artists={artists} />
      </div>
    );
  }
}

export default App;
