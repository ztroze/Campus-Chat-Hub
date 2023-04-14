import { useState } from "react";
import { Alert, Button, StyleSheet, Text, View } from "react-native";
import { TextInput } from "react-native-gesture-handler";

function BadgerRegisterScreen(props) {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [repeatPassword, setRepeatPassword] = useState("");

    return <View style={styles.container}>
        <Text style={{ fontSize: 36 }}>Join BadgerChat!</Text>
        {/* <Text>Hmmm... I should add inputs here!</Text> */}
        <Text>Username</Text>
        <TextInput
            placeholder="Enter username"
            onChangeText={text => setUsername(text)}
            value={username}
        ></TextInput>
        <Text>Password</Text>
        <TextInput
            placeholder="Enter password"
            onChangeText={text => setPassword(text)}
            secureTextEntry={true}
            value={password}
        ></TextInput>
        <Text>Confirm Password</Text>
        <TextInput
            placeholder="Enter username"
            onChangeText={text => setRepeatPassword(text)}
            secureTextEntry={true}
            value={repeatPassword}
        ></TextInput>
        <Button color="crimson" title="Signup" onPress={() => props.handleSignup(username, password, repeatPassword)} />
        <Button color="grey" title="Nevermind!" onPress={() => props.setIsRegistering(false)} />
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

export default BadgerRegisterScreen;