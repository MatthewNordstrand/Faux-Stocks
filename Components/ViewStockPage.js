import React from 'react';
import { ScrollView, View, Text, StyleSheet } from 'react-native';
import { Image } from 'react-native-elements';
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
            <View>
                
            </View>
            <View style={styles.profileDescContainer}>
                <Text style={styles.profileDescTitle}>About {symbol}</Text>
                <View style={styles.profileStatWrapper}>
                    <Image style={styles.image} source={{ uri: profile.image }} />
                    <View style={styles.statsContainer}>
                        <Text style={styles.statDesc}>CEO <Text style={styles.statText}>{profile.ceo}</Text></Text>
                        <Text style={styles.statDesc}>Industry <Text style={styles.statText}>{profile.industry}</Text></Text>
                        <Text style={styles.statDesc}>Sector <Text style={styles.statText}>{profile.sector}</Text></Text>
                    </View>
                </View>
                <Text style={styles.description}>{profile.description}</Text>
                <Text style={styles.addressTop}>{profile.address}</Text>
                <Text style={styles.addressBottom}>{profile.city}, {profile.state.charAt(0).toUpperCase()}{profile.state.slice(1).toLowerCase()} {profile.zip}</Text>
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    //Global
    loadingContainer: {
        alignItems: "center",
        flex: 1,
    },
    container: {
        padding: 5,
    },

    //Bio Styles
    profileDescContainer: {
        width: "95%",
        backgroundColor: "#DADDE2",
        alignSelf: "center",
        borderColor: "#000",
        borderWidth: 2,
        borderRadius: 20,
    },
    profileDescTitle: {
        textAlign: "center",
        fontWeight: "bold",
        fontSize: 18,
        backgroundColor: "#B1BDC5",
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
    },
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
        padding: 10,
    },
    addressTop: {
        fontStyle: "italic",
        fontSize: 12,
        padding: 10,
        paddingBottom: 0,
    },
    addressBottom: {
        fontStyle: "italic",
        fontSize: 12,
        padding: 10,
        paddingTop: 0,
    }
});

export default connect(mapStateToProps)(ViewStockPage);