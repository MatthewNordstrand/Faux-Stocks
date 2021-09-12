import React, { Component } from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import { connect } from 'react-redux';
import Loading from './Loading';
import ShareOwnershipInfoSmall from './ShareOwnershipInfoSmall';
import { updateProfile } from '../redux/ActionCreators';

const mapStateToProps = state => {
    return {
        portfolio: state.portfolio,
        cache: state.cache
    };
};

const mapDispatchToProps = {
    updateProfile: symbol => updateProfile(symbol)
};

class PortfolioScreen extends Component {
    componentDidMount() {
        this.props.navigation.addListener("focus", () => {
            this.updateOwnedStocks();
        });
    }

    updateOwnedStocks() {
        const mapPortfolio = this.props.portfolio.stocks.map(stock => stock.symbol);
        mapPortfolio.forEach(symbol => this.props.updateProfile(symbol));
    }

    render() {
        const renderStockInfo = ({item}) => {
            return <ShareOwnershipInfoSmall stock={item} navigation={this.props.navigation} />;
        };

        const mapCache = this.props.cache.profiles.map(stock => stock.symbol);
        const mapPortfolio = this.props.portfolio.stocks.map(stock => stock.symbol);
        const absent = mapPortfolio.filter(symbol => {
            if (!mapCache.includes(symbol)) {
                return true;
            }
            return false;
        });

        if (absent.length >= 1) {
            return <Loading />;
        }

        //Set current total value to the amount of money that the user has
        let totalValue = this.props.portfolio.money;

        //Add up the current value of all owned stocks.
        for (let i = 0; i < this.props.portfolio.stocks.length; i++) {
            const curStock = this.props.portfolio.stocks[i];
            const stockPrice = this.props.cache.profiles.filter(stock => stock.symbol === curStock.symbol)[0].price;
            totalValue += curStock.amount * stockPrice;
        }

        //Get profit by subtracting starting money from total portfolio value
        const totalProfit = totalValue - 25000;

        return(
            <View style={styles.container}>
                <View style={styles.innerContainerNoFlex}>
                    <Text style={styles.title}>Current Portfolio Value</Text>
                    <View style={styles.contentContainer}>
                        <Text style={styles.statDesc}>Total Value <Text style={styles.statText}>${totalValue.toFixed(2)}</Text></Text>
                        <Text style={styles.statDesc}>Buying Power <Text style={styles.statText}>${this.props.portfolio.money.toFixed(2)}</Text></Text>
                        {totalProfit > 0 &&
                            <Text style={styles.statDesc}>Totoal Profit <Text style={styles.statTextGreen}>+${totalProfit.toFixed(2)}</Text></Text>
                        }
                        {totalProfit < 0 &&
                            <Text style={styles.statDesc}>Totoal Loss <Text style={styles.statTextRed}>-${Math.abs(totalProfit).toFixed(2)}</Text></Text>
                        }
                    </View>
                </View>
                <View style={styles.innerContainer}>
                        <Text style={styles.title}>Your Shares</Text>
                        <View style={styles.sharesContentContainer}>
                            {this.props.portfolio.stocks.length === 0 &&
                                <Text style={styles.textInfo}>You currently don't own any shares.</Text>
                            }
                            {this.props.portfolio.stocks.length > 0 &&
                                <FlatList
                                    data={this.props.portfolio.stocks}
                                    renderItem={renderStockInfo}
                                    keyExtractor={item => item.symbol.toString()}
                                />
                            }
                        </View>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        padding: 5,
        flex: 1,
    },
    innerContainerNoFlex: {
        width: "95%",
        marginBottom: 10,
        alignSelf: "center",
        borderColor: "#000",
        borderWidth: 2,
        borderRadius: 20,
    },
    innerContainer: {
        width: "95%",
        marginBottom: 10,
        alignSelf: "center",
        borderColor: "#000",
        borderWidth: 2,
        borderRadius: 20,
        flex: 1,
    },
    contentContainer: {
        padding: 5,
    },
    sharesContentContainer: {
        padding: 5,
        flex: 1,
    },
    title: {
        textAlign: "center",
        fontWeight: "bold",
        fontSize: 18,
        backgroundColor: "#B1BDC5",
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
    },
    statDesc: {
        fontWeight: "normal",
        fontSize: 12,
        textAlign: "right",
    },
    statText: {
        fontWeight: "bold",
        fontSize: 24,
    },
    statTextGreen: {
        fontWeight: "bold",
        fontSize: 24,
        color: "#00FF00",
        textShadowColor: "#000",
        textShadowRadius: 5
    },
    statTextRed: {
        fontWeight: "bold",
        fontSize: 24,
        color: "#FF0000",
        textShadowColor: "#000",
        textShadowRadius: 5
    },
    textInfo: {
        textAlign: "center"
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(PortfolioScreen);