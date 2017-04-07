import React, { Component } from 'react';
import axios from 'axios'

class App extends Component {
  constructor() {
    super()
    this.state  = {
      volume: 0,
      songs: []
    }

    this.onVolumeChange = this.onVolumeChange.bind(this)
  }

  onVolumeChange(event) {
    setState({
      volume: {event.target.value}
    })
  }

  componentWillMount(){
  axios
    .get(`https://freemusicarchive.org/api/get/tracks.json?api_key=${config.MY_KEY}`)
    .then(({data}) => {
      this.setState({ songs: data})
    })
  }

  render() {
    return (
      <div className="container">
        <Songs
          songs={this.state.songs}
        />
      </div>
    )
  }

  const Songs = (props) => {
    return (
      <div className="col-xs-4 songs">
        <Songlist
          songs={props.songs}
        />
      </div>
    )
  }

  const SongList = (props) => {
    return (
      <ul>
        {props.songs.map((song) => <SongListItem
          key={song.id}
          trackFile={song.songFile}
          songTitle={song.songTitle}
          songArtist={song.songArtist}
        />)
        }
      </ul>
    )
  }


}
export default App;
