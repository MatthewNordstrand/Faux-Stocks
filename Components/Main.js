import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Icon } from 'react-native-elements';
import PortfolioScreen from './Portfolio';
import BrowseScreen from './BrowseStocks';
import ViewStockPage from './ViewStockPage';
import SettingsPage from './SettingsPage';

const MainStack = createNativeStackNavigator();

export default function Main() {
    return (
        <NavigationContainer>
            <MainStack.Navigator>
                <MainStack.Screen name="Home" component={TabNavigation} options={{ headerShown: false }} />
                <MainStack.Screen name="View Stock" component={ViewStockPage} options={({ route }) => ({ title: route.params.stockName })} />
            </MainStack.Navigator>
        </NavigationContainer>
    );
}

const Tabs = createBottomTabNavigator();

function TabNavigation() {
    return (
        <Tabs.Navigator
            screenOptions={({ route }) => ({
                tabBarIcon: ({ focused, color, size }) => {
                    let iconName;

                    if (route.name === "Portfolio") {
                        iconName = focused ? "bar-chart" : "bar-chart-outline";
                    } else if (route.name === "Browse") {
                        iconName = focused ? "search" : "search-outline";
                    } else if (route.name === "Settings") {
                        iconName = focused ? "settings" : "settings-outline"
                    }

                    return <Icon name={iconName} type="ionicon" color={color} size={size} />
                }
            })}
        >
            <Tabs.Screen name="Portfolio" component={PortfolioScreen} />
            <Tabs.Screen name="Settings" component={SettingsPage} />
            <Tabs.Screen name="Browse" component={BrowseScreen} />
        </Tabs.Navigator>
    );
}