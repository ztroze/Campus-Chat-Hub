import { useState } from "react";
import { Alert, Button, StyleSheet, Text, View, TextInput } from "react-native";

function BadgerLoginScreen(props) {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    return <View style={styles.container}>
        <Text style={{ fontSize: 36 }}>BadgerChat Login</Text>
        {/* <Text>Hmmm... I should add inputs here!</Text> */}
        <Text>Username</Text>
        <TextInput
            placeholder="Enter Username"
            onChangeText={text => setUsername(text)}
            value={username}
        ></TextInput>
        <Text>Password</Text>
        <TextInput
            placeholder="Enter Password"
            onChangeText={text => setPassword(text)}
            secureTextEntry={true}
            value={password}
        ></TextInput>
        <Button color="crimson" title="Login" onPress={() => {
            // Alert.alert("Hmmm...", "I should check the user's credentials first!");
            // props.handleLogin("myusername", "mypassword");
            props.handleLogin(username, password);
        }} />
        <Button color="grey" title="Signup" onPress={() => props.setIsRegistering(true)} />
    </View>;
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    }
});

export default BadgerLoginScreen;