import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Button,
  StyleSheet,
  ActivityIndicator,
  FlatList,
  Image,
} from "react-native";
import { ScrollView } from "react-native-gesture-handler";

export function HomeScreen({ route, navigation }) {
  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState([]);

  const getMovies = async () => {
    try {
      const response = await fetch("https://api.sampleapis.com/beers/ale");
      const json = await response.json();
      setData(json);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getMovies();
  }, []);

  function handleSettingsPress() {
    navigation.navigate("Settings");
  }

  return (
  <ScrollView>
    <View style={styles.screen}>
      <Button
        title="Go to the Settings screen!"
        onPress={handleSettingsPress}
      />
      <View>
        {isLoading ? (
          <ActivityIndicator />
        ) : (
          <FlatList
            data={data}
            keyExtractor={({ id }, index) => id}
            renderItem={({ item }) => (
              <View>
                <Image
                   style={styles.tinyLogo}
                   source={{uri: `${item.image}`
                  }}
                />
                <Text>
                  {item.name} : {item.price} 
                </Text>
              </View>
            )}
          />
        )}
      </View>
    </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    alignItems: "center",
    //justifyContent: "center",
  },
  tinyLogo: {
    width:50,
    height:50,
  }
});
