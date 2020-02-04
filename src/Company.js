

import React, { Component } from 'react';
import { StyleSheet, Text, View, SafeAreaView, ScrollView, Image, Picker, TouchableOpacity,FlatList } from 'react-native';
import CardView from 'react-native-cardview';
import axios from 'axios'
import { Container, Content, Card, CardItem, Thumbnail, Button, Icon, Left, Body, Right, Header, Title, Item, Input } from 'native-base';
import AsyncStorage from '@react-native-community/async-storage';
import ActionButton from 'react-native-action-button';
import Icons from 'react-native-vector-icons/Ionicons';

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
                .get(`http://192.168.43.132:8000/sort?search=${this.state.search}&sortby=${this.state.sortby}&limit=${this.state.limit}&page=${this.state.page}&order=${this.state.order}`, config)
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
            .get(`http://192.168.43.132:8000/sort`, config)
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
        // const { users } = this.state
        return (
            <SafeAreaView style={styles.safeAreaView}>
                <Header style={{ backgroundColor: 'lightslategrey' }}>
                    <Left>
                        <Button transparent>
                            <Icon name='menu' />
                        </Button>
                    </Left>
                    <Body>
                        <Title>Home</Title>
                    </Body>
                    <Right>
                        <Button transparent onPress={async () => {
                            await AsyncStorage.removeItem('email')
                            await AsyncStorage.removeItem('usertoken')
                            await AsyncStorage.removeItem('position')
                            this.props.navigation.navigate('Login')
                        }}>
                            <Icon name='close' />
                        </Button>
                    </Right>
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
                {/* <View flexDirection="row">
                    <Item regular style={styles.inputuser21}>

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

                        <Picker
                            selectedValue={this.state.order}
                            style={{ height: 50, width: 170, color: "white" }}
                            onValueChange={this.updateOrder}>
                            <Picker.Item label="ASC" value="ASC" />
                            <Picker.Item label="DESC" value="DESC" />
                        </Picker>
                    </Item>
                </View> */}
                {/* <View flexDirection="row" style={{ marginBottom: 8 }}>
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
                </View> */}
                <Button onPress={() => { this.props.navigation.navigate('Project') }} regular style={{ width: 332, height: 35, borderColor: "white", backgroundColor: "#6698AD", borderRadius: 8, marginLeft: 14, marginTop: 8,marginBottom:10 }}>
                    <Text style={{ marginLeft: 125, color: 'white', fontSize: 16 }}>Add Project</Text>
                </Button>
                <View style={{ flex: 1, backgroundColor: '#f3f3f3' }}>
                    {/* Rest of the app comes ABOVE the action button component !*/}

                    <ScrollView>
                        <View style={styles.container}>
                            <FlatList
                                data={this.state.users}
                                showsVerticalScrollIndicator={false}
                                numColumns={2}
                                renderItem={({ item }) =>
                                // style={{justifyContent:'space-between'}}
                                    <View >
                                        {console.log(item,'lll')}
                                        <TouchableOpacity style={styles.btn} onPress={async () => {
                                            await AsyncStorage.setItem('emailEng', item.email)
                                            const emailEng = await AsyncStorage.getItem('emailEng')
                                            console.log(emailEng, 'EMAAAAAAAAAAAAAAAAAAAL')
                                            this.props.navigation.navigate('EngineerCard')
                                        }}>
                                            <Card style={{borderRadius:20,width:160}}>
                                                <CardItem cardBody >
                                                    <Image source={require('./profile.jpg')} style={{height: 170,width: 160,borderTopLeftRadius:20,borderTopRightRadius:20,borderWidth:5}} />
                                                </CardItem>
                                                <CardItem style={{borderRadius:50}}>
                                                    <Body>
                                                        <Text>Name: {item.name}</Text>
                                                        <Text>Skill: {item.skill}</Text>
                                                        <Text>Showcase: {item.showcase}</Text>
                                                    </Body>
                                                </CardItem>
                                            </Card>
                                        </TouchableOpacity>
                                    </View>
                                }
                                keyExtractor={item => item.email}
            />
                        </View>

                    </ScrollView>
                    <ActionButton buttonColor="rgba(231,76,60,1)">
                        <ActionButton.Item buttonColor='#9b59b6' title="Sort by name" onPress={() => { this.setState({ sortby: 'name' }) }}>
                            <Icons name="ios-checkmark-circle-outline" style={styles.actionButtonIcon} />
                        </ActionButton.Item>
                        <ActionButton.Item buttonColor='#3498db' title="Skill" onPress={() => { this.setState({ sortby: 'skill' }) }}>
                            <Icons name="ios-checkmark" style={styles.actionButtonIcon} />
                        </ActionButton.Item>
                        <ActionButton.Item buttonColor='#1abc9c' title="Date updated" >
                            <Icons name="md-done-all" style={styles.actionButtonIcon} onPress={() => { this.setState({ sortby: 'updated' }) }} />
                        </ActionButton.Item>
                    </ActionButton>
                </View>
            </SafeAreaView>
        );
    }
}

const styles = StyleSheet.create({
    safeAreaView: {
        flex: 1
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
        margin: 5
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
    inputuser: {
        width: 335,
        height: 35,
        borderColor: "white",
        backgroundColor: "#6698AD",
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
    },
    actionButtonIcon: {
        fontSize: 20,
        height: 22,
        color: 'white',
    },
});