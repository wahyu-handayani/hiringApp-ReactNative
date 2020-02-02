

import React, { Component } from 'react';
import { StyleSheet, Text, View, SafeAreaView, ScrollView, Image, Picker, TouchableOpacity } from 'react-native';
import CardView from 'react-native-cardview';
import axios from 'axios'
import { Container, Content, Card, CardItem, Thumbnail, Button, Icon, Left, Body, Right, Header, Title, Item, Input } from 'native-base';
import AsyncStorage from '@react-native-community/async-storage';
import ModalDropdown from 'react-native-modal-dropdown';

export default class Company extends Component {
    constructor() {
        super();
        this.state = {
            sortby: '',
            search: '',
            limit: '',
            page: '',
            order: '',
            users: [],
            profileClicked: false,
            clickedName: '',
            errors: null
        }
    }

    onSearch = (key, val) => {
        this.setState({ [key]: val })
    }
    // onSortby = (key, val) => {
    //     this.setState({ [key]: val })
    // }
    updateSortby = (sortby) => {
        this.setState({ sortby: sortby })
    }
    updateOrder = (order) => {
        this.setState({ order: order })
    }
    // onOrder = (key, val) => {
    //     this.setState({ [key]: val })
    // }
    onPage = (key, val) => {
        this.setState({ [key]: val })
    }
    onLimit = (key, val) => {
        this.setState({ [key]: val })
    }


    async componentDidUpdate(_, prevState) {
        // await this.props.dispatch(pagination());
        // const paginate = await this.props.paginate;
        // console.log(paginate, 'paginationku')

        if (this.state.search !== prevState.search || this.state.sortby !== prevState.sortby || this.state.limit !== prevState.limit || this.state.page !== prevState.page || this.state.order !== prevState.order) {
            console.log('bedaaaa')

            const token = await AsyncStorage.getItem('usertoken')
            const email = await AsyncStorage.getItem('email')
            console.log(token, 'tokkkkkkk')
            console.log(email)
            const config = {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }

            axios
                .get(`http://192.168.6.195:8000/sort?search=${this.state.search}&sortby=${this.state.sortby}&limit=${this.state.limit}&page=${this.state.page}&order=${this.state.order}`, config)
                .then(response => {
                    console.log('ooook')
                    console.log(response)
                    console.log('data', response)
                    this.setState({
                        users: response.data.data,
                    });
                })
                .catch(error => alert('Data not found'));
        } else { console.log('sama') }
    }

    async componentDidMount() {
        const token = await AsyncStorage.getItem('usertoken')
        const email = await AsyncStorage.getItem('email')
        console.log(token, 'qqqqq')
        if (token == null) {
            alert('inputan salah')
            this.props.navigation.navigate('Login')
        }
        const config = {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }

        axios
            .get(`http://192.168.6.195:8000/sort`, config)
            .then(response => {
                console.log('ooook')
                console.log(response)
                console.log('daaaaaaaata', response)
                this.setState({
                    users: response.data.data,
                });
            })
            .catch(error => this.setState({ error }));
    }

