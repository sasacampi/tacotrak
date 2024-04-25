import { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { FlatList, Image, RefreshControl, Text, View } from "react-native";
import {
  Avatar,
  Badge,
  Banner,
  Button,
  Card,
  IconButton,
  List,
} from "react-native-paper";
import { BarChart } from "react-native-gifted-charts";

const Home = () => {
  const barData = [
    { value: 100, label: "M" },
    { value: 500, label: "T", frontColor: "#177AD5" },
    { value: 800, label: "W", frontColor: "#177AD5" },
    { value: 1000, label: "T" },
    { value: 200, label: "F", frontColor: "#177AD5" },
    { value: 100, label: "S" },
    { value: 150, label: "S" },
  ];
  const currentDate = new Date().toLocaleDateString("pt-BR", {
    weekday: "long",
    day: "numeric",
    month: "long",
  });

  return (
    <SafeAreaView>
      <View>
        <Text className="text-3xl mx-10 mt-10 font-bold">Olá, Manu!</Text>
        <Text className="text-lg mx-10 capitalize text-gray">
          {currentDate}
        </Text>
      </View>
      <View>
        <Text className="text-xl mx-10 mt-10 font-semibold">
          Diário semanal
        </Text>
      </View>
      <View className="mx-10">
        <List.Section>
          <List.Item
            title="Calorias semanais"
            left={() => <List.Icon icon="fire" />}
            right={() => <Text>1.850kcal</Text>}
            className="p-3 my-5 rounded-lg bg-blue-200"
          />
          <List.Item
            title="Objetivo"
            left={() => (
              <List.Icon icon="chart-areaspline" color="color-secondary" />
            )}
            right={() => <Text>2.000kcal</Text>}
            className="p-3 my-5 rounded-lg bg-blue-200"
          />
          <List.Item
            title="Média diária"
            left={() => <List.Icon icon="chart-areaspline" />}
            right={() => <Text>1.500kcal</Text>}
            className="p-3 my-5 rounded-lg bg-blue-200"
          />
        </List.Section>
      </View>
      <View className="my-10 mx-10">
        <BarChart
          barWidth={22}
          noOfSections={3}
          barBorderRadius={4}
          frontColor="lightgray"
          data={barData}
          yAxisThickness={0}
          xAxisThickness={0}
        />
      </View>
    </SafeAreaView>
  );
};

export default Home;
