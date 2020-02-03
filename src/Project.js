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
                <Header style={{ backgroundColor: 'blue', width: 360, height: 50, marginBottom: 20 }}>
                    <Left>
                        <Button transparent onPress={() => { this.logout() }}>
                            <Icon name='close' style={{ color: 'white' }} />
                        </Button>
                    </Left>
                    <Body>
                        <Title >Add Project</Title>
                    </Body>
                    <Right />

                </Header>
                <Item regular style={{width: 335,height: 50,borderColor: "white",backgroundColor: "cadetblue",borderRadius: 8,marginLeft: 12,marginTop: 5, marginBottom:10}}>
                    <Input
                    autoCapitalize="none"
                    placeholder='ID Project'
                    placeholderTextColor="white"
                    onChangeText={val => this.onChangeText('id_project', val)}
                    />
                </Item>
                <Item regular style={{width: 335,height: 50,borderColor: "white",backgroundColor: "cadetblue",borderRadius: 8,marginLeft: 12,marginTop: 5, marginBottom:10}}>
                    <Input
                    autoCapitalize="none"
                    placeholder='Project Name'
                    placeholderTextColor="white"
                    onChangeText={val => this.onChangeText('project_name', val)}
                    />
                </Item>
                <Item regular style={{width: 335,height: 50,borderColor: "white",backgroundColor: "cadetblue",borderRadius: 8,marginLeft: 12,marginTop: 5, marginBottom:10}}>
                    <Input
                    autoCapitalize="none"
                    placeholder='Descrition'
                    placeholderTextColor="white"
                    onChangeText={val => this.onChangeText('description', val)}
                    />
                </Item>
                <Button
                    onPress={this.onSubmit}
                    style={{ width: 335,height: 50,borderColor: "white",backgroundColor: "red",borderRadius: 8,marginLeft: 12,marginTop: 5, marginBottom:10}}>
                    <Text style={{ fontSize: 15, marginLeft: 150 }}>Save</Text>
                </Button>
                   
            </View>
        )
    }
}