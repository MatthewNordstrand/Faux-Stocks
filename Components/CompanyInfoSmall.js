import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';

class CompanyInfoSmall extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const { navigation } = this.props;

        return (
            <View
                style={styles.container}
                onStartShouldSetResponder={() => navigation.navigate("View Stock", {symbol: this.props.stock.symbol, stockName: this.props.stock.name})}
            >
                <View style={styles.nameContainer}>
                    <Text style={styles.symbolText}>{this.props.stock.symbol}</Text>
                    <Text style={styles.nameText}>{this.props.stock.name}</Text>
                </View>
                <View style={styles.statsContainer}>
                    <Text>Hi</Text>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: "#FF0000",
        margin: 5,
        padding: 5,
        flexDirection: "row",
    },
    symbolText: {
        fontSize: 24,
        fontWeight: "bold"
    },
    nameText: {
        fontSize: 12,
    },
    nameContainer: {
        flex: 2,
        backgroundColor: "#00FF00",
    },
    statsContainer: {
        flex: 1,
        backgroundColor: "#0000FF",
        justifyContent: "center",
        alignItems: "flex-end",
    },
});

export default CompanyInfoSmall;