import { StyleSheet, View, Alert, ScrollView, Button, Modal, Text, TextInput } from "react-native";
import { useState, useEffect } from "react";
import BadgerCard from "./BadgerCard";
import * as SecureStore from 'expo-secure-store';


function BadgerChatroomScreen(props) {
    const [messages, setMessages] = useState([]);
    const [modalVisible, setModalVisible] = useState(false);
    const [title, setTitle] = useState("");
    const [body, setBody] = useState("");
    
    // console.log(props.name);

    // console.log(title);
    // console.log(body);

    useEffect(() => {
        getMessages();
    }, []);

    function getMessages() {
        fetch(`https://cs571.org/s23/hw10/api/chatroom/${props.name}/messages`, {
            headers: {
                "X-CS571-ID": "bid_de8668351fa6f5b13671"
            }
        })
        .then(res => {
            if (res.status === 200 || res.status === 304) {
                return res.json();
            }
            Alert.alert("The specified chatroom does not exist. Chatroom names are case-sensitive");
            return null;
        })
        .then(data => data && setMessages(data.messages))
        .catch(e => console.error(e));
    };

    function createPost() {
        SecureStore.getItemAsync("token").then(token => {
            fetch(`https://cs571.org/s23/hw10/api/chatroom/${props.name}/messages`, {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${token}`,
                "Content-Type": "application/json",
                "X-CS571-ID": "bid_de8668351fa6f5b13671"
            },
            body: JSON.stringify({
                title: title,
                content: body
            })
        })
        .then(res => {
            if (res.status === 200) {
                Alert.alert("Successfully posted!");
                getMessages();
                return res.json();
            }
            console.log(res.status);
            return null;
        })
        .catch(e => console.error(e));
        });
        
        // fetch("https://cs571.org/s23/hw10/api/chatroom/:chatroomName/messages", {
        //     method: "POST",
        //     headers: {
        //         "Authorization": `Bearer ${jwt}`,
        //         "Content-Type": "application/json",
        //         "X-CS571-ID": "bid_de8668351fa6f5b13671"
        //     },
        //     body: JSON.stringify({
        //         title: title,
        //         content: body
        //     })
        // })
        // .then(res => {
        //     if (res.status === 200) {
        //         Alert.alert("Successfully posted!");
        //         getMessages();
        //         return res.json();
        //     }
        //     console.log(res.status);
        //     return null;
        // })
        // .catch(e => console.error(e));
    };

    // console.log(messages);

    return <>
    <ScrollView style={{ flex: 1 }}>
        {/* <Text style={{margin: 100}}>This is a chatroom screen!</Text> */}
        {
            messages.map(message => {
                return <BadgerCard
                    key={message.id}
                    title={message.title}
                    poster={message.poster}
                    date={new Date(message.created)}
                    content={message.content}
            ></BadgerCard>
            })
        }
    </ScrollView>
    { !props.isGuest &&
    <View style={styles.buttons}>
        <Button
            title="Add Post"
            onPress={() => setModalVisible(true)}
        ></Button>
        <Button
            title="Refresh"
            onPress={getMessages}
        ></Button>
    </View>
    }
    <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={modalVisible}>
        <View style={[styles.modalView, {
              justifyContent: 'center',
              alignItems: 'center',
              textAlign: 'center',
            }]}>
            <Text>Create a Post</Text>
            <Text>Title</Text>
            <TextInput
                placeholder="Enter Title"
                onChangeText={text => setTitle(text)}
                value={title}
            ></TextInput>
            <Text>Body</Text>
            <TextInput
                placeholder="Enter Body"
                onChangeText={text => setBody(text)}
                value={body}
            ></TextInput>
        </View>
        <Button
            title="Create Post"
            onPress={() => {
                createPost();
                setTitle("");
                setBody("");
            }}
            ></Button>
        <Button
            title="Cancel"
            onPress={() => {
                setModalVisible(false);
                setTitle("");
                setBody("");
            }}
        ></Button>
    </Modal>
    </>
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    buttons: {
        position: 'absolute',
        right: 10,
        left: 10,
        bottom: 10,
    },
    modalView: {
        margin: 20,
        backgroundColor: 'white',
        borderRadius: 20,
        padding: 35,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    }
});

export default BadgerChatroomScreen;