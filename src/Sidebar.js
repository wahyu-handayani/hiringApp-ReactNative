import React, { Component } from 'react';
import {TouchableOpacity} from 'react-native'
import { Container, Header, Title, Content, Footer, FooterTab, Button, Right, Body, Text } from 'native-base';
import AsyncStorage from '@react-native-community/async-storage';

export default class Sidebar extends Component {
  logout= async () =>{
    await AsyncStorage.removeItem('usertoken')
    await AsyncStorage.removeItem('email')
    await AsyncStorage.removeItem('id')
    // await AsyncStorage.removeItem('update')
    this.props.navigation.navigate('Login')
  }
  render() {

    return (
      <Container>
        <Header>
          <Body>
            <Title>Menu</Title>
          </Body>
          <Right />
        </Header>
        <Content padder>
        <Text></Text>
        <TouchableOpacity onPress={() => {
          this.props.navigation.navigate('UpdateProfile')
          }}>
          <Text>
            Update Data
          </Text>
          <Text></Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => {
          this.logout()
          }}>
          <Text>
            Log Out
          </Text>
          </TouchableOpacity>
        </Content>
        {/* <Footer>
          <FooterTab>
            <Button full>
              <Text>Footer</Text>
            </Button>
          </FooterTab>
        </Footer> */}
      </Container>
    );
  }
}