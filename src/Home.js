// import React, {Component} from 'react';
// import {View, Text, TouchableOpacity} from 'react-native'

// export default class Home extends Component {
//   render(){
//     return(
//       <View>
//            <TouchableOpacity onPress={() => this.props.navigation.navigate('Profile')}>
//         <Text> HOMEEE 3</Text>
//         </TouchableOpacity>

//       </View>
//     )
//   }
// }


import React, { Component } from 'react'
import axios from 'axios'
import {
  View,
  Text,
  Image,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ImageBackground,
  Picker
} from 'react-native'
import { Item, Input, Button } from 'native-base'
// import ModalDropdown from 'react-native-modal-dropdown';
import AsyncStorage from '@react-native-community/async-storage';
// import { connect } from "react-redux";
// import { login } from "../Redux/Actions/users";
class Login extends Component {
  constructor() {
    super()
    this.state = {
      email: '',
      password: '',
      position: '',
      errors: {}
    }
    // this.onChangeText = this.onChangeText.bind(this) //function
    //this.submit = this.submit.bind(this)
  }
  updatePosition = (position) => {
    this.setState({ position: position })
 }
  onChangeText = (key, val) => {
    this.setState({ [key]: val })
  }
  submit() {
    // submit= async () =>{
    const data = {
      email: this.state.email,
      password: this.state.password,
      position: this.state.position
    }
    console.log('909090', data)

    axios
      .post('http:/192.168.43.132:8000/loginUser', data)
      .then(response => {
        console.log(JSON.parse(response.config.data).email, 'cobaaaaaaaaaaa')
        AsyncStorage.setItem('usertoken', response.data.token)
        // this.props.navigation.navigate('Login')
        if (this.state.position === 'company') {
          AsyncStorage.setItem('email', JSON.parse(response.config.data).email)
          AsyncStorage.setItem('position', JSON.parse(response.config.data).position)
          this.props.navigation.navigate('Company')
        } else {
          AsyncStorage.setItem('email', JSON.parse(response.config.data).email)
          AsyncStorage.setItem('position', JSON.parse(response.config.data).position)
          this.props.navigation.navigate('Profile')
        }
      })
      .catch(err => {
        alert(err)
      })

    // const dataku = await AsyncStorage.getItem('usertoken')
    // console.log('ini datakuuuuuuuuuuuuuuuuuuuuu', dataku)


  }

  render() {
    return (

      <ImageBackground source={require("./bg.jpg")} style={{ width: '100%', height: '100%' }}>
        {/* <Text>Inside</Text> */}



        {/* <View style={{height:667, backgroundColor: "hotpink"}}> */}
        <View style={styles.mainbody}>
          <Image style={styles.imgLogin} source={require("./home.png")} />
          <View>
            <Text style={styles.labeluser}>
              WELCOME
            </Text>

            <Item regular style={styles.inputuser}>
              <Input
                autoCapitalize="none"
                placeholder='Email'
                placeholderTextColor="white"
                style={{ color: "white" }}
                onChangeText={val => this.onChangeText('email', val)}
              />
            </Item>
          </View>
          <View>
            <Text style={styles.labeluser}>

            </Text>
            <Item regular style={styles.inputuser}>
              <Input
                secureTextEntry={true}
                placeholder='Password'
                placeholderTextColor="white"
                autoCapitalize="none"
                style={{ color: "white" }}
                onChangeText={val => this.onChangeText('password', val)} />
            </Item>
          </View>
          <View>
            <Text style={styles.labeluser}>

            </Text>
            <Item regular style={styles.inputuser}>
              {/* <Input 
              autoCapitalize="none" 
              placeholder='Position'
              placeholderTextColor="white"  
              style={{color:"white"}}
              onChangeText={val => this.onChangeText('position', val)}
              /> */}
              {/* <ModalDropdown style={{color:"white"}} options={['engineer', 'company']}/> */}
              <Picker
                selectedValue={this.state.position}
                style={{ height: 50, width: 300, color:"white" }}
                onValueChange = {this.updatePosition}>
                <Picker.Item label="Company" value="company" />
                <Picker.Item label="Engineer" value="engineer" />
              </Picker>
            </Item>
          </View>




          <Button onPress={() => {
              this.submit()
            }} style={styles.btnsignin} block>
              <Text style={styles.labelbtn} >
                SIGN IN
            </Text>
          </Button>

          <Button onPress={() => {
              this.props.navigation.navigate('Register')
            }} style={styles.btnsignin} block>
              <Text style={styles.labelbtn}>
                SIGN UP
            </Text>
          </Button>
        </View>
        {/* </View> */}
      </ImageBackground>


      // <View style={styles.container}>
      //   <TextInput
      //     style={styles.input}
      //     placeholder='Emailll'
      //     autoCapitalize="none"
      //     placeholderTextColor='white'
      //     onChangeText={val => this.onChangeText('email', val)}
      //   />
      //   <TextInput
      //     style={styles.input}
      //     placeholder='Password'
      //     secureTextEntry={true}
      //     autoCapitalize="none"
      //     placeholderTextColor='white'
      //     onChangeText={val => this.onChangeText('password', val)}
      //   />
      //   <TextInput
      //     style={styles.input}
      //     placeholder='Position'
      //     autoCapitalize="none"
      //     placeholderTextColor='white'
      //     onChangeText={val => this.onChangeText('position', val)}
      //   />
      //   <TouchableOpacity style={styles.btn} onPress={() => {
      //     // this.props.navigation.navigate('Profile')
      //     this.submit()
      //     }}>
      //     <Text>Log in</Text>
      //   </TouchableOpacity>
      //   <TouchableOpacity style={styles.btn} onPress={() => {
      //     this.props.navigation.navigate('Register')
      //     // this.submit()
      //     }}>
      //     <Text>Register</Text>
      //   </TouchableOpacity>
      // </View>
    )
  }
}

const styles = StyleSheet.create({
  mainbody: {
    marginTop: 30,
    marginLeft: 24,
    marginRight: 24,
    marginBottom: 70,
  },
  imglogin: {
    width: 190,
    height: 230,
    marginLeft: 60,
    marginTop: 40,
    marginBottom: 40
  },
  labeluser: {
    // fontFamily:'Cochin',
    fontSize: 20,
    color: "white",
    fontWeight: 'bold',
    marginBottom: 7,
    textAlign: 'center',
    marginLeft: 14,
  },
  inputuser: {
    width: 300,
    height: 50,
    borderColor: "white",
    backgroundColor: "transparent",
    borderRadius: 8,
    marginLeft: 14,
  },
  btnsignin: {
    width: 100,
    height: 40,
    marginLeft: 14,
    marginTop: 30,
    backgroundColor: "midnightblue"
  },
  labelbtn: {
    color: "#FFFFFF",
    fontSize: 22,
    fontWeight: "bold"
  }
})

// const mapStateToProps = state => {
//   return {
//     admin: state.login,
//     //*promo: state.promo,
//   };
// };
export default Login