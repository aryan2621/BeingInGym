import React from 'react';
import { ApplicationProvider } from '@ui-kitten/components';
import * as eva from '@eva-design/eva';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import SignIn from './src/pages/SignIn';
import SignUp from './src/pages/SignUp';
import Home from './src/pages/Home';
import { Platform, SafeAreaView } from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faHome } from '@fortawesome/free-solid-svg-icons/faHome'
import { faSign } from '@fortawesome/free-solid-svg-icons/faSign'
import { faSignInAlt } from '@fortawesome/free-solid-svg-icons/faSignInAlt'
import { faUser } from '@fortawesome/free-solid-svg-icons/faUser'
import { faCrosshairs } from '@fortawesome/free-solid-svg-icons/faCrosshairs'
import { faLocationDot } from '@fortawesome/free-solid-svg-icons/faLocationDot'
import { faChartSimple } from '@fortawesome/free-solid-svg-icons/faChartSimple'
import { faYoutube } from '@fortawesome/free-brands-svg-icons/faYoutube'

import Tutorial from './src/pages/Tutorial';
import Goals from './src/pages/Goals';
import Progress from './src/pages/Progress';
import Profile from './src/pages/Profile';
import Tracking from './src/pages/Tracking';
const Tab = createBottomTabNavigator();

const App = () => {

    return (
        <ApplicationProvider {...eva} theme={eva.light}>
            <SafeAreaView style={{ flex: 1 }}>
                <NavigationContainer>
                    <Tab.Navigator
                        screenOptions={{
                            headerShown: false,
                            tabBarStyle: {
                                height: 60,
                                position: 'absolute',
                                margin: 16,
                                borderRadius: 16
                            }
                        }}
                    >
                        <Tab.Screen name="Home" component={Home}
                            options={
                                {
                                    tabBarLabel: 'Home',
                                    tabBarIcon: () => (
                                        <FontAwesomeIcon icon={faHome} size={24} color="black" />
                                    )
                                }
                            }
                        />
                        {/* <Tab.Screen name="SignIn" component={SignIn}
                            options={
                                {
                                    tabBarLabel: 'SignIn',
                                    tabBarIcon: () => (
                                        <FontAwesomeIcon icon={faSign} size={24} color="black" />
                                    )
                                }
                            }
                        />
                        <Tab.Screen name="SignUp" component={SignUp}
                            options={
                                {
                                    tabBarLabel: 'SignUp',
                                    tabBarIcon: () => (
                                        <FontAwesomeIcon icon={faSignInAlt} size={24} color="black" />
                                    )
                                }
                            }
                        /> */}
                        <Tab.Screen name="Tutorial" component={Tutorial}
                            options={
                                {
                                    tabBarLabel: 'Tutorial',
                                    tabBarIcon: () => (
                                        <FontAwesomeIcon icon={faYoutube} size={24} color="black" />
                                    )
                                }
                            }
                        />
                        <Tab.Screen name="Goal" component={Goals}
                            options={
                                {
                                    tabBarLabel: 'Goal',
                                    tabBarIcon: () => (
                                        <FontAwesomeIcon icon={faCrosshairs} size={24} color="black" />
                                    )
                                }
                            }
                        />
                        <Tab.Screen name="Progress" component={Progress}
                            options={
                                {
                                    tabBarLabel: 'Progress',
                                    tabBarIcon: () => (
                                        <FontAwesomeIcon icon={faChartSimple} size={24} color="black" />
                                    )
                                }
                            }
                        />
                        <Tab.Screen name="Tracking" component={Tracking}
                            options={
                                {
                                    tabBarLabel: 'Tracking',
                                    tabBarIcon: () => (
                                        <FontAwesomeIcon icon={faLocationDot} size={24} color="black" />
                                    )
                                }
                            }
                        />
                        <Tab.Screen name="Profile" component={Profile}
                            options={
                                {
                                    tabBarLabel: 'Profile',
                                    tabBarIcon: () => (
                                        <FontAwesomeIcon icon={faUser} size={24} color="black" />
                                    )
                                }
                            }
                        />
                    </Tab.Navigator>
                </NavigationContainer>
            </SafeAreaView>
        </ApplicationProvider>
    );
};

export default App;