import { Ionicons } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import * as React from 'react';

import Colors from '../constants/Colors';
import useColorScheme from '../hooks/useColorScheme';
import DreamJournal from '../screens/DreamJournal';
import SleepScheduler from '../screens/SleepScheduler';
import SleepAdvisor from '../screens/SleepAdvisor';
import { BottomTabParamList, DreamJournalParamList, SleepSchedulerParamList, SleepAdvisorParamList } from '../types';

const BottomTab = createBottomTabNavigator<BottomTabParamList>();

export default function BottomTabNavigator() {
    const colorScheme = useColorScheme();

    return (
        <BottomTab.Navigator
            initialRouteName="Sleep Advisor"
            tabBarOptions={{ activeTintColor: Colors[colorScheme].tint }}>
            <BottomTab.Screen
                name="Sleep Advisor"
                component={SleepAdvisorNavigator}
                options={{
                    tabBarIcon: function getIcon({ color }) {
                        return <TabBarIcon name="ios-code" color={color} />;
                    },
                }}
            />
            <BottomTab.Screen
                name="Sleep Scheduler"
                component={SleepSchedulerNavigator}
                options={{
                    tabBarIcon: function getIcon({ color }) {
                        return <TabBarIcon name="ios-code" color={color} />;
                    },
                }}
            />
            <BottomTab.Screen
                name="Dream Journal"
                component={DreamJournalNavigator}
                options={{
                    tabBarIcon: function getIcon({ color }) {
                        return <TabBarIcon name="ios-code" color={color} />;
                    },
                }}
            />
        </BottomTab.Navigator>
    );
}

// You can explore the built-in icon families and icons on the web at:
// https://icons.expo.fyi/
function TabBarIcon(props: { name: React.ComponentProps<typeof Ionicons>['name']; color: string }) {
    return <Ionicons size={30} style={{ marginBottom: -3 }} {...props} />;
}

// Each tab has its own navigation stack, you can read more about this pattern here:
// https://reactnavigation.org/docs/tab-based-navigation#a-stack-navigator-for-each-tab
const SleepScheulderStack = createStackNavigator<SleepSchedulerParamList>();

function SleepSchedulerNavigator() {
    return (
        <SleepScheulderStack.Navigator>
            <SleepScheulderStack.Screen
                name="SleepScheduler"
                component={SleepScheduler}
                options={{ headerTitle: 'Sleep Scheduler' }}
            />
        </SleepScheulderStack.Navigator>
    );
}

const DreamJournalStack = createStackNavigator<DreamJournalParamList>();

function DreamJournalNavigator() {
    return (
        <DreamJournalStack.Navigator>
            <DreamJournalStack.Screen
                name="DreamJournal"
                component={DreamJournal}
                options={{ headerTitle: 'Dream Journal' }}
            />
        </DreamJournalStack.Navigator>
    );
}

const SleepAdvisorStack = createStackNavigator<SleepAdvisorParamList>();

function SleepAdvisorNavigator() {
    return (
        <SleepAdvisorStack.Navigator>
            <SleepAdvisorStack.Screen
                name="SleepAdvisor"
                component={SleepAdvisor}
                options={{ headerTitle: 'Sleep Advisor' }}
            />
        </SleepAdvisorStack.Navigator>
    );
}
