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

const reg_url = "http://localhost:8000/";

class LoginOrCreateForm extends Component {
    constructor(props) {
        super(props)
        this.state = {
            username: '',
            password: '',
            error: ''
          }
    }

    async componentDidMount() {
      var value = null
      value = await AuthService.getCurrentUser()
        console.log("value is " + value)
        if (value != null) {
          this.props.navigation.navigate("Home")
        }
        }
        
          
    
        
      
      

  onUsernameChange(text) {
    this.setState({ username: text });
  }

  onPasswordChange(text) {
    this.setState({ password: text });
  }

  handleRequest() {
    var e = false
    if(!this.props.create)
        AuthService.login(this.state.username, this.state.password).then(() =>{
            this.props.navigation.navigate("Home")

        })
        .catch((e) => {
          console.log(e);
          Alert.alert(
            "Wrong username or password",
            "Such user doesn't exist or fields were filled out incorrectly.\
            \nPlease try again, filling out each field without special characters",
            [
              { text: "OK", onPress: () => console.log("OK Pressed") }
            ]
          );
        })
    else {
      axios.post(reg_url + "users/", this.state)
        .catch(() => {
          e = true
          Alert.alert(
            "Wrong username or password",
            "Such user already exists or fields were filled out incorrectly.\
            \nPlease try again, filling out each field without special characters, or choose a different name",
            [
              { text: "OK", onPress: () => console.log("OK Pressed") }
            ]
          );
        })
        .then(() =>{
          console.log(e)
          if (e) {
            this.setState({ error: "Please enter a correct username"})
          } else {
            AuthService.login(this.state.username, this.state.password).then(() =>{
              this.props.navigation.navigate("Home")
          })
          }
          
        });
    }
        
    
    
  }

  renderButton() {
    const buttonText = this.props.create ? 'Create' : 'Login';

    return (
      <Button title={buttonText} onPress={this.handleRequest.bind(this)}/>
    );
  }


  renderCreateLink() {
    if (!this.props.create) {
      const { accountCreateTextStyle } = style;
      return (
        <Text style={accountCreateTextStyle}>
          
          <Text style={{ color: 'blue' }} onPress={() => this.props.navigation.navigate("Register")}>
            {' Sign Up'}
          </Text>
        </Text>
      );
    }
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
              placeholder="username"
              autoCorrect={false}
              autoCapitalize="none"
              onChangeText={this.onUsernameChange.bind(this)}
              style={textInputStyle}
            />
          </View>
          <View style={fieldStyle}>
            <TextInput
              secureTextEntry
              autoCapitalize="none"
              autoCorrect={false}
              placeholder="password"
              onChangeText={this.onPasswordChange.bind(this)}
              style={textInputStyle}
            />
          </View>
        </View>
        <View style={buttonContainerStyle}>
          {this.renderButton()}
          <View style={accountCreateContainerStyle}>
            {this.renderCreateLink()}
          </View>
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


export default LoginOrCreateForm;