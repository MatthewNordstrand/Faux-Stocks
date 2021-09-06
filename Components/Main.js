import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Icon } from 'react-native-elements';
import PortfolioScreen from './Portfolio';
import BrowseScreen from './BrowseStocks';

const Tabs = createBottomTabNavigator();

export default function Main() {
    return (
        <NavigationContainer>
            <Tabs.Navigator
                initialRouteName="Portfolio"
                screenOptions={({ route }) => ({
                    tabBarIcon: ({ focused, color, size }) => {
                        let iconName;

                        if (route.name === "Portfolio") {
                            iconName = focused ? "bar-chart" : "bar-chart-outline";
                        } else if (route.name === "Browse") {
                            iconName = focused ? "search" : "search-outline";
                        }

                        return <Icon name={iconName} type="ionicon" color={color} size={size} />
                    }
                })}
            >
                <Tabs.Screen name="Portfolio" component={PortfolioScreen} />
                <Tabs.Screen name="Browse" component={BrowseScreen} />
            </Tabs.Navigator>
        </NavigationContainer>
    );
}

const styles = StyleSheet.create({
    center: {
        alignItems: "center",
        justifyContent: "center",
        flex: 1
    }
});