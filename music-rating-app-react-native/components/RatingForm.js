import React, { Component } from 'react';
import { Button, View, Text, TextInput, StyleSheet, Alert, Keyboard, TouchableWithoutFeedback } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { createNativeStackNavigator } from 'react-native-screens/native-stack';
import axios from 'axios';
import AuthService from "./Authentication";
import authHeader from './Auth-Header';
import * as SecureStore from 'expo-secure-store';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';


const rating_url = "http://localhost:8000/api/ratings/"

class RatingForm extends Component {
    constructor(props) {
        super(props)
        this.state = {
            username: '',
            password: '',
            rating: '',
            error: ''
          }
    }
      
      

  onUsernameChange(text) {
    this.setState({ username: text });
  }

  onPasswordChange(text) {
    this.setState({ password: text });

  }
  onRatingChange(text) {
    this.setState({ rating: text });
  }

  async handleAddSong() {
    try {
        Keyboard.dismiss();
        const headers = await authHeader()
            axios.put(rating_url, {
                song: this.props.route.params.song,
                rating: this.state.rating,
                user: this.props.route.params.user
            }, { headers }).then(() => {
          });
    } catch(e) {
        console.log(e);
    }
    
    
  }

  handleRequest() {
        console.log(this.props.route.params.user);
        console.log(this.state.rating);
        this.handleAddSong()
        this.props.navigation.navigate("Home")
    }
        
    
    


  renderButton() {
    const buttonText = 'Add Rating';

    return (
      <Button title={buttonText} onPress={ () => {
        if (this.state.rating < 1 || this.state.rating > 5) {
          Alert.alert(
              "Invalid rating",
              "Please enter a number between 1 and 5",
              [
                { text: "OK", onPress: () => console.log("OK Pressed") }
              ]
            );
        } else {
          this.handleRequest()
        }
      }
      }/>
    );
  }

  render() {
    const {
      formContainerStyle,
      fieldStyle,
      textInputStyle,
      buttonContainerStyle,
      accountCreateContainerStyle
    } = style;

    

    return (
      <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
        <View style={{ flex: 1, backgroundColor: 'white' }}>
        <View style={formContainerStyle}>
          <View style={fieldStyle}>
            <TextInput
              placeholder="rating"
              autoCorrect={false}
              autoCapitalize="none"
              onChangeText={this.onRatingChange.bind(this)}
              style={textInputStyle}
              keyboardType={'number-pad'}
            />
          </View>
        </View>
        <View style={buttonContainerStyle}>
          {this.renderButton()}
        </View>
      </View>
      </TouchableWithoutFeedback>
      
    );
  }
}


const style = StyleSheet.create({
  formContainerStyle: {

    backgroundColor: '#E8EAED',
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  textInputStyle: {
    backgroundColor: '#FFF',
    padding: 15,
    borderRadius: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 20,
    flex: 1,
  },
  fieldStyle: {
    flexDirection: 'row',
    justifyContent: 'center'
  },
  buttonContainerStyle: {
    backgroundColor: '#FFF',
    padding: 30,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 50,
  },
  accountCreateTextStyle: {
    color: 'black'
  },
  accountCreateContainerStyle: {
    padding: 25,
    alignItems: 'center'
  }
});


export default RatingForm;