import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';

class PortfolioScreen extends Component {

    render() {
        return(
            <View style={styles.center}>
                <Text>This is your portfolio screen.</Text>
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

export default PortfolioScreen;