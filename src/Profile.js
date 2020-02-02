
import React, { Component } from 'react';
import {
  View,
  Text,
  Image,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ImageBackground,
  FlatList,
  ActivityIndicator,
  RefreshControl
} from 'react-native'

import SideBar from './Sidebar';
import { Drawer, Container, Item, Input, Button, Header, Left, Icon, Body, Title, Right, Content, Card, CardItem } from 'native-base'
import AsyncStorage from '@react-native-community/async-storage';
import axios from 'axios'


export default class Profile extends Component {
  state = {
    users: [],
    loading: false, // user list loading
    isRefreshing: false, //for pull to refresh
    errors: null
  };
  closeDrawer() {
    this._drawer._root.close()
  };
  openDrawer() {
    this._drawer._root.open()
  };


  onRefresh = async () => {



    this.setState({ isRefreshing: true });


    const token = await AsyncStorage.getItem('usertoken')
    const email = await AsyncStorage.getItem('email')


    console.log(token, 'jojooooo')
    console.log(token == null)
    if (token == null) {
      alert('inputan salah')
      this.props.navigation.navigate('Login')
    }

    console.log(email, 'Bismillah')
    const config = {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }
    axios
      .get(`http://192.168.6.195:8000/engineer/${email}`, config)
      .then(response => {
        console.log('dataaaaaaaaaaaaaaa', response)
        this.setState({
          isRefreshing: false,
          users: response.data.response
        });

        console.log(response.data.response, 'lssssssssssssssssssssssssssssssss')
        // console.log(JSON.stringify(response.data.response[0].id),'lll')
        AsyncStorage.setItem('id', JSON.stringify(response.data.response[0].id))

      })
      .catch(error => this.setState({
        isRefreshing: false,
        error
      }));
    // const cobaa = await AsyncStorage.getItem('id')
    // console.log(cobaa,'oouuuuuuuuuo')
  }
  render() {
    // const { users } = this.state

    return (
      <Drawer
        ref={(ref) => { this._drawer = ref; }}
        content={<SideBar navigation={this.props.navigation} />}
        onClose={() => this.closeDrawer()} >
        <Container>
          <Header>
            <Left>
              <Button transparent onPress={() => this.openDrawer()}>
                <Icon name='menu' />
              </Button>
            </Left>
            <Body>
              <Title>My Profile</Title>
            </Body>
            <Right />
          </Header>

          <ImageBackground source={require("./bgp.jpg")} style={{ width: '100%', height: '100%' }}>


            <FlatList
              data={this.state.users}
              showsVerticalScrollIndicator={false}
              refreshControl={
                <RefreshControl
                  refreshing={this.state.isRefreshing}
                  onRefresh={this.onRefresh.bind(this)}
                />
              }
              renderItem={({ item }) =>
                <View style={styles.flatview}>
                  <Image style={styles.imgprofile} source={require("./pr.jpg")} />
                  <Text style={styles.name}>{item.name}</Text>
                  <Text style={styles.email}>{item.email}</Text>
                  <View style={styles.itemprofile}>
                    <Image style={styles.imgitem} source={require("./star.png")} />
                    <Text style={styles.labelitem}>{item.skill}</Text>
                    <Text style={styles.sublabelitem}>Skill</Text>
                  </View>
                  <View style={styles.itemprofile}>
                    <Image style={styles.imgitem} source={require("./star.png")} />
                    <Text style={styles.labelitem}>{item.showcase}</Text>
                    <Text style={styles.sublabelitem}>Showcase</Text>
                  </View>
                  <View style={styles.itemprofile}>
                    <Image style={styles.imgitem} source={require("./star.png")} />
                    <Text style={styles.labelitem}>{item.location}</Text>
                    <Text style={styles.sublabelitem}>Location</Text>
                  </View>
                  <View style={styles.itemprofile}>
                    <Image style={styles.imgitem} source={require("./star.png")} />
                    <Text style={styles.labelitem}>{item.description}</Text>
                    <Text style={styles.sublabelitem}>Description</Text>
                  </View>

                  {/* <Text >{item.name}</Text>
            <Text >{item.email}</Text> */}
                </View>
              }
              keyExtractor={item => item.email}
            />





          </ImageBackground>


          {/* </Content> */}
        </Container>
      </Drawer>


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
  imgprofile: {
    marginTop: -2,
    marginLeft: 100,
    height: 120,
    width: 120
  },
  imgitem: {
    height: 30,
    width: 30
  },
  name: {
    // fontFamily:'Cochin',
    color: "black",
    fontSize: 22,
    marginTop: 4,
    marginLeft: 130,
  },
  email: {
    color: "black",
    fontSize: 16,
    marginTop: 1,
    marginLeft: 93,
    marginBottom: 10
  },
  itemprofile: {
    // marginTop:2,
    marginLeft: 50
  },
  labelitem: {
    marginTop: -7,
    marginLeft: 50,
    fontSize: 18,
    color: "blue",
    fontWeight: 'bold'
  },
  sublabelitem: {
    marginTop: -45,
    marginLeft: 50,
    marginBottom: 40,
    fontSize: 18,
    fontWeight: 'bold',
    color: "blue"
  }
})
