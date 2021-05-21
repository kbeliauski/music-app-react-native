import React, { Component } from 'react';
import { View, Text } from 'react-native';
import LoginOrCreateForm from './LoginOrCreateForm';

class Register extends Component {
  render() {
    return (
      <View style={{ flex: 1 }}>
        <LoginOrCreateForm create navigation = {this.props.navigation}/>
      </View>
    );
  }
}

export default Register;