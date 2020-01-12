
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
// import PTRView from 'react-native-pull-to-refresh';

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

  // refresh() {
  //   return new Promise((resolve) => {
  //     setTimeout(() => { resolve() }, 2000)
  //   });
  // }



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
      .get(`http://192.168.100.6:8000/engineer/${email}`, config)
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

          {/* <View>
                <TouchableOpacity onPress={() => this.props.navigation.navigate('Profile')}>
                <Text> Diisi Profil</Text>
                </TouchableOpacity>
            </View> */}

          {/* <Content padder> */}
          {/* <Card>
                    <CardItem header>
                        <Text>PROFILKU ADALAH:...</Text>
                    </CardItem>
                    <CardItem>
                        <Body>
                            <Text>PROFIL</Text>
                            
                        </Body>
                    </CardItem>
                </Card> */}
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


// https://medium.com/@iqbalkurniawan/membuat-drawer-pada-react-native-dengan-nativebase-a3420ae44a17
// import React, { Component } from 'react';
// import { View } from 'react-native';
// import { Card, Drawer, CardItem, Container, Header, Title, Content, Footer, FooterTab, Button, Left, Right, Body, Icon, Text } from 'native-base';
// import SideBar from '../SideBar/Sidebar';
// export default class Profile extends Component {

//     closeDrawer() {
//         this._drawer._root.close()
//     };
//     openDrawer() {
//         this._drawer._root.open()
//     };

//     render() {
//         return (
//             <Drawer
//                 ref={(ref) => { this._drawer = ref; }}
//                 content={<SideBar navigator={this.navigator} />}
//                 onClose={() => this.closeDrawer()} >
//             <Container>
//                 <Header>
//                     <Left>
//                         <Button transparent onPress={()=>this.openDrawer()}>
//                             <Icon name='menu' />
//                         </Button>
//                     </Left>
//                     <Body>
//                         <Title>Tutorial Drawer</Title>
//                     </Body>
//                     <Right />
//                 </Header>
//                 <Content padder>
//                     <Card>
//                         <CardItem header>
//                             <Text>Kumpulan Program Inkubator dan Akselerator Startup di Indonesia</Text>
//                         </CardItem>
//                         <CardItem>
//                             <Body>
//                                 <Text>
//                                     Di samping investor, keberadaan program inkubasi dan akselerator merupakan faktor penggerak tumbuhnya ekosistem startup teknologi . Meski secara garis besar berbeda, kedua hal tersebut memiliki tujuan yang sama, yakni mempercepat perkembangan startup, terutama dari segi kesiapan model bisnis, penyempurnaan konsep produk, dan lain-lain.
//                                 </Text>
//                             </Body>
//                         </CardItem>
//                         <CardItem footer>
//                             <Text>Tech in Asia</Text>
//                         </CardItem>
//                     </Card>
//                 </Content>
//                 <Footer>
//                     <FooterTab>
//                         <Button full>
//                             <Text>Footer</Text>
//                         </Button>
//                     </FooterTab>
//                 </Footer>
//             </Container>
//             </Drawer>
//         );
//     }
// }
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
