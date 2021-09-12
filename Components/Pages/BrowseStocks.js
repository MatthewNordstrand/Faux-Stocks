import React, { Component } from 'react';
import { ScrollView, View, Text, StyleSheet, FlatList } from 'react-native';
import { Input, Icon } from 'react-native-elements';
import { connect } from 'react-redux';
import Loading from '../Loading';
import { searchQuery } from '../../redux/ActionCreators';
import CompanyInfoSmall from '../StockInfoLabels/CompanyInfoSmall';

const mapStateToProps = state => {
    return {
        search: state.search
    };
};

const mapDispatchToProps = {
    searchQuery: query => searchQuery(query)
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

    render() {
        const renderStockInfo = ({item}) => {
            return <CompanyInfoSmall stock={item} navigation={this.props.navigation} />;
        };

        return(
            <View>
                <Input
                    placeholder="Search Stocks..."
                    leftIcon={<Icon name="search-circle-outline" type="ionicon" />}
                    value={this.state.search}
                    onChangeText={this.updateSearch}
                    onSubmitEditing={() => this.props.searchQuery(this.state.search)}
                />
                <FlatList
                    data={this.props.search.stocks}
                    renderItem={renderStockInfo}
                    keyExtractor={item => item.symbol.toString()}
                    ListHeaderComponent={
                        <>
                            <ScrollView>
                                {this.props.search.errMess && <Text style={styles.errorText}>{this.props.search.errMess}</Text>}
                                {this.props.search.isLoading && <Loading />}
                            </ScrollView>
                        </>
                    }
                />
                
            </View>
        );
    }
}

const styles = StyleSheet.create({
    errorText: {
        textAlign: "center"
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(BrowseScreen);