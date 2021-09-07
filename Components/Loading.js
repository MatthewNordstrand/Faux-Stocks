import React from 'react';
import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';

function Loading({showText = true}) {
    return (
        <View style={styles.container}>
            <ActivityIndicator size="large" color="#000" />
            {showText && <Text style={styles.loadingText}>Loading...</Text>}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        alignItems: "center",
        justifyContent: "center",
        flex: 1,
    },
    loadingText: {
        fontSize: 15,
        fontWeight: "bold",
    }
});

export default Loading;