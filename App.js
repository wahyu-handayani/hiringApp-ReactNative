/**
 * App.js
 *
 * Root component of the app, 
 * responsible for setting up routes.
 *
*/

// Libs
import React from 'react';
import { View, Text, Button } from 'react-native';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

// Components
import Login from './src/Home';
import Register from './src/Register';
import Profile from './src/Profile';
import UpdateProfile from './src/UpdateProfile';
import Company from './src/Company';
import EngineerCard from './src/EngineerCard';
import Project from './src/Project'
import ListProject from './src/ListProject'

/**
 * createStackNavigator
 *
 * Creates a stack of our routes.
 *
*/
const Navigator = createStackNavigator({
    Login: { screen: Login, navigationOptions:{
        headerShown: false
    }},
    Register: { screen: Register,navigationOptions:{
        headerShown: false
    }},
    Profile: { screen: Profile,navigationOptions:{
        headerShown: false
    }},
    UpdateProfile: { screen: UpdateProfile,navigationOptions:{
        headerShown: false
    }},
    Company: { screen: Company,navigationOptions:{
        headerShown: false
    }},
    EngineerCard: { screen: EngineerCard,navigationOptions:{
        headerShown: false
    }},
    Project: { screen: Project,navigationOptions:{
        headerShown: false
    }},
    ListProject: { screen: ListProject,navigationOptions:{
        headerShown: false
    }}
});

/**
 * createAppContainer
 *
 * Responsible for managing app state and linking
 * the top-level navigator to the app environment.
 *
*/
const App = createAppContainer(Navigator);

export default App;


// import React, { Component } from 'react';
// import {
//   Platform,
//   StyleSheet,
//   Text,
//   View
// } from 'react-native';
// // import { StackNavigator } from 'react-navigation';
// // import { createStackNavigator } from '@react-navigation/stack';
// import { createStackNavigator } from 'react-navigation-stack';
// import Settings from './screens/Settings';
// import Home from './screens/Home';

// const AppNavigator = createStackNavigator({
//   SettingScreen: { screen: Settings },
//   HomeScreen: { screen: Home }
// });

// export default class App extends Component {
//   render() {
//     return (
//       <AppNavigator />
//     );
//   }
// }

// import React, {Component} from 'react';
// import {View, Text} from 'react-native'

// export default class Login extends Component {
//   render(){
//     return(
//       <View>
//         <Text> Hello World</Text>
//       </View>
//     )
//   }
// }



// /**
//  * Sample React Native App
//  * https://github.com/facebook/react-native
//  *
//  * @format
//  * @flow
//  */

// import React from 'react';
// import {
//   SafeAreaView,
//   StyleSheet,
//   ScrollView,
//   View,
//   Text,
//   StatusBar,
// } from 'react-native';

// import {
//   Header,
//   LearnMoreLinks,
//   Colors,
//   DebugInstructions,
//   ReloadInstructions,
// } from 'react-native/Libraries/NewAppScreen';

// const App: () => React$Node = () => {
//   return (
//     <>
//       <StatusBar barStyle="dark-content" />
//       <SafeAreaView>
//         <ScrollView
//           contentInsetAdjustmentBehavior="automatic"
//           style={styles.scrollView}>
//           <Header />
//           {global.HermesInternal == null ? null : (
//             <View style={styles.engine}>
//               <Text style={styles.footer}>Engine: Hermes</Text>
//             </View>
//           )}
//           <View style={styles.body}>
//             <View style={styles.sectionContainer}>
//               <Text style={styles.sectionTitle}>Step One</Text>
//               <Text style={styles.sectionDescription}>
//                 Edit <Text style={styles.highlight}>App.js</Text> to change this
//                 screen and then come back. aulia sandie
//               </Text>
//             </View>
//             <View style={styles.sectionContainer}>
//               <Text style={styles.sectionTitle}>See Your Changes</Text>
//               <Text style={styles.sectionDescription}>
//                 <ReloadInstructions />
//               </Text>
//             </View>
//             <View style={styles.sectionContainer}>
//               <Text style={styles.sectionTitle}>Debug</Text>
//               <Text style={styles.sectionDescription}>
//                 <DebugInstructions />
//               </Text>
//             </View>
//             <View style={styles.sectionContainer}>
//               <Text style={styles.sectionTitle}>Learn More</Text>
//               <Text style={styles.sectionDescription}>
//                 Read the docs to discover what to do next:
//               </Text>
//             </View>
//             <LearnMoreLinks />
//           </View>
//         </ScrollView>
//       </SafeAreaView>
//     </>
//   );
// };

// const styles = StyleSheet.create({
//   scrollView: {
//     backgroundColor: Colors.lighter,
//   },
//   engine: {
//     position: 'absolute',
//     right: 0,
//   },
//   body: {
//     backgroundColor: Colors.white,
//   },
//   sectionContainer: {
//     marginTop: 32,
//     paddingHorizontal: 24,
//   },
//   sectionTitle: {
//     fontSize: 24,
//     fontWeight: '600',
//     color: Colors.black,
//   },
//   sectionDescription: {
//     marginTop: 8,
//     fontSize: 18,
//     fontWeight: '400',
//     color: Colors.dark,
//   },
//   highlight: {
//     fontWeight: '700',
//   },
//   footer: {
//     color: Colors.dark,
//     fontSize: 12,
//     fontWeight: '600',
//     padding: 4,
//     paddingRight: 12,
//     textAlign: 'right',
//   },
// });

// export default App;
