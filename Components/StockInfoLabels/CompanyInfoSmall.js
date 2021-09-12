import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Icon } from 'react-native-elements';
import { connect } from 'react-redux';
import Loading from '../Loading';
import { updateProfile } from '../../redux/ActionCreators';

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
                style={
                    profile ? (profile.changes >= 0 ? styles.containerGreen : styles.containerRed) : styles.container
                }
                onPress={() => navigation.navigate("View Stock", {symbol: this.props.stock.symbol, stockName: this.props.stock.name})}
            >
                <View style={styles.nameContainer}>
                    <Text style={styles.symbolText}>{this.props.stock.symbol}</Text>
                    <Text style={styles.nameText}>{this.props.stock.name}</Text>
                </View>
                <View style={styles.statsContainer}>
                    {profile &&
                        <>
                            <Icon
                                type="ionicon"
                                name={profile.changes >= 0 ? "caret-up" : "caret-down"}
                                color={profile.changes >= 0 ? "#00DD00" : "#DD0000"}
                                size={20}
                            />
                            <Text style={profile.changes >= 0 ? styles.priceTextUp : styles.priceTextDown}>{profile.price}</Text>
                        </>
                    }
                    {!profile && <Loading showText={false} />}
                </View>
            </TouchableOpacity>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: "#FFFFFF",
        margin: 5,
        padding: 5,
        flexDirection: "row",
    },
    containerGreen: {
        backgroundColor: "#BFFFBF",
        margin: 5,
        padding: 5,
        flexDirection: "row",
    },
    containerRed: {
        backgroundColor: "#FFBFBF",
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
        justifyContent: "flex-end",
        alignItems: "center",
        flexDirection: "row",
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
});

export default connect(mapStateToProps, mapDispatchToProps)(CompanyInfoSmall);