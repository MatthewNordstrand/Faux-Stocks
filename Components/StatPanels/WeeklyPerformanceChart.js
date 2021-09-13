import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { LineChart } from 'react-native-chart-kit';
import { connect } from 'react-redux';
import Loading from '../Loading';

const mapStateToProps = state => {
    return {
        stocks: state.cache.stocks
    };
};

function WeeklyPerformanceChart({symbol, width, height, showLabels = true, showLoadText = true, stocks}) {
    const chartConfig = {
        backgroundGradientFrom: "#FFFFFF",
        backgroundGradientFromOpacity: 0,
        backgroundGradientTo: "#FFFFFF",
        backgroundGradientToOpacity: 0,
        color: () => `rgba(0, 128, 255, 0.5)`,
        strokeWidth: 2,
        useShadowColorFromDataset: false,
    };

    const stock = stocks.filter(stock => stock.symbol === symbol)[0];

    return (
        <View style={styles.chartContainer}>
            {!stock &&
                <Loading showText={showLoadText} />
            }
            {stock &&
                <>
                    {showLabels &&
                        <Text style={styles.chartTitle}>Weekly Performance</Text>
                    }
                    <LineChart
                        style={showLabels ? styles.chart : styles.chartNoPadding}
                        data={{
                                datasets: [
                                    {
                                        data: stock.stockData.slice(0, 160).map(stockData => stockData.close).reverse()
                                    }
                                ]
                            }}
                        width={width}
                        height={height}
                        chartConfig={chartConfig}
                        bezier
                        withVerticalLines={false}
                        withDots={false}
                        withHorizontalLabels={showLabels}
                        withHorizontalLines={showLabels}
                    />
                </>
            }
        </View>
    );
}

const styles = StyleSheet.create({
    chartContainer: {
        alignItems: "center",
        paddingTop: 5,
        paddingBottom: 5,
    },
    chartTitle: {
        fontWeight: "bold",
        color: "#0080FF"
    },
    chartNoPadding: {
        paddingRight: 0,
    },
    chart: {

    }
});

export default connect(mapStateToProps)(WeeklyPerformanceChart);