import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import { updateProfile } from '../../redux/ActionCreators';

const mapStateToProps = state => {
    return {
        portfolio: state.portfolio,
        cache: state.cache
    };
};

const mapDispatchToProps = {
    updateProfile: symbol => updateProfile(symbol)
};

class ShareOwnershipInfoSmall extends Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        const profile = this.props.cache.profiles.filter(profile => profile.symbol === this.props.stock.symbol)[0];

        if (!profile) {
            this.props.updateProfile(this.props.stock.symbol);
        }
    }

    render() {
        const { navigation } = this.props;

        const profile = this.props.cache.profiles.filter(profile => profile.symbol === this.props.stock.symbol)[0];
        const ownStock = this.props.portfolio.stocks.filter(stock => stock.symbol === this.props.stock.symbol)[0];

        const value = (ownStock.amount * profile.price).toFixed(2);
        const profit = ((ownStock.amount * profile.price) - ownStock.cost).toFixed(2);

        return (
            <TouchableOpacity
                style={
                    profit > 0 ? styles.containerGreen : profit < 0 ? styles.containerRed : styles.container
                }
                onPress={() => navigation.navigate("View Stock", {symbol: profile.symbol, stockName: profile.companyName})}
            >
                <View style={styles.nameContainer}>
                    <Text style={styles.symbolText}>{this.props.stock.symbol}</Text>
                    <Text>{profile.companyName}</Text>
                </View>
                <View style={styles.statsContainerOther}>
                    <View style={styles.statsContainerSmall}>
                        <Text style={styles.statsTextBold}>Shares</Text>
                        <Text style={styles.statsText}>{ownStock.amount}</Text>
                    </View>
                    <View style={styles.statsContainerSmall}>
                        <Text style={styles.statsTextBold}>Value</Text>
                        <Text style={styles.statsText}>${value}</Text>
                    </View>
                </View>
                <View style={styles.statsContainer}>
                    <Text style={styles.statsTextBold}>{profit >= 0 ? "Profit" : "Loss"}</Text>
                    <Text style={styles.statsText}>${Math.abs(profit).toFixed(2)}</Text>
                </View>
            </TouchableOpacity>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: "#FFFFBF",
        margin: 5,
        paddingHorizontal: 5,
        flexDirection: "row",
        borderRadius: 10,
    },
    containerGreen: {
        backgroundColor: "#BFFFBF",
        margin: 5,
        paddingHorizontal: 5,
        flexDirection: "row",
        borderRadius: 10,
    },
    containerRed: {
        backgroundColor: "#FFBFBF",
        margin: 5,
        paddingHorizontal: 5,
        flexDirection: "row",
        borderRadius: 10,
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
    },
    statsContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "flex-end",
        flexDirection: "column",
        padding: 5,
    },
    statsContainerOther: {
        flex: 1,
        justifyContent: "center",
        alignItems: "flex-end",
        flexDirection: "column",
        backgroundColor: "#00000010",
        padding: 5,
    },
    statsContainerSmall: {
        margin: 2,
    },
    priceTextUp: {
        fontSize: 18,
        fontWeight: "bold",
        color: "#00DD00",
    },
    priceTextDown: {
        fontSize: 18,
        fontWeight: "bold",
        color: "#DD0000",
    },
    statsText: {
        fontStyle: "italic",
        textAlign: "right",
    },
    statsTextBold: {
        fontWeight: "bold",
        textAlign: "right",
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(ShareOwnershipInfoSmall);