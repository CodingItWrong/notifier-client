import React from 'react';
import { View } from 'react-native';
import MessageList from './MessageList';
import PushPermissionRequester from './PushPermissionRequester';

export default function MainScreen() {
  return (
    <View style={{ flex: 1 }}>
      <PushPermissionRequester />
      <MessageList />
    </View>
  );
}
