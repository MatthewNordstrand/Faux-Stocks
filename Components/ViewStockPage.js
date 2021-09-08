import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import Loading from './Loading';

const mapStateToProps = state => {
    return {
        cache: state.cache
    };
};

function ViewStockPage(props) {
    const {route, navigation} = props;
    const { symbol } = route.params;

    const portfolio = props.cache.profiles.filter(profile => profile.symbol === symbol)[0];

    if (!portfolio) {
        return (
            <View style={styles.loadingContainer}>
                <Loading />
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <Text>You are trying to view stock: {symbol}</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    loadingContainer: {
        alignItems: "center",
        flex: 1,
    },
    container: {
        padding: 5,
    },
});

export default connect(mapStateToProps)(ViewStockPage);