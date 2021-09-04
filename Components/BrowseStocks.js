import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';

class BrowseScreen extends Component {

    render() {
        return(
            <View style={styles.center}>
                <Text>This is where you can view stocks.</Text>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    center: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center"
    }
});

export default BrowseScreen;