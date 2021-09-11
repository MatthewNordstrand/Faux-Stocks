import React, { useState } from 'react';
import { ScrollView, View, Text, StyleSheet } from 'react-native';
import { Image, Input, Button } from 'react-native-elements';
import { connect } from 'react-redux';
import Loading from './Loading';
import { Icon } from 'react-native-elements';
import { portfolio } from '../redux/portfolio';

const mapStateToProps = state => {
    return {
        portfolio: state.portfolio,
        cache: state.cache
    };
};

function ViewStockPage(props) {
    const {route, navigation} = props;
    const { symbol } = route.params;

    const [shares, setShares] = useState(0);

    const profile = props.cache.profiles.filter(profile => profile.symbol === symbol)[0];

    if (!profile) {
        return (
            <View style={styles.loadingContainer}>
                <Loading />
            </View>
        );
    }

    return (
        <ScrollView style={styles.container}>
            {/*Price Info*/}
            <View style={styles.innerContainer}>
                <View style={styles.contentContainer}>
                    <Text style={styles.largeSymbol}>{profile.symbol}</Text>
                    <View style={styles.priceContainer}>
                        <Text style={styles.price}>${profile.price}</Text>
                        <Text style={styles.changes}>
                                <Icon
                                    type="ionicon"
                                    name={profile.changes >= 0 ? "caret-up" : "caret-down"}
                                    color={profile.changes >= 0 ? "#00DD00" : "#DD0000"}
                                    size={14}
                                />
                                {Math.abs(profile.changes.toFixed(2))}
                            </Text>
                    </View>
                </View>
            </View>

            {/*Stock Trading*/}
            <View style={styles.innerContainer}>
                <Text style={styles.title}>Trade {profile.symbol}</Text>
                {!profile.isActivelyTrading &&
                    <View style={styles.contentContainer}>
                        <Text style={styles.descNotTraded}>{profile.companyName} is not being actively traded.</Text>
                    </View>
                }
                {profile.isActivelyTrading &&
                    <View style={styles.contentContainer}>
                        <Text style={styles.currentOwnership}>Currently own: 0 ($0)</Text>
                        <Text style={styles.currentOwnership}>Current Profit: $0</Text>
                        <Input
                            style={styles.tradeComponent}
                            label={`Number of Shares (Value: $${shares * profile.price})`}
                            keyboardType= "numeric"
                            value={shares.toString()}
                            onChangeText={value => setShares(+value.replace(/[^0-9]/g, ''))}
                        />
                        <View style={styles.tradeButtonContainer}>
                            <View style={styles.tradeComponentContainer}>
                                <Button
                                    style={styles.tradeComponent}
                                    title="Buy"
                                />
                            </View>
                            <View style={styles.tradeComponentContainer}>
                                <Button
                                    style={styles.tradeComponent}
                                    title="Sell"
                                />
                            </View>
                        </View>
                        <Text style={styles.currentOwnership}>Buying Power: ${props.portfolio.money}</Text>
                    </View>
                }
            </View>

            {/*Stock Bio*/}
            <View style={styles.innerContainer}>
                <Text style={styles.title}>About {symbol}</Text>
                <View style={styles.contentContainer}>
                    <View style={styles.profileStatWrapper}>
                        <Image style={styles.image} source={{ uri: profile.image }} />
                        <View style={styles.statsContainer}>
                            <Text style={styles.statDesc}>CEO <Text style={styles.statText}>{profile.ceo}</Text></Text>
                            <Text style={styles.statDesc}>Industry <Text style={styles.statText}>{profile.industry}</Text></Text>
                            <Text style={styles.statDesc}>Sector <Text style={styles.statText}>{profile.sector}</Text></Text>
                        </View>
                    </View>
                    <Text style={styles.description}>{profile.description}</Text>
                    <Text style={styles.address}>{profile.companyName}</Text>
                    <Text style={styles.address}>{profile.address}</Text>
                    <Text style={styles.address}>{profile.city}, {profile.state.charAt(0).toUpperCase()}{profile.state.slice(1).toLowerCase()} {profile.zip}</Text>
                </View>
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    //Global Styles
    loadingContainer: {
        alignItems: "center",
        flex: 1,
    },
    container: {
        padding: 5,
    },
    innerContainer: {
        width: "95%",
        marginBottom: 10,
        backgroundColor: "#DADDE2",
        alignSelf: "center",
        borderColor: "#000",
        borderWidth: 2,
        borderRadius: 20,
    },
    contentContainer: {
        padding: 5,
    },
    title: {
        textAlign: "center",
        fontWeight: "bold",
        fontSize: 18,
        backgroundColor: "#B1BDC5",
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
    },

    //Stock Detail Styles
    largeSymbol: {
        fontSize: 48,
        fontWeight: "bold",
    },
    priceContainer: {
        flexDirection: "row",
    },
    price: {
        fontSize: 32,
        marginLeft: 10,
    },
    changes: {
        fontSize: 14,
        alignContent: "center",
        marginLeft: 10,
    },
    descNotTraded: {
        backgroundColor: "red",
        textAlign: "center",
    },

    //Trasing Panel
    tradeButtonContainer: {
        flexDirection: "row",
    },
    tradeComponentContainer: {
        flex: 1,
        margin: 2,
    },
    currentOwnership: {
        textAlign: "center",
    },

    //Bio Styles
    profileStatWrapper: {
        padding: 5,
        flexDirection: "row",
    },
    image: {
        width: 75,
        height: 75,
        borderRadius: 5,
    },
    statsContainer: {
        justifyContent: "center",
        alignItems: "flex-end",
        flex: 1,
    },
    statDesc: {
        fontWeight: "normal",
        fontSize: 12,
        textAlign: "right",
    },
    statText: {
        fontWeight: "bold",
        fontSize: 18,
    },
    description: {
        paddingVertical: 10,
    },
    address: {
        fontStyle: "italic",
        fontSize: 12,
        paddingLeft: 10,
    },
});

export default connect(mapStateToProps)(ViewStockPage);