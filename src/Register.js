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


import React from 'react'
import axios from 'axios'
import {Item, Input, Button} from 'native-base'
import {
  View,
  Text,
  Image,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ImageBackground,
  Alert,
  Picker
} from 'react-native'


export default class Register extends React.Component {
  state = {
    email: '',
    password: '',
    position: ''
  }
  updatePosition = (position) => {
    this.setState({ position: position })
 }
  onChangeText = (key, val) => {
    this.setState({ [key]: val })
  }
  
  submit(){

    const data =  {
      email: this.state.email,
      password: this.state.password,
      position:this.state.position
    }
    console.log('909090', data)

    axios
    .post('http://192.168.6.195:8000/regis', data)
    .then(response => {
      Alert.alert('ALHAMDULILLAH')
      this.props.navigation.navigate('Login')
    })
    .catch(err=>{
      Alert.alert('SABAR')
    })
  }
 
  render() {
    return (
      // <View style={styles.container}>
      //   <TextInput
      //     style={styles.input}
      //     placeholder='Email oooo'
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
          
      //     this.submit()
      //     }}>
      //     <Text>REGIS</Text>
      //   </TouchableOpacity>
      // </View>

<ImageBackground source={require("./bg5.jpg")} style={{width: '100%', height: '100%'}}>
    {/* <Text>Inside</Text> */}
  


      {/* <View style={{height:667, backgroundColor: "hotpink"}}> */}
        <View style={styles.mainbody}>
          <Image style={styles.imgLogin} source={require("./home.png")}/>
          <View>
            <Text style={styles.labeluser}>
              SIGN UP HERE
            </Text>

            <Item regular style={styles.inputuser}>
              <Input 
              autoCapitalize="none" 
              placeholder='Email'
              placeholderTextColor="white" 
              style={{color:"white"}}
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
              style={{color:"white"}}
              onChangeText={val => this.onChangeText('password', val)}/>
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
            <Text style={styles.labelbtn}>
              SIGN UP
            </Text>
          </Button>
        </View>
      {/* </View> */}
      </ImageBackground>



    )
  }
}

const styles = StyleSheet.create({
  mainbody: {
    marginTop:30,
    marginLeft: 24,
    marginRight: 24,
    marginBottom:70,
  },
  imglogin: {
    width:190,
    height: 230,
    marginLeft:60,
    marginTop:40,
    marginBottom: 40
  },
  labeluser:{
    // fontFamily:'Cochin',
    fontSize: 20,
    color:"white",
    fontWeight:'bold',
    marginBottom:7,
    textAlign:'center',
    marginLeft:14,
  },
  inputuser:{
    width: 300,
    height: 50,
    borderColor: "white",
    backgroundColor:"transparent",
    borderRadius:8,
    marginLeft: 14,
  },
  btnsignin:{
    width:100,
    height: 40,
    marginLeft: 14,
    marginTop: 30,
    backgroundColor: "darkblue"
  },
  labelbtn:{
    color:"#FFFFFF",
    fontSize:22,
    fontWeight:"bold"
  }
})
