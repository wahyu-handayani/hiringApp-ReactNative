
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
    ScrollView,
    RefreshControl
} from 'react-native'

import SideBar from './Sidebar';
import { Drawer, Container, Item, Input, Button, Header, Left, Icon, Body, Title, Right, Content, Card, CardItem } from 'native-base'
import AsyncStorage from '@react-native-community/async-storage';
import axios from 'axios'


export default class ListProject extends Component {
    state = {
        data: [],
        error: null
    };
    async componentDidMount() {
        const email = await AsyncStorage.getItem('email')
        const token = await AsyncStorage.getItem('usertoken')
        const config = {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
        axios
            .get(`http://192.168.43.132:8000/companyproject/${email}`, config)
            .then(response => {
                // console.log('dataaaaaaaaaaaaaaa', response)
                this.setState({
                    data: response.data.response,
                });

                console.log(response.data.response, ';;;;')

            })
            .catch(error => this.setState({ error }));
    }
    render() {

        return (

            <Container>
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
                        <Title>List of Project</Title>
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
                <ScrollView>
                    <FlatList
                        data={this.state.data}
                        showsVerticalScrollIndicator={false}
                        renderItem={({ item }) =>
                            <Card style={{ backgroundColor: '#6698AD', marginTop: 15, marginLeft: 15, marginRight: 15, borderRadius: 10 }}>
                                <Text style={{ marginLeft: 15, marginTop: 10, fontSize: 15 }}>Project Name: {item.project_name}</Text>
                                <Text style={{ marginLeft: 15, marginTop: 10, fontSize: 15 }}>Description: {item.description}</Text>
                                <Text style={{ marginLeft: 15, marginTop: 10, fontSize: 15 }}>Engineer email: {item.email_eng}</Text>
                                <Text style={{ marginLeft: 15, marginTop: 10, marginBottom: 15, fontSize: 15 }}>Status project: {item.status}</Text>
                            </Card>
                        }
                        keyExtractor={item => item.id_project}
                    />
                </ScrollView>
            </Container>
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
