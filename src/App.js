import React, { Component } from 'react';
import axios from 'axios'
import config from '../.env.js'
import './App.css';

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
      <div className="songs">
        {props.songs.map((song, index) => <SongListItem
          key={index}
          song={song}
          index={index}
          />)
        }
      </div>
    )
  }

  const SongListItem = (props) => {
    return (
      <div className="song" id={props.index} data-id={props.song.track_id} style={isOdd(props.index)}>
        <h5>{props.song.track_title} by {props.song.artist_name}</h5>
        <audio controls>
          <source src={"http://files.freemusicarchive.org/" + props.song.track_file} type="audio/mpeg"/>
        </audio>
      </div>
    )
  }

  function isOdd(num) {
    if (num % 2 === 1) {
      return {backgroundColor: 'rgba(143, 217, 240, 0.5)'}
    } else {
      return {backgroundColor: 'white'}
    }
  }



export default App;
