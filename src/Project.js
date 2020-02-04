import React, { Component } from 'react'
import axios from 'axios'
import { View, Text, TextInput, TouchableOpacity, ActivityIndicator, StyleSheet, Image } from 'react-native'
import { Drawer, Container, Header, Item, Body, Icon, Button, Title, Left, Right,Input } from 'native-base'
import AsyncStorage from '@react-native-community/async-storage';
export default class Project extends Component {
    constructor() {
        super()
        this.state = {
            id_project: '',
            project_name: '',
            description: '',
            email_com: '',
            status: 'pending',
            errors: {}
        }

    }

    logout = async () => {
        await AsyncStorage.removeItem('usertoken')
        await AsyncStorage.removeItem('email')
        await AsyncStorage.removeItem('position')
        await this.props.navigation.navigate('Login');
    }

    onChangeText = (key, val) => {
        this.setState({ [key]: val })
    }
    onSubmit = async (e) => {
        e.preventDefault()

        const token = await AsyncStorage.getItem("usertoken")
        const myemail = await AsyncStorage.getItem("email")
        console.log(token)
        const config = {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
        axios
            .post('http://192.168.43.132:8000/companyproject', {
                id_project: this.state.id_project,
                project_name: this.state.project_name,
                description: this.state.description,
                status: this.state.status,
                email_com: myemail
            }, config)
            .then(response => {
                console.log(response.data, '7777777')
                alert('sukses')
                this.props.navigation.navigate('Company')
            })
            .catch(err => {
                console.log(err)
            })
    }
    render() {
        return (
            <View>
                <Header style={{ backgroundColor: 'lightslategrey' }}>
                        <Left>
                            <Button transparent onPress={async () => {
                                await AsyncStorage.removeItem('emailEng')
                                this.props.navigation.navigate('Company')
                            }}>
                                <Icon name='ios-arrow-back' />
                            </Button>
                        </Left>
                        <Body>
                            <Title>Add Project</Title>
                        </Body>
                        
                        <Right>
                            <Button transparent onPress={async () => {
                                await AsyncStorage.removeItem('email')
                                await AsyncStorage.removeItem('usertoken')
                                await AsyncStorage.removeItem('emailEng')
                                await AsyncStorage.removeItem('position')
                                this.props.navigation.navigate('Login')
                            }}>
                                <Icon name='close' />
                            </Button>
                        </Right>
                    </Header>
                <Item regular style={{width: 335,height: 50,borderColor: "white",backgroundColor: "#6698AD",borderRadius: 8,marginLeft: 12,marginTop: 15, marginBottom:10}}>
                    <Input
                    autoCapitalize="none"
                    placeholder='ID Project'
                    placeholderTextColor="white"
                    onChangeText={val => this.onChangeText('id_project', val)}
                    />
                </Item>
                <Item regular style={{width: 335,height: 50,borderColor: "white",backgroundColor: "#6698AD",borderRadius: 8,marginLeft: 12,marginTop: 5, marginBottom:10}}>
                    <Input
                    autoCapitalize="none"
                    placeholder='Project Name'
                    placeholderTextColor="white"
                    onChangeText={val => this.onChangeText('project_name', val)}
                    />
                </Item>
                <Item regular style={{width: 335,height: 50,borderColor: "white",backgroundColor: "#6698AD",borderRadius: 8,marginLeft: 12,marginTop: 5, marginBottom:10}}>
                    <Input
                    autoCapitalize="none"
                    placeholder='Descrition'
                    placeholderTextColor="white"
                    onChangeText={val => this.onChangeText('description', val)}
                    />
                </Item>
                <Button
                    onPress={this.onSubmit}
                    style={{ width: 335,height: 50,borderColor: "white",backgroundColor: "lightslategrey",borderRadius: 8,marginLeft: 12,marginTop: 5, marginBottom:10}}>
                    <Text style={{ fontSize: 15, marginLeft: 150 }}>Save</Text>
                </Button>
                   
            </View>
        )
    }
}