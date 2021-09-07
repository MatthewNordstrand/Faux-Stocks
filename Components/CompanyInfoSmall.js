import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';

class CompanyInfoSmall extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const { navigation } = this.props;

        return (
            <View style={styles.container} onStartShouldSetResponder={() => navigation.navigate("View Stock", {symbol: this.props.stock.symbol, stockName: this.props.stock.name})}>
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