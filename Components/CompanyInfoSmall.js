import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import Loading from './Loading';
import { updateProfile } from '../redux/ActionCreators';

const mapStateToProps = state => {
    return {
        cache: state.cache
    };
};

const mapDispatchToProps = {
    updateProfile: symbol => updateProfile(symbol)
};

class CompanyInfoSmall extends Component {
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

        return (
            <TouchableOpacity
                style={styles.container}
                onPress={() => navigation.navigate("View Stock", {symbol: this.props.stock.symbol, stockName: this.props.stock.name})}
            >
                <View style={styles.nameContainer}>
                    <Text style={styles.symbolText}>{this.props.stock.symbol}</Text>
                    <Text style={styles.nameText}>{this.props.stock.name}</Text>
                </View>
                <View style={styles.statsContainer}>
                    {profile && <Text style={styles.priceText}>{profile.price}</Text>}
                    {!profile && <Loading showText={false} />}
                </View>
            </TouchableOpacity>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: "#AAAAAA",
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
    },
    statsContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "flex-end",
    },
    priceText: {
        fontSize: 18,
        fontWeight: "bold"
    },
});

export default connect(mapStateToProps, mapDispatchToProps)(CompanyInfoSmall);