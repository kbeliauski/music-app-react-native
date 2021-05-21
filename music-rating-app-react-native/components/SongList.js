import 'react-native-gesture-handler';
import React, {useState, useEffect} from 'react';
import { KeyboardAvoidingView, StyleSheet, Text, View, TextInput, TouchableOpacity, Keyboard, ScrollView, Alert } from 'react-native';
import Song from './Song';
import axios from "axios";
import authHeader from "./Auth-Header"
import AuthService from "./Authentication"


var USER = ''
var song_url = "http://localhost:8000/api/songs/"
const rating_url = "http://localhost:8000/api/ratings/"
var headers = null

export default function SongList(props) {
  const [song, setSong] = useState("");
  const [artist, setArtist] = useState("");
  const [rating, setRating] = useState("");
  const [songItems, setSongItems] = useState([]);
  const [count, setCount] = useState(1)

  useEffect(() => {
    async function currentUser() {
        headers = await authHeader()
        var current = await AuthService.getCurrentUser()
        console.log("iiiiiiii" + current);
        console.log("iiiiiiii" +  headers);
        USER = current

    }
    
    currentUser()
  }, []);


  
  


  function averageRating(song) {
      console.log(props.ratings.length);
      var total = 0
      var number = 0
      for (var i=0; i < props.ratings.length; i++) {
        if (props.ratings[i]["song"] == song) {
            total += props.ratings[i]["rating"]
            number += 1
        }
        
      }
      if (number > 0) {
        return (total/number).toFixed(1)
      }
      else return 0
      
  }

  async function postSong() {
      try {
        await axios.post(song_url, {song: song, artist: artist}, { headers })
      } catch (e){
          console.log(e);
          
  }
}

  async function handleAddSong() {
    try {
        Keyboard.dismiss();
            axios.put(rating_url, {
                song: props.songs[props.songs.length-1]["pk"],
                rating: rating,
                user: await AuthService.getCurrentUser()
            }, { headers }).then(() => {
            props.resetState();
          });

        
    } catch(e) {
        console.log(e);
    }
    
    
  }

  const songDetails = () => {
      switch (count) {
        case 1 :
            return <TextInput style={styles.input} placeholder={'Write a song`s name'} value={song} onChangeText={text => setSong(text)} />;
        case 2: 
            return <TextInput style={styles.input} placeholder={'Now, this song`s artist'} value={artist} onChangeText={text => setArtist(text)} />;
        case 3: 
            return <TextInput style={styles.input} placeholder={'Now, its rating from 1 to 5'} keyboardType={'number-pad'} value={rating} onChangeText={text => setRating(text)} />;
    }
  }

  return (
    <View style={styles.container}>
      {/* Added this scroll view to enable scrolling when list gets longer than the page */}
      <ScrollView
        contentContainerStyle={{
          flexGrow: 1
        }}
        keyboardShouldPersistTaps='handled'
      >

      {/* Songs */}
      <View style={styles.songsWrapper}>
        <View style={styles.items}>
          {/* This is where the songs will go! */}
          {
            props.songs.map((key, index) => {
              return (
                <TouchableOpacity disabled={count==3} key={props.songs[index]["pk"]} onPress={() => {
                    var decision = 0
                    for (var i=0; i < props.ratings.length; i++) {
                        if (props.songs[index]['pk'] == props.ratings[i]['song'] && props.ratings[i]['user'] == USER) {
                            decision = 1
                            break
                        }
                    }
                    if (decision == 0) {
                        props.navigation.navigate("RatingForm", {song: props.songs[index]["pk"], user: USER})
                                                                  
                    } else{
                        Alert.alert(
                            "You already rated this song",
                            "Please rate a different one",
                            [
                              { text: "OK", onPress: () => console.log("OK Pressed") }
                            ]
                          ); 
                    }

                    
                }}>
                  <Song 
                    disabled={count==3}
                    song_name={props.songs[index]["song"]} 
                    artist={props.songs[index]["artist"]} 
                    rating={averageRating(props.songs[index]["pk"])} 
                    resetState={props.resetState}
                    pk={props.songs[index]["pk"]} 
                    index={index}
                    /> 
                </TouchableOpacity>
              )
            })
          }
        </View>
      </View>
        
      </ScrollView>

      {/* Write a song */}
      {/* Uses a keyboard avoiding view which ensures the keyboard does not cover the items on screen */}
      <KeyboardAvoidingView 
        keyboardVerticalOffset = {150}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.writeSongWrapper}
      >
          <View>{songDetails()}</View>
        
        <TouchableOpacity onPress={() => {

            console.log(count)
            if (count == 1) {
              if (song == null) {
                  Alert.alert(
                    "Please enter the name",
                    "Enter the name of the song before rating",
                    [
                      { text: "OK", onPress: () => console.log("OK Pressed") }
                    ]
                  )
              } 
                else {
                  setCount(2) 
                }
            }
            if (count == 2) {
              //console.log("KEAKN");
              if (artist == null) {
                  Alert.alert(
                    "Please enter the artist",
                    "I know u lazy, but try to press some buttons pls",
                    [
                      { text: "OK", onPress: () => console.log("OK Pressed") }
                    ]
                  )
              }
                else {
                  props.resetState()
                  if (props.songs.length == 0) {
                  //console.log("YOOOOOOO")
                  postSong()
                  setCount(3)
                
                }
                

                
              
              else {
                var duplicate = false
                for (var i=0; i < props.songs.length; i++) {
                  if (props.songs[i]["song"] == song && props.songs[i]["artist"] == artist) {

                        duplicate = true
                        Alert.alert(
                          "Such song already exists",
                          "Please add a different song or press on the existing one to add rating",
                          [
                            { text: "OK", onPress: () => {
                              
                            } }
                          ]
                        )
                        
                      break

                  }
                  
                }
                
                if (duplicate){
                  setCount(1)
                  console.log('THIS IS COUNT:' + count);
                  setSong(null)
                  setArtist(null)
                  
                } else {
                  postSong()
                  setCount(3)
                  props.resetState()
                }
                
              }
            }
              
              
                //add the song to the server
            }
            if (count == 3) {
                if (rating < 1 || rating > 5 || isNaN(parseInt(rating))) {
                    Alert.alert(
                        "Invalid rating",
                        "Please enter a number between 1 and 5",
                        [
                          { text: "OK", onPress: () => console.log("OK Pressed") }
                        ]
                      );
                      setCount(3)
                      console.log('THIS IS COUNT:' + count);
                      setRating(null)
                }
                else{
                    setCount(1)
                    setSong(null);
                    setArtist(null);
                    setRating(null);
                    handleAddSong()
                }
                
                //add the song to the server
            }

                
            
        }}>
          <View style={styles.addWrapper}>
            <Text style={styles.addText}>+</Text>
          </View>
        </TouchableOpacity>
      </KeyboardAvoidingView>
      
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E8EAED',
  },
  songsWrapper: {
    paddingHorizontal: 20,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: 'bold'
  },
  items: {
    marginTop: 30,
  },
  writeSongWrapper: {
      flex: 1,
    position: 'absolute',
    bottom: 60,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center'
  },
  input: {
    paddingVertical: 15,
    paddingHorizontal: 15,
    backgroundColor: '#FFF',
    borderRadius: 60,
    borderColor: '#C0C0C0',
    borderWidth: 1,
    width: 250,
  },
  addWrapper: {
    
    width: 60,
    height: 60,
    backgroundColor: '#FFF',
    borderRadius: 60,
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: '#C0C0C0',
    borderWidth: 1,
  },
  addText: {},
});
