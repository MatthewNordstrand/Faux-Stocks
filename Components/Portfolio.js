import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { connect } from 'react-redux';

const mapStateToProps = state => {
    return {
        portfolio: state.portfolio
    };
};

class PortfolioScreen extends Component {
    render() {
        const totalValue = 25000;
        const totalProfit = totalValue - 25000;

        return(
            <View style={styles.container}>
                <View style={styles.innerContainer}>
                    <Text style={styles.title}>Current Portfolio Value</Text>
                    <View style={styles.contentContainer}>
                        <Text style={styles.statDesc}>Total Value <Text style={styles.statText}>$0</Text></Text>
                        <Text style={styles.statDesc}>Buying Power <Text style={styles.statText}>${this.props.portfolio.money}</Text></Text>
                        {totalProfit > 0 &&
                            <Text style={styles.statDesc}>Totoal Profit <Text style={styles.statTextGreen}>+${totalProfit}</Text></Text>
                        }
                        {totalProfit < 0 &&
                            <Text style={styles.statDesc}>Totoal Loss <Text style={styles.statTextRed}>-${Math.abs(totalProfit)}</Text></Text>
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
    statDesc: {
        fontWeight: "normal",
        fontSize: 12,
        textAlign: "right",
    },
    statText: {
        fontWeight: "bold",
        fontSize: 18,
    },
    statTextGreen: {
        fontWeight: "bold",
        fontSize: 18,
        color: "#00FF00",
        textShadowColor: "#000",
        textShadowRadius: 5
    },
    statTextRed: {
        fontWeight: "bold",
        fontSize: 18,
        color: "#FF0000",
        textShadowColor: "#000",
        textShadowRadius: 5
    },
});

export default connect(mapStateToProps)(PortfolioScreen);