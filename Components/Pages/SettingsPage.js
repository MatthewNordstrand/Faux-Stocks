import React, { Component } from 'react';
import { View, Text, StyleSheet, Alert } from 'react-native';
import { Button } from 'react-native-elements';
import { connect } from 'react-redux';
import { resetData } from '../../redux/ActionCreators';

const mapDispatchToProps = {
    resetData: () => resetData()
};

class SettingsPage extends Component {
    resetButtonClicked() {
        Alert.alert(
            "Are you sure?",
            "All game data will be wiped and you will have to start over. This can't be undone.",
            [
                {
                    text: "Yes",
                    onPress: () => {
                        this.props.resetData();
                        this.props.navigation.navigate("Portfolio");
                    }
                },
                {
                    text: "No"
                }
            ],
            { cancelable: false }
        );
    }

    render() {
        return (
            <View style={styles.container}>
                <Button
                    title="Reset Progress"
                    buttonStyle={styles.redButton}
                    onPress={() => this.resetButtonClicked()}
                />
                <Text style={styles.description}>You can always restart your progress if you want.</Text>
                <Text style={styles.description}><Text style={styles.textBold}>WARNING:</Text> This will remove all of your stocks and reset your money back to $25,000. Only proceed with the reset if you are absolutely sure you want to start over.</Text>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        alignContent: "center",
        flex: 1,
        padding: 10,
    },
    title: {
        textAlign: "center",
        fontWeight: "bold",
        fontSize: 18,
    },
    description: {
        textAlign: "center",
    },
    textBold: {
        fontWeight: "bold"
    },
    redButton: {
        backgroundColor: "#FF0000",
        width: "75%",
        alignSelf: "center",
    },
});

export default connect(null, mapDispatchToProps)(SettingsPage);