
// Keep this here!
import 'react-native-gesture-handler';

import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import BadgerLoginScreen from './components/BadgerLoginScreen';

import * as SecureStore from 'expo-secure-store';
import { useEffect, useState } from 'react';
import BadgerLandingScreen from './components/BadgerLandingScreen';
import BadgerChatroomScreen from './components/BadgerChatroomScreen';
import BadgerRegisterScreen from './components/BadgerRegisterScreen';
import { Alert } from 'react-native';
import BadgerLogoutScreen from './components/BadgerLogoutScreen';

const ChatDrawer = createDrawerNavigator();

export default function App() {

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isRegistering, setIsRegistering] = useState(false);
  const [chatrooms, setChatrooms] = useState([]);
  const [isGuest, setIsGuest] = useState(false);

  useEffect(() => {
    // hmm... maybe I should load the chatroom names here
    fetch("https://cs571.org/s23/hw10/api/chatroom", {
      headers: {
        "X-CS571-ID": "bid_de8668351fa6f5b13671"
      }
    })
    .then(res => res.json())
    .then(data => setChatrooms(data))
    .catch(e => console.error(e));
    // setChatrooms(["Hello", "World"]) // for example purposes only!
  }, []);

  // console.log(chatrooms);

  function handleLogin(username, password) {
    // hmm... maybe this is helpful!
    fetch("https://cs571.org/s23/hw10/api/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-CS571-ID": "bid_de8668351fa6f5b13671"
      },
      body: JSON.stringify({
        username: username,
        password: password
      })
    })
    .then(res => {
      if (res.status === 200) {
        setIsLoggedIn(true);
        return res.json();
      }
      if (res.status === 400) {
        Alert.alert("You must enter a username and password!");
      }
      if (res.status === 401) {
        Alert.alert("Incorrect password!");
      }
      if (res.status === 404) {
        Alert.alert("That user does not exist!");
      }
      return null;
    })
    .then(data => {
      // console.log(data.token);
      if (data !== null) SecureStore.setItemAsync("token", data.token);
      // setToken(data.token);
      // console.log(data.token)
    })
    .catch(e => console.error(e));
    // setIsLoggedIn(true); // I should really do a fetch to login first!
  };

  function handleSignup(username, password, repeatPassword) {
    // hmm... maybe this is helpful!
    // console.log(username);
    // console.log(password);
    // console.log(repeatPassword);
    if (password.length === 0) {
      Alert.alert("Please enter a password!");
      return;
    }

    if (password !== repeatPassword || repeatPassword.length === 0) {
      Alert.alert("Passwords do not match!");
      return;
    }

    fetch("https://cs571.org/s23/hw10/api/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-CS571-ID": "bid_de8668351fa6f5b13671"
      },
      body: JSON.stringify({
        username: username,
        password: password
      })
    })
    .then(res => {
      if (res.status === 200) {
        Alert.alert("Registration successful!");
        setIsLoggedIn(true);
        return res.json();
      }
      if (res.status === 400) {
        Alert.alert("You must enter a username and password!");
      }
      if (res.status === 409) {
        Alert.alert("The user already exists!");
      }
      if (res.status === 413) {
        Alert.alert("'username' must be 64 characters or fewer and 'password' must be 128 characters or fewer.");
      }
      return null;
    })
    .then(data => {
      // console.log(data.token);
      if (data !== null) SecureStore.setItemAsync("token", data.token);
    })
    .catch(e => console.error(e));
    // setIsLoggedIn(true); // I should really do a fetch to register first!
  }

  function handleLogout() {
    SecureStore.deleteItemAsync("token");
    setIsLoggedIn(false);
    // Alert.alert("Pressed logout!");
  };

  if (isLoggedIn) {
    return (
      <NavigationContainer>
        <ChatDrawer.Navigator>
          <ChatDrawer.Screen name="Landing" component={BadgerLandingScreen} />
          {
            chatrooms.map(chatroom => {
              return <ChatDrawer.Screen key={chatroom} name={chatroom}>
                {(props) => <BadgerChatroomScreen {...props} {...chatroom} name={chatroom} />}
              </ChatDrawer.Screen>
            })
          }
          <ChatDrawer.Screen name="Logout" 
            children={() => <BadgerLogoutScreen 
            handleLogout={handleLogout} />} 
            options={
              {drawerItemStyle: {
                backgroundColor: "#c6cbef"
              }}}
          />
        </ChatDrawer.Navigator>
      </NavigationContainer>
    );
  } else if (isRegistering) {
    return <BadgerRegisterScreen handleSignup={handleSignup} setIsRegistering={setIsRegistering} />
  } else {
    return <BadgerLoginScreen handleLogin={handleLogin} setIsRegistering={setIsRegistering} />
  }
}


