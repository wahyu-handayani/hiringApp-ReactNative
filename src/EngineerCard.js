
import React, { Component } from 'react';
import {
    View,
    Text,
    Image,
    TextInput,
    TouchableOpacity,
    StyleSheet,
    TouchableWithoutFeedback,
    ImageBackground,
    ScrollView,
    Picker
} from 'react-native'
import Modal from 'react-native-modal';
import SideBar from './Sidebar';
import { Drawer, Container, Item, Input, Button, Header, Left, Icon, Body, Title, Right, Content, Card, CardItem } from 'native-base'
import AsyncStorage from '@react-native-community/async-storage';
import axios from 'axios'

export default class EngineerCard extends Component {
    state = {
        users: [],
        data: [],
        visibleModal: null,
        project: '',
        email_eng:'',
        errors: null
    };

    _renderButton = (text, onPress) => (
        <TouchableOpacity onPress={onPress}>
            <View style={styles.button}>
                <Text style={{fontSize:15,fontWeight:'bold',color:'blue'}}>{text}</Text>
            </View>
        </TouchableOpacity>
    );
    addProject = (project) => {
        this.setState({ project: project })
    }
    _renderModalContent = () => (
        < View style={styles.modalContent} >
            {/* <Text>Hello!</Text> */}
            <Picker
                selectedValue={this.state.project}
                style={{ height: 50, width: 300, color: "black" }}
                onValueChange={this.addProject}>
                {this.state.data.map(item =>
                    <Picker.Item key={item.id_project} label={item.project_name} value={item.id_project} />)}
            </Picker>
            {this._renderButton('Submit', async() => {
                this.setState({ visibleModal: null })
                console.log(this.state.project, '<<') //id project
                const emailEng = await AsyncStorage.getItem('emailEng')
                const token = await AsyncStorage.getItem('usertoken')
                const config = {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
                axios
                    .put(`http://192.168.43.132:8000/companyproject/${this.state.project}`, {email_eng:emailEng},config)
                    .then(response => {
                        console.log(response.data.response, 'AAAABBBBBBBBB')
                        this.props.navigation.navigate('Company')
                    })
                    .catch(error => this.setState({ error }));

            })}
        </View >
    );




    listProject = async () => {
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

                console.log(response.data.response, 'BBBBBBBBB')

            })
            .catch(error => this.setState({ error }));

    }

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
            .get(`http://192.168.43.132:8000/engineer/${emailEng}`, config)
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

        this.listProject();
    }
    render() {
        const { users } = this.state
        const { data } = this.state

        if (!this.state.modalVisible)

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
                            <Title>Engineer Data</Title>
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
                    
                    <Container >
                        
                        <ScrollView>
                        <View style={{flex: 1,justifyContent: 'center'}}>
                                {this._renderButton('H i r e', () => this.setState({ visibleModal: 1 }))}
                                <Modal isVisible={this.state.visibleModal === 1}>
                                    {this._renderModalContent()}
                                </Modal>
                            </View>
                            {users.map(user =>
                                <View key={user.id} style={styles.mainbody}>
                                    <Image style={{marginLeft: 100,height: 120,width: 120,borderRadius:100,borderColor:'#6698AD',borderWidth:2}} source={require("./profile.png")} />
                                    <Text style={styles.name}>{user.name}</Text>
                                    <Text style={styles.email}>{user.email}</Text>
                                    <View style={{backgroundColor:'#6698AD',borderRadius:15}}>
                                        <Card flexDirection="row" style={{elevation:0,borderColor:'#6698AD',marginLeft:20, backgroundColor:'transparent',borderRadius:10,width:280}}>
                                            <Text style={{marginLeft:7,fontSize:20}}>Skill: </Text>
                                            <Text style={{fontSize:17}}> {user.skill}</Text>
                                        </Card>
                                        <Card flexDirection="row" style={{elevation:0,borderColor:'#6698AD',marginLeft:20, backgroundColor:'transparent',borderRadius:10,width:280}}>
                                            <Text style={{marginLeft:7,fontSize:20}}>Showcase: </Text>
                                            <Text style={{fontSize:17}}> {user.showcase}</Text>
                                        </Card>
                                        <Card flexDirection="row" style={{elevation:0,borderColor:'#6698AD',marginLeft:20, backgroundColor:'transparent',borderRadius:10,width:280}}>
                                            <Text style={{marginLeft:7,fontSize:20}}>Address: </Text>
                                            <Text style={{fontSize:17}}> {user.location}</Text>
                                        </Card>
                                        <Card style={{elevation:0,borderColor:'#6698AD',marginLeft:20, backgroundColor:'transparent',borderRadius:10,width:280}}>
                                            <Text style={{marginLeft:7,fontSize:20}}>Description: </Text>
                                            <Text style={{fontSize:17,marginLeft:30,marginRight:10}}> {user.description}</Text>
                                        </Card>
                                    </View>
                                </View>

                            )}
                        </ScrollView>
                        </Container>
                </Container>
            )
    }
}
const styles = StyleSheet.create({
    mainbody: {
        marginLeft: 24,
        marginRight: 24,
        marginBottom: 70,
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
    },
    button: {
        backgroundColor: '#6698AD',
        padding: 12,
        margin: 8,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 15,
        borderColor: 'rgba(0, 0, 0, 0.1)',
    },
    modalContent: {
        backgroundColor: 'white',
        padding: 22,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 4,
        borderColor: 'rgba(0, 0, 0, 0.1)',
    },
    bottomModal: {
        justifyContent: 'flex-end',
        margin: 0,
    },

})
