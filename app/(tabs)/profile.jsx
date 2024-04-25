import { SafeAreaView } from "react-native-safe-area-context";
import { View, Text, ScrollView, Dimensions, Alert, Image } from "react-native";
import * as React from "react";
import { Avatar, List } from "react-native-paper";

const Profile = () => {
  return (
    <SafeAreaView>
      <View className="flex flex-col items-center mt-16">
        <Avatar.Image
          size={100}
          source={require("../../assets/images/user.png")}
        />
        <Text className="text-2xl font-bold mt-8 mb-8">Manu Cit</Text>
        <View className="flex flex-row mt-8 gap-10">
          <View>
            <Text className="text-xl font-bold text-center">70kg</Text>
            <Text className="text-lg">Peso</Text>
          </View>
          <View>
            <Text className="text-xl font-bold text-center">1,70</Text>
            <Text className="text-lg">Altura</Text>
          </View>
          <View>
            <Text className="text-xl font-bold text-center">25</Text>
            <Text className="text-lg">Idade</Text>
          </View>
        </View>
      </View>
      <View className="flex flex-col mt-20 items-start mx-10">
        <Text className="text-xl">Seus Objetivos</Text>
      </View>
      <View className="flex flex-col mt-5 items-start mx-10">
        <List.Section>
          <List.Item
            className="ml-auto"
            title="Corrida"
            description="70/80km/h"
            left={() => <List.Icon icon="run" />}
            right={() => <Text>79%</Text>}
          />
          <List.Item
            className="ml-auto"
            title="Dormir"
            description="50/60hrs"
            left={() => <List.Icon icon="sleep" />}
            right={() => <Text>60%</Text>}
          />
          <List.Item
            className="ml-auto"
            title="Perda de peso"
            description="70/100kg"
            left={() => <List.Icon icon="fire" />}
            right={() => <Text>60%</Text>}
          />
        </List.Section>
      </View>
    </SafeAreaView>
  );
};

export default Profile;
