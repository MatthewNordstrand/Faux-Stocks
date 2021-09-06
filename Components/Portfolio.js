import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { STOCK_KEY } from '../shared/keys';

class PortfolioScreen extends Component {

    render() {
        return(
            <View style={styles.center}>
                <Text>This is your portfolio page.</Text>
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