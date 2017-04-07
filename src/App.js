import React, { Component } from 'react';
import axios from 'axios'
import config from '../.env.js'

class App extends Component {
  constructor() {
    super()
    this.state  = {
      volume: 0,
      songs: []
    }

    // this.onVolumeChange = this.onVolumeChange.bind(this)
  }

  // onVolumeChange(event) {
  //   setState({
  //     volume: {event.target.value}
  //   })
  // }

  componentWillMount(){
  axios
    .get(`https://freemusicarchive.org/api/get/tracks.json?api_key=${config.MY_KEY}`)
    .then(({data}) => {
      this.setState({ songs: data.dataset})
    })
  }

  render() {
    return (
      <div className="container">
        <SongList
          songs={this.state.songs}
        />
      </div>
    )
  }
}

  const SongList = (props) => {
    return (
      <div className="col-xs-4 songs">
        {props.songs.map(song => <SongListItem
          key={song.track_id}
          song={song}
          />)
        }
      </div>
    )
  }

  const SongListItem = (props) => {
    return (
      <div id={props.song.track_id}>
        <h5>{props.song.track_title} by {props.song.artist_name}</h5>
        <audio controls>
          <source src={"http://files.freemusicarchive.org/" + props.song.track_file} type="audio/mpeg"/>
        </audio>
      </div>
    )
  }



export default App;
