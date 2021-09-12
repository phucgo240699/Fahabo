import React from 'react';
import {navigationOptions} from './index';
import {ScreenName} from '@constants/Constants';
import TasksScreen from '@screens/tasks/index';
import {createStackNavigator} from '@react-navigation/stack';

const Stack = createStackNavigator();

interface Props {}

const TasksStack: React.FC<Props> = () => {
  return (
    <Stack.Navigator screenOptions={navigationOptions}>
      <Stack.Screen name={ScreenName.TasksScreen} component={TasksScreen} />
    </Stack.Navigator>
  );
};

export default TasksStack;
