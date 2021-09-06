import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';

class CompanyInfoSmall extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <View style={styles.container}>
                <Text>Info</Text>
                <Text>{this.props.stock.symbol}</Text>
                <Text>{this.props.stock.name}</Text>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: "#FF0000",
        margin: 5,
    }
});

export default CompanyInfoSmall;