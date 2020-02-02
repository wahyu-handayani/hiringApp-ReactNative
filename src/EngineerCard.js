
import React, { Component } from 'react';
import {
    View,
    Text,
    Image,
    TextInput,
    TouchableOpacity,
    StyleSheet,
    ImageBackground,
    ScrollView
} from 'react-native'

import SideBar from './Sidebar';
import { Drawer, Container, Item, Input, Button, Header, Left, Icon, Body, Title, Right, Content, Card, CardItem } from 'native-base'
import AsyncStorage from '@react-native-community/async-storage';
import axios from 'axios'
import PTRView from 'react-native-pull-to-refresh';

export default class EngineerCard extends Component {
    state = {
        users: [],
        errors: null
    };

    async componentDidMount() {
        const token = await AsyncStorage.getItem('usertoken')
        const emailEng = await AsyncStorage.getItem('emailEng')


        console.log(token, 'jojooooo')
        console.log(token == null)

        console.log(emailEng, 'Bismillah yuuuuu')
        const config = {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
        axios
            .get(`http://192.168.6.195:8000/engineer/${emailEng}`, config)
            .then(response => {
                console.log('dataaaaaaaaaaaaaaa', response)
                this.setState({
                    users: response.data.response,
                });

                console.log(response.data.response, 'lssssssssssssssssssssssssssssssss')
                // console.log(JSON.stringify(response.data.response[0].id),'lll')

            })
            .catch(error => this.setState({ error }));
        // const cobaa = await AsyncStorage.getItem('id')
        // console.log(cobaa,'oouuuuuuuuuo')
    }
    render() {
        const { users } = this.state

        return (
            <Container>
                <Header>
                    <Left>
                        <Button transparent onPress={async () => {
                            await AsyncStorage.removeItem('emailEng')
                            this.props.navigation.navigate('Company')
                        }}>
                            <Icon name='home' />
                        </Button>
                    </Left>
                    <Body>
                        <Title>Engineer Data</Title>
                    </Body>
                    <Right />
                    <Right>
                        <Button transparent onPress={async () => {
                            await AsyncStorage.removeItem('email')
                            await AsyncStorage.removeItem('usertoken')
                            await AsyncStorage.removeItem('emailEng')
                            await AsyncStorage.removeItem('position')
                            this.props.navigation.navigate('Login')
                        }}>
                            <Icon name='home' />
                        </Button>
                    </Right>
                    <Left />
                </Header>

                <ImageBackground source={require("./bgp.jpg")} style={{ width: '100%', height: '100%' }}>
                    <ScrollView>
                        {users.map(user =>
                            <View key={user.id} style={styles.mainbody}>
                                <Image style={styles.imgprofile} source={require("./pr.jpg")} />
                                <Text style={styles.name}>{user.name}</Text>
                                <Text style={styles.email}>{user.email}</Text>
                                <View style={styles.itemprofile}>
                                    <Image style={styles.imgitem} source={require("./star.png")} />
                                    <Text style={styles.labelitem}>{user.skill}</Text>
                                    <Text style={styles.sublabelitem}>Skill</Text>
                                </View>
                                <View style={styles.itemprofile}>
                                    <Image style={styles.imgitem} source={require("./star.png")} />
                                    <Text style={styles.labelitem}>{user.showcase}</Text>
                                    <Text style={styles.sublabelitem}>Showcase</Text>
                                </View>
                                <View style={styles.itemprofile}>
                                    <Image style={styles.imgitem} source={require("./star.png")} />
                                    <Text style={styles.labelitem}>{user.location}</Text>
                                    <Text style={styles.sublabelitem}>Location</Text>
                                </View>
                                <View style={styles.itemprofile}>
                                    <Image style={styles.imgitem} source={require("./star.png")} />
                                    <Text style={styles.labelitem}>{user.description}</Text>
                                    <Text style={styles.sublabelitem}>Description</Text>
                                </View>
                            </View>

                        )}
                    </ScrollView>
                </ImageBackground>


                {/* </Content> */}
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
