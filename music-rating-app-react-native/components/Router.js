import 'react-native-gesture-handler';
import React, {Component} from 'react';
import Login from './Login';
import Register from './Register';
import Home from './Home.js';
import LoginOrCreateForm from "./LoginOrCreateForm"
import * as SecureStore from 'expo-secure-store';
import { createNativeStackNavigator } from 'react-native-screens/native-stack';
import { Button } from 'react-native'
import { NavigationContainer } from '@react-navigation/native';
import AuthService from "./Authentication"
import authHeader from './Auth-Header';
import SongList from "./SongList";
import RatingForm from './RatingForm';


const Stack = createNativeStackNavigator();



function Router() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen 
            key = "login"
            name="Log In" 
            options = {{ 
              headerLargeTitle: true, 
              title: "Log In" , 
              backButtonInCustomView: false}}
            component={Login}
          />
        <Stack.Screen
            options = { ({ 
              navigation,
              route }) => ({
                headerLargeTitle: true, 
                title: "Song Ratings", 
                headerHideBackButton: true,
                headerRight: () => (
                  <Button
                    onPress={() => {
                      navigation.navigate("Log In")
                      AuthService.logout()
                      console.log(AuthService.getCurrentUser())
                    }
                    }
                    title="Log Out"
                    color="#8C1941"
                  />
                ),
              })
            }
            name="Home"
            key="main"
            type="reset"
            component={Home}
          />
        <Stack.Screen
          name = "Register"
          component = {Register}
          options = {{
            headerLargeTitle: true, 
            title: "Register", 
          }}
        
          
        />
          
        
        <Stack.Screen
          name = "RatingForm"
          component = {RatingForm}
          options = { ({ 
            navigation,
            route }) => ({
            headerLargeTitle: true, 
              title: "Rate the Song" ,
            })}
          
        />

      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default Router;


