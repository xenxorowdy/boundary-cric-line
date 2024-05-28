const { Stack } = require("expo-router");

const RootLayout = () => {
  return (
    <Stack>
      <Stack.Screen
        name="(tabs)"
        options={{
          headerShown: false,
          headerTitle: "",
          headerStyle: { backgroundColor: '#24AEFA' },
          headerTintColor: '#fff',
          headerTitleAlign: 'center',
          headerTitleStyle: {
            fontWeight: 'bold',
          },

        }}
      />
      <Stack.Screen
        name="modal/[index]"
        options={{
          headerTitle: "Team Information",
          presentation: "modal",
          headerStyle: { backgroundColor: '#24AEFA' },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },

        }}
      />
      <Stack.Screen
        name="match/[id]"
        options={({ route, params }) => ({
          headerTitle: getHeaderTitle(route, params),
          headerStyle: { backgroundColor: '#24AEFA' },
          headerTintColor: '#fff',
          headerTitleAlign: 'center',
          headerTitleStyle: {
            fontWeight: "700",
            backgroundColor: '#24AEFA',
          },

        })}
      />
      <Stack.Screen
        name="news/[id]"
        options={{
          headerTitle: "News",
          presentation: "modal",
          headerTitleAlign: 'center',
          headerStyle: { backgroundColor: '#24AEFA' },

        }}

      />
      <Stack.Screen
        name="series/index"
        options={{
          headerTitle: "Series Information",
          presentation: "modal",
          headerStyle: { backgroundColor: '#24AEFA' },

        }}
      />
      <Stack.Screen
        name="series/[id]"
        options={{
          headerTitle: "series Information",
          headerTitleAlign: 'center',
          headerStyle: { backgroundColor: '#24AEFA' },

        }}
      />
    </Stack>
  );
};



const getHeaderTitle = (route, param) => {
  try {
    // Extract the query parameter from the route
    const query = decodeURIComponent(route.params?.id);
    // Return a dynamic header title based on the query
    return (query).split("sep1s@-")[1] ?? 'Match Summary';

  } catch (error) {
    console.log(error);
  }
}

export default RootLayout;
