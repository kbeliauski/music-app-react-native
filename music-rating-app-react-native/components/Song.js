import 'react-native-gesture-handler';
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import axios from "axios";
import authHeader from "./Auth-Header"



var song_url = "http://localhost:8000/api/songs/"


const Song = (props) => {

    async  function deleteSong(pk) {
        try{
          const headers = await authHeader()
          axios.delete(song_url + pk + '/', {headers}).then(() => {
            props.resetState()
          });
        } catch(e) {
          console.log(e);
        }
        
      }; 

  return (
    <View style={styles.item}>
        <View style={{flex: 1, flexDirection:'row', justifyContent:'space-between'}}>
        <Text style={styles.itemLeft}>{props.song_name + " —— " + props.artist}</Text>
        <Text style={styles.rating}>{props.rating}</Text>
        </View>
        
    
        <TouchableOpacity disabled={props.disabled} style={styles.square} onPress={() => {
            deleteSong(props.pk)
            
        }}>
            <Text>X</Text>
        </TouchableOpacity>
            
      </View>
  )
}

const styles = StyleSheet.create({
  item: {
    backgroundColor: '#FFF',
    padding: 15,
    borderRadius: 10,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  itemLeft: {
    marginTop: 5,
    alignItems: 'center',
    flexWrap: 'wrap',
    maxWidth: '80%',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  square: {
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: '#C0C0C0',
    borderWidth: 1,
    width: 24,
    height: 24,
    backgroundColor: '#55BCF6',
    opacity: 0.4,
    borderRadius: 5,
    marginLeft: 0,
  },
  itemText: {
    flex:1,
    justifyContent: 'center',
    alignItems: 'center',
    height: 24,
  },
  rating: {
    alignSelf: 'flex-end',
    justifyContent: 'center',
    alignItems: 'center',
    fontWeight: 'bold',
    fontSize: 20,
    width: 30,
    height: 24,
    marginRight: 10
  },
});

export default Song;