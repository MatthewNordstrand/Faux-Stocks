import React, { useState, useEffect } from 'react';
import { ScrollView, View, Text, StyleSheet, Alert, Dimensions } from 'react-native';
import { Image, Input, Button } from 'react-native-elements';
import { connect } from 'react-redux';
import Loading from './Loading';
import { Icon } from 'react-native-elements';
import { buyStock, sellStock, updateCache } from '../redux/ActionCreators';
import { LineChart } from 'react-native-chart-kit';

const mapStateToProps = state => {
    return {
        portfolio: state.portfolio,
        cache: state.cache
    };
};

const mapDispatchToProps = {
    updateCache: symbol => updateCache(symbol),
    buyStock: (symbol, count, price) => buyStock(symbol, count, price),
    sellStock: (symbol, count, price) => sellStock(symbol, count, price)
};

function ViewStockPage(props) {
    const {route, navigation} = props;
    const { symbol } = route.params;

    const [shares, setShares] = useState(0);

    useEffect(() => {
        props.updateCache(symbol);
    }, [navigation]);

    const error = props.cache.errors.filter(error => error.symbol === symbol)[0];

    if (error) {
        return (
            <View style={styles.loadingContainer}>
                <Text style={styles.errorText}>{error.message}</Text>
                <Text style={styles.errorText}>:(</Text>
            </View>
        );
    }

    const profile = props.cache.profiles.filter(profile => profile.symbol === symbol)[0];

    let ownedStock = props.portfolio.stocks.filter(stock => stock.symbol === symbol)[0];

    if (!ownedStock) {
        ownedStock = {
            symbol: symbol,
            amount: 0,
            cost: 0
        };
    }
    
    if (!profile) {
        return (
            <View style={styles.loadingContainer}>
                <Loading />
            </View>
        );
    }

    const stock = props.cache.stocks.filter(stock => stock.symbol === symbol)[0];
    const chartWidth = Dimensions.get("window").width;
    const chartConfig = {
        backgroundGradientFrom: "#FFFFFF",
        backgroundGradientFromOpacity: 0,
        backgroundGradientTo: "#FFFFFF",
        backgroundGradientToOpacity: 0,
        color: () => `rgba(0, 128, 255, 0.5)`,
        strokeWidth: 2,
        useShadowColorFromDataset: false
    };

    const profit = (ownedStock.amount * profile.price) - ownedStock.cost;


    const buyStockButton = () => {
        const buyCost = shares * profile.price;

        if (shares === 0) return;

        if (buyCost > props.portfolio.money) {
            Alert.alert(
                "Not Enough Buying Power",
                `You don't have enough buying power to buy ${shares} stocks. You have $${props.portfolio.money} and you need $${buyCost}.`,
                [
                    {
                        text: "Ok"
                    }
                ],
                { cancelable: false }
            );

            return;
        }

        Alert.alert(
            "Buy Stock?",
            `Are you sure you want to buy ${shares} shares of ${symbol} for $${buyCost}?`,
            [
                {
                    text: "Yes",
                    onPress: () => {
                        props.buyStock(symbol, shares, buyCost);
                        resetForm();
                    }
                },
                {
                    text: "No"
                }
            ],
            { cancelable: false }
        );
    }

    const sellStockButton = () => {
        const sellCost = shares * profile.price;

        if (shares === 0) return;

        if (ownedStock.amount < shares) {
            Alert.alert(
                "Not Enough Shares",
                `You don't have enough shares of ${symbol} to sell ${shares}. You have ${ownedStock.amount}.`,
                [
                    {
                        text: "Ok"
                    }
                ],
                { cancelable: false }
            );

            return;
        }

        Alert.alert(
            "Sell Stock?",
            `Are you sure you want to sell ${shares} shares of ${symbol} for $${sellCost}?`,
            [
                {
                    text: "Yes",
                    onPress: () => {
                        props.sellStock(symbol, shares, sellCost);
                        resetForm();
                    }
                },
                {
                    text: "No"
                }
            ],
            { cancelable: false }
        );
    }

    const resetForm = () => {
        setShares(0);
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

            {/*Stock Chart*/}
            <View style={styles.chartContainer}>
                {!stock &&
                    <Loading />
                }
                {stock &&
                    <>
                        <Text style={styles.chartTitle}>Weekly Performance</Text>
                        <LineChart
                            data={{
                                    datasets: [
                                        {
                                            data: stock.stockData.slice(0, 160).map(stockData => stockData.close).reverse()
                                        }
                                    ]
                                }}
                            width={chartWidth}
                            height={200}
                            chartConfig={chartConfig}
                            bezier
                            withVerticalLines={false}
                            withDots={false}
                        />
                    </>
                }
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
                        <Text style={styles.currentOwnership}>Currently Own: {ownedStock.amount} (${(ownedStock.amount * profile.price).toFixed(2)})</Text>
                        {profit >= 0 &&
                            <Text style={styles.currentOwnership}>Current Profit: ${profit.toFixed(2)}</Text>
                        }
                        {profit < 0 &&
                            <Text style={styles.currentOwnership}>Current Loss: -${Math.abs(profit.toFixed(2))}</Text>
                        }
                        <Input
                            style={styles.tradeComponent}
                            label={`Number of Shares (Value: $${(shares * profile.price).toFixed(2)})`}
                            keyboardType= "numeric"
                            value={shares.toString()}
                            onChangeText={value => setShares(+value.replace(/[^0-9]/g, ''))}
                        />
                        <View style={styles.tradeButtonContainer}>
                            <View style={styles.tradeComponentContainer}>
                                <Button
                                    style={styles.tradeComponent}
                                    title="Buy"
                                    accessibilityLabel="Buy Stocks"
                                    onPress={() => buyStockButton()}
                                />
                            </View>
                            <View style={styles.tradeComponentContainer}>
                                <Button
                                    style={styles.tradeComponent}
                                    title="Sell"
                                    accessibilityLabel="Sell Stocks"
                                    onPress={() => sellStockButton()}
                                />
                            </View>
                        </View>
                        <Text style={styles.currentOwnership}>Buying Power: ${props.portfolio.money.toFixed(2)}</Text>
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
        justifyContent: "center",
        flex: 1,
    },
    errorText: {
        textAlign: "center",
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

    //Chart Styles
    chartContainer: {
        alignItems: "center",
        paddingTop: 5,
        paddingBottom: 5,
    },
    chartTitle: {
        fontWeight: "bold",
        color: "#0080FF"
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
        margin: 5,
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

export default connect(mapStateToProps, mapDispatchToProps)(ViewStockPage);