import 'react-native-gesture-handler';
import React, { Component } from 'react';
import { View, Text } from 'react-native';
import authHeader from './Auth-Header';
import axios from "axios";
import SongList from "./SongList"


const API_URL = 'http://localhost:8000/api/songs/'
const rating_url = "http://localhost:8000/api/ratings/"


class Home extends Component {
  constructor(props) {
    super(props)
    this.state = {
    songs: [],
    ratings: [],
    logged_in: false
  }}

  componentDidMount() {
    this.didFocusSubscription = this.props.navigation.addListener(
      'focus',
      () => {
        this.resetState();
      }
    );
    
  }

  async getSongs() {
    try {
      const headers = await authHeader() 
      axios.get(API_URL, { headers } )
      .then(res => {
        this.setState({ songs: res.data})
        console.log(this.state.songs);
        console.log(this.state.songs[0]["album"]);
      })
      .catch(() => {
        this.setState ({
          logged_in: false
        })
      })
    } catch (e) {
      console.log(e);
    }
    
  };

  async deleteSong(pk) {
    try{
      const headers = await authHeader()
      axios.delete(API_URL + pk + '/', {headers}).then(() => {
        this.resetState()
      });
    } catch(e) {
      console.log(e);
    }
    
  };

  async getRatings () {
    try {
      const headers = await authHeader()
      axios.get(rating_url, { headers }).then(res => {
        this.setState({ ratings: res.data })
        console.log(this.state.ratings);
        console.log(this.state.ratings.length);
      });
    } catch (e) {
      console.log(e);
    }
    
  };

  resetState = () => {
    this.getSongs();
    this.getRatings();
  };

  render() {
    return (
      <View style={{ flex: 1 }}>
        <SongList 
          songs={this.state.songs} 
          ratings={this.state.ratings} 
          resetState={this.resetState}
          navigation = {this.props.navigation} />
      </View>
    );
  }

}

export default Home;