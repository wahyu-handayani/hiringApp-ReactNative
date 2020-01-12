import React, { Component } from 'react'
import axios from 'axios'
import {
  View,
  Text,
  Image,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ImageBackground, ScrollView, SafeAreaView
} from 'react-native'
import SideBar from './Sidebar';
// import {AsyncStorage} from '@react-native-community/async-storage';
import AsyncStorage from '@react-native-community/async-storage';

import { Drawer, Container, Item, Input, Button, Header, Left, Icon, Body, Title, Right, Content, Card, CardItem } from 'native-base'

class UpdateProfile extends Component {
  state = {
    id: '',
    name: '',
    description: '',
    skill: '',
    location: '',
    birth: '',
    showcase: '',
    email: ''
  }
  closeDrawer() {
    this._drawer._root.close()
  };
  openDrawer() {
    this._drawer._root.open()
  };
  onChangeText = (key, val) => {
    this.setState({ [key]: val })
  }






  submit = async () => {
    const token = await AsyncStorage.getItem('usertoken')
    const myemail = await AsyncStorage.getItem('email')
    console.log(token)
    const config = {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }
    const myId = await AsyncStorage.getItem('id')
    console.log(myId, 'idddddddddddddddddddddddddddddddddddd')
    // const myId = await AsyncStorage.getItem('id')
    if (myId !== null) {
      axios
        .put(`http://192.168.100.6:8000/engineer/${myemail}`, {
          id: this.state.id,
          name: this.state.name,
          description: this.state.description,
          skill: this.state.skill,
          location: this.state.location,
          birth: this.state.birth,
          showcase: this.state.showcase,
          email: myemail
        }, config)
        .then(response => {

          // localStorage.setItem('usertoken', response.data.token)
          // console.log(response.data)
          console.log(response.data, 'wwwwwwwwwwwwwwwwwwwwwwwwwwww')
          // AsyncStorage.setItem('update','ok')
          this.props.navigation.navigate('Profile')
          


        })
        .catch(err => {
          //   console.log(localStorage.getItem("usertoken"))
          console.log(err)
        })

    } else {
      axios
        .post('http://192.168.100.6:8000/engineer', {
          id: this.state.id,
          name: this.state.name,
          description: this.state.description,
          skill: this.state.skill,
          location: this.state.location,
          birth: this.state.birth,
          showcase: this.state.showcase,
          email: myemail
        }, config)
        .then(response => {

          // localStorage.setItem('usertoken', response.data.token)
          // console.log(response.data)
          console.log(response.data, 'kkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkk')
          this.props.navigation.navigate('Profile')


        })
        .catch(err => {
          //   console.log(localStorage.getItem("usertoken"))
          console.log(err)
        })

    }

  }
  render() {
    return (
      // <Drawer
      //     ref={(ref) => { this._drawer = ref; }}
      //     content={<SideBar navigation={this.props.navigation} />}
      //     onClose={() => this.closeDrawer()} >
      //     <Container>
      //     <Header>
      //         <Left>
      //             <Button transparent onPress={()=>this.openDrawer()}>
      //                 <Icon name='menu' />
      //             </Button>
      //         </Left>
      //         <Body>
      //             <Title>My Profile</Title>
      //         </Body>
      //         <Right />
      //     </Header>
      <ImageBackground source={require("./bg.jpg")} style={{ width: '100%', height: '100%' }}>
        <SafeAreaView style={styles.container}>
          <ScrollView style={styles.scrollView}>
            <View>
              <Text style={styles.labeluser}>
                Fill The Data
            </Text>

              <Item regular style={styles.inputuser}>
                <Input
                  autoCapitalize="none"
                  placeholder='Id'
                  placeholderTextColor="white"
                  style={{ color: "white" }}
                  onChangeText={val => this.onChangeText('id', val)}
                />
              </Item>
            </View>
            <View>
              <Text style={styles.labeluser}></Text>
              <Item regular style={styles.inputuser}>
                <Input
                  autoCapitalize="none"
                  placeholder='Name'
                  placeholderTextColor="white"
                  style={{ color: "white" }}
                  onChangeText={val => this.onChangeText('name', val)}
                />
              </Item>
            </View>
            <View>
              <Text style={styles.labeluser}></Text>
              <Item regular style={styles.inputuser}>
                <Input
                  autoCapitalize="none"
                  placeholder='Description'
                  placeholderTextColor="white"
                  style={{ color: "white" }}
                  onChangeText={val => this.onChangeText('description', val)}
                />
              </Item>
            </View>
            <View>
              <Text style={styles.labeluser}></Text>
              <Item regular style={styles.inputuser}>
                <Input
                  autoCapitalize="none"
                  placeholder='Skill'
                  placeholderTextColor="white"
                  style={{ color: "white" }}
                  onChangeText={val => this.onChangeText('skill', val)}
                />
              </Item>
            </View>
            <View>
              <Text style={styles.labeluser}></Text>
              <Item regular style={styles.inputuser}>
                <Input
                  autoCapitalize="none"
                  placeholder='Location'
                  placeholderTextColor="white"
                  style={{ color: "white" }}
                  onChangeText={val => this.onChangeText('location', val)}
                />
              </Item>
            </View>
            <View>
              <Text style={styles.labeluser}></Text>
              <Item regular style={styles.inputuser}>
                <Input
                  autoCapitalize="none"
                  placeholder='Birth'
                  placeholderTextColor="white"
                  style={{ color: "white" }}
                  onChangeText={val => this.onChangeText('birth', val)}
                />
              </Item>
            </View>
            <View>
              <Text style={styles.labeluser}></Text>
              <Item regular style={styles.inputuser}>
                <Input
                  autoCapitalize="none"
                  placeholder='Showcase'
                  placeholderTextColor="white"
                  style={{ color: "white" }}
                  onChangeText={val => this.onChangeText('showcase', val)}
                />
              </Item>
            </View>
            <View>
              <Text style={styles.labeluser}></Text>
              <Item regular style={styles.inputuser}>
                <Input
                  autoCapitalize="none"
                  placeholder='Email'
                  placeholderTextColor="white"
                  style={{ color: "white" }}
                  onChangeText={val => this.onChangeText('email', val)}
                />
              </Item>
              <Button onPress={() => {
                  this.submit()
                }} style={styles.btnsignin} block>
                  <Text style={styles.labelbtn}>
                    SAVE
            </Text>
              </Button>
            </View>
          </ScrollView>
        </SafeAreaView>
      </ImageBackground>
      // </Container>
      //     </Drawer>
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
    width: 335,
    height: 50,
    borderColor: "white",
    backgroundColor: "transparent",
    borderRadius: 8,
    marginLeft: 14,
  },
  btnsignin: {
    width: 335,
    height: 40,
    marginLeft: 14,
    marginTop: 30,
    backgroundColor: "midnightblue"
  },
  labelbtn: {
    color: "#FFFFFF",
    fontSize: 22,
    fontWeight: "bold"
  },
  scrollView: {
    backgroundColor: 'transparent',
    // marginHorizontal: 20,
  }
})

// const mapStateToProps = state => {
//   return {
//     admin: state.login,
//     //*promo: state.promo,
//   };
// };
export default UpdateProfile