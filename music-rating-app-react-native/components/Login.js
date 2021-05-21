import React, { Component } from 'react';
import { View, Text } from 'react-native';
import LoginOrCreateForm from './LoginOrCreateForm';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';


class Login extends Component {
    constructor(props) {
        super(props);
    }
  render() {

    return (
    
      <View style={{ flex: 1 }}>
        <LoginOrCreateForm 
          navigation = {this.props.navigation} 
        />
      </View>
    );
  }
}

export default Login;