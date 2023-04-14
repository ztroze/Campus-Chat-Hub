import { Pressable, StyleSheet, View, Text } from "react-native";

export default function BadgerCard(props) {
    return (<>
        {/* <Pressable
            style={styles.card}
            onPress={props.onPress}
            onLongPress={props.onLongPress}
        > */}
        <View style={[styles.card, props.style]}>
            {/* {props.children} */}
            <Text>{props.title}</Text>
            <Text>
                by {props.poster} | Posted on {props.date.getUTCMonth() + 1}
                /{props.date.getUTCDate()}/{props.date.getUTCFullYear()} at{" "}
                {props.date.getHours()}:{props.date.getMinutes()}:
                {props.date.getSeconds()}
            </Text>
            <Text>{props.content}</Text>
        </View>
        {/* </Pressable> */}
        </>
    );
}

const styles = StyleSheet.create({
    card: {
        padding: 16,
        elevation: 5,
        borderRadius: 10,
        backgroundColor: "slategray",
        marginTop: 20,
    }
});
