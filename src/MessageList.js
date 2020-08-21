import React, { useEffect, useState } from 'react';
import { FlatList, Linking, Platform, Text, View } from 'react-native';
import axios from 'axios';
import { ListItem } from 'react-native-elements';

// const httpUrl = Platform.select({
//   ios: 'http://localhost:3000',
//   android: 'http://10.0.2.2:3000',
// });
// const wsUrl = Platform.select({
//   ios: 'ws://localhost:3000',
//   android: 'ws://10.0.2.2:3000',
// });
const httpUrl = 'https://ciw-notifier.herokuapp.com';
const wsUrl = 'wss://ciw-notifier.herokuapp.com';

let socket;

const setUpWebSocket = addMessage => {
  if (!socket) {
    socket = new WebSocket(wsUrl);
    console.log('Attempting Connection...');

    socket.onopen = () => {
      console.log('Successfully Connected');
    };

    socket.onclose = event => {
      console.log('Socket Closed Connection: ', event);
      socket = null;
    };

    socket.onerror = error => {
      console.log('Socket Error: ', error);
    };
  }

  socket.onmessage = event => {
    addMessage(JSON.parse(event.data));
  };
};

const loadInitialData = async ({ setLoading, setMessages }) => {
  const messages = await axios.get(`${httpUrl}/list`);
  setMessages(messages.data);
  setLoading(false);
};

export default function MessageList() {
  const [loading, setLoading] = useState(true);
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    loadInitialData({ setLoading, setMessages });
  }, []);

  useEffect(() => {
    setUpWebSocket(newMessage => {
      setMessages([newMessage, ...messages]);
    });
  }, [messages]);

  if (loading) {
    return <Text>Loading…</Text>;
  }

  return (
    <View style={{ flex: 1 }}>
      <FlatList
        data={messages}
        keyExtractor={item => String(item.id)}
        renderItem={({ item }) => (
          <ListItem
            title={item.text}
            bottomDivider
            onPress={() => item.url && Linking.openURL(item.url)}
          />
        )}
      />
    </View>
  );
}