    render() {
        const { users } = this.state
        return (
            <SafeAreaView style={styles.safeAreaView}>
                {/* <Header
                    placement="left"
                    leftComponent={{ icon: 'menu', color: '#fff' }}
                    centerComponent={{ text: 'MY TITLE', style: { color: '#fff' } }}
                    rightComponent={{ icon: 'home', color: '#fff' }}
                /> */}

                <Header>
                    <Left>
                        <Button transparent>
                            {/* <Button transparent onPress={() => this.openDrawer()}> */}
                            <Icon name='menu' />
                            <Body>
                                <Title>Pusat Bantuan</Title>
                            </Body>
                        </Button>
                    </Left>
                    <Right />
                    <Right>
                        <Button transparent onPress={async () => {
                            await AsyncStorage.removeItem('email')
                            await AsyncStorage.removeItem('usertoken')
                            await AsyncStorage.removeItem('position')
                            this.props.navigation.navigate('Login')
                        }}>
                            <Icon name='home' />
                        </Button>
                    </Right>
                    <Left />
                </Header>




                <Item regular style={styles.inputuser}>
                    <Input
                        autoCapitalize="none"
                        placeholder='Search...'
                        placeholderTextColor="white"
                        style={{ color: "white" }}
                        onChangeText={val => this.onSearch('search', val)}
                    />
                </Item>
                <View flexDirection="row">
                    <Item regular style={styles.inputuser21}>
                        {/* <Input
                            autoCapitalize="none"
                            placeholder='Sort by...'
                            placeholderTextColor="white"
                            style={{ color: "white" }}
                            onChangeText={val => this.onSortby('sortby', val)}
                        /> */}
                        <Picker
                            selectedValue={this.state.sortby}
                            style={{ height: 50, width: 170, color: "white" }}
                            onValueChange={this.updateSortby}>
                            <Picker.Item label="Sort by..." value="id" />
                            <Picker.Item label="Name" value="name" />
                            <Picker.Item label="Skill" value="skill" />
                            <Picker.Item label="Date Updated" value="updated" />
                        </Picker>
                    </Item>
                    <Item regular style={styles.inputuser22}>
                        {/* <Input
                            autoCapitalize="none"
                            placeholder='Order' 
                            placeholderTextColor="white"
                            style={{ color: "white" }}
                            onChangeText={val => this.onOrder('order', val)}
                        /> */}
                        <Picker
                            selectedValue={this.state.order}
                            style={{ height: 50, width: 170, color: "white" }}
                            onValueChange={this.updateOrder}>
                            <Picker.Item label="ASC" value="ASC" />
                            <Picker.Item label="DESC" value="DESC" />
                        </Picker>
                    </Item>
                </View>
                <View flexDirection="row" style={{ marginBottom: 8 }}>
                    <Item regular style={styles.inputuser21}>
                        <Input
                            autoCapitalize="none"
                            placeholder='Page'
                            placeholderTextColor="white"
                            style={{ color: "white" }}
                            onChangeText={val => this.onPage('page', val)}
                        />
                    </Item>
                    <Item regular style={styles.inputuser22}>
                        <Input
                            autoCapitalize="none"
                            placeholder='Limit'
                            placeholderTextColor="white"
                            style={{ color: "white" }}
                            onChangeText={val => this.onLimit('limit', val)}
                        />
                    </Item>
                </View>
                <ScrollView>
                    <View style={styles.container}>
                        {users.map(user => {
                            return (
                                <View flexDirection="row" key={user.id}>
                                    {/* <CardView
                                        cardElevation={0}
                                        cardMaxElevation={0}
                                        cornerRadius={5}
                                        style={styles.card}
                                    >
                                        <View>
                                            <Text>{user.name}</Text>
                                            <Text>{user.skill}</Text>
                                            <Text>{user.showcase}</Text>
                                        </View>
                                    </CardView> */}
                                    {/* submit = async () => { */}
                                    <TouchableOpacity style={styles.btn} onPress={async () => {
                                        await AsyncStorage.setItem('emailEng', user.email)
                                        const emailEng = await AsyncStorage.getItem('emailEng')
                                        console.log(emailEng, 'EMAAAAAAAAAAAAAAAAAAAL')
                                        this.props.navigation.navigate('EngineerCard')
                                    }}>
                                        <Card >
                                            <CardItem cardBody >
                                                <Image source={require('./bunga.jpg')} style={styles.foto} />

                                            </CardItem>
                                            <CardItem>
                                                <Body>
                                                    <Text>{user.name}</Text>
                                                    <Text>{user.skill}</Text>
                                                    <Text>{user.showcase}</Text>
                                                    <Text>{user.email}</Text>
                                                </Body>
                                            </CardItem>
                                        </Card>
                                    </TouchableOpacity>
                                </View>
                            )
                        })}
                    </View>
                </ScrollView>
            </SafeAreaView>
        );
    }
}

const styles = StyleSheet.create({
    safeAreaView: {
        flex: 1
    },
    container: {
        flex: 1
        // backgroundColor: '#EEEEEE',
    },
    container: {
        marginLeft: 15
    },
    card: {
        backgroundColor: 'pink',
        alignItems: 'center',
        justifyContent: 'center',
        alignSelf: 'center',
        flex: 1,
        margin: 10
    },
    text: {
        textAlign: 'center',
        margin: 10,
        height: 75
    },
    instructions: {
        textAlign: 'center',
        color: '#333333',
        marginBottom: 5
    },
    foto: {
        height: 200,
        width: 325
    },
    inputuser: {
        width: 335,
        height: 35,
        borderColor: "white",
        backgroundColor: "cadetblue",
        borderRadius: 8,
        marginLeft: 12,
        marginTop: 5
    },
    inputuser21: {
        width: 165,
        height: 35,
        borderColor: "white",
        backgroundColor: "cadetblue",
        borderRadius: 8,
        marginLeft: 12,
        marginTop: 5
    },
    inputuser22: {
        width: 165,
        height: 35,
        borderColor: "white",
        backgroundColor: "cadetblue",
        borderRadius: 8,
        marginLeft: 5,
        marginRight: 12,
        marginTop: 5
    }
});