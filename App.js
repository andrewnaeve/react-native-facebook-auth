import React from 'react';
import { StyleSheet, Text, View, Alert } from 'react-native';
import { appId } from './secrets/appkey';
import * as Expo from "expo";


export default class App extends React.Component {

componentWillMount() {

  (async () => {
    const { type, token } = await Expo.Facebook.logInWithReadPermissionsAsync(
      appId, {
        permissions: ['public_profile', 'user_friends'], 
      });
    if (type === 'success') {
      // Get the user's name using Facebook's Graph API
      const response = await fetch(`https://graph.facebook.com/me?access_token=${token}`);
      console.log('token', token)
      const id = (await response.json()).id
      const fwends = await fetch(`https://graph.facebook.com/v2.8/${id}/friends?access_token=${token}`);
      console.log('fwends', fwends)
      try { 
        await AsyncStorage.setItem('@Store:key', id)
      } catch (error) {
        console.log('error', error)
      }

      Alert.alert(
        'Logged in!',
        `Hi ${(await response.json()).name}!`,
      );
    }
    if (type === 'cancel') {
      Alert.alert(
        'Please log-in to continue'
      )
    }
  })();
}
  
  render() {
    return (
      <View style={styles.container}>
        <Text>Hellowo <Text style={styles.lovey} onPress={this.logIn}>Lodvey!</Text></Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    
  },
  lovey: {
    color: 'blue'
  }
});
