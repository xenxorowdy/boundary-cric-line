import FontAwesome from '@expo/vector-icons/FontAwesome';
import {
  createMaterialTopTabNavigator
} from "@react-navigation/material-top-tabs";
import * as Notifications from 'expo-notifications';
import { router, Tabs } from "expo-router";
import { Image, View } from "react-native";
import CusText from "../component/CusText";
import { useEffect } from 'react';

const { Navigator } = createMaterialTopTabNavigator();
function LogoTitle() {
  return (
    <View style={{ flexDirection: 'row', alignItems: 'center', gap: 20, width: 340, justifyContent: "flex-start" }} >
      <Image
        style={{ width: 35, height: 35, borderRadius: 20 }}
        source={require('../../assets/file.png')}
      />
      <CusText style={{ fontSize: 18, fontWeight: 700, color: "#fff" }}>Notout cricket line</CusText>
    </View>
  );
}

function useNotificationObserver() {
  useEffect(() => {
    let isMounted = true;

    function redirect(notification) {
      const url = notification.request.content.data?.url;
      if (url) {
        router.push(url);
      }
    }

    Notifications.getLastNotificationResponseAsync()
      .then(response => {
        if (!isMounted || !response?.notification) {
          return;
        }
        redirect(response?.notification);
      });

    const subscription = Notifications.addNotificationResponseReceivedListener(response => {
      redirect(response.notification);
    });

    return () => {
      isMounted = false;
      subscription.remove();
    };
  }, []);
}

export default function HomeLayout() {
  useNotificationObserver();
  return (
    <>
      <Tabs>
        <Tabs.Screen
          name="index"
          options={{
            // headerTitle: "Home",
            title: "Home",
            tabBarActiveTintColor: '#11BA8C',
            tabBarIcon: ({ color }) => <FontAwesome size={22} name="home" color={color} />,
            headerStyle: { backgroundColor: '#24AEFA' },
            headerTintColor: '#24AEFA',
            headerTitleStyle: {
              fontWeight: 'bold',
              color: '#24AEFA',
              backgroundColor: '#24AEFA',
            },
            headerTitle: props => <LogoTitle {...props} />,
          }}

        />
        <Tabs.Screen
          name="users/[id]"
          options={{
            headerShown: false,
            headerTitle: "Upcoming Matches",
            tabBarActiveTintColor: '#11BA8C',
            title: "Upcoming Matches",
            tabBarIcon: ({ color }) => <FontAwesome size={22} name="calendar" color={color} />,
          }}
        />
      </Tabs>
    </>
  );
}
