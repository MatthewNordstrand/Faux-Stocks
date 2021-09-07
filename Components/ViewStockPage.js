import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

function ViewStockPage({route, navigation}) {
    const { symbol } = route.params;

    return (
        <View>
            <Text>You are trying to view stock: {symbol}</Text>
        </View>
    );
}

export default ViewStockPage;