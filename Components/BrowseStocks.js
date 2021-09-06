import React, { Component } from 'react';
import { ScrollView, View, Text, StyleSheet } from 'react-native';
import { Input, Icon } from 'react-native-elements';
import { connect } from 'react-redux';

const mapStateToProps = state => {
    return {
        search: state.search
    };
};

class BrowseScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            search: ""
        };
    }

    updateSearch = (search) => {
        this.setState({search});
    };

    onSubmitSearch = () => {
        
    };

    render() {
        return(
            <View>
                <Input
                    placeholder="Search Stocks..."
                    leftIcon={<Icon name="search-circle-outline" type="ionicon" />}
                    value={this.state.search}
                    onChangeText={this.updateSearch}
                    onSubmitEditing={this.onSubmitSearch}
                />
                <ScrollView>
                    {this.props.search.errMess && <Text style={styles.errorText}>{this.props.search.errMess}</Text>}
                </ScrollView>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    errorText: {
        textAlign: "center"
    }
});

export default connect(mapStateToProps)(BrowseScreen);