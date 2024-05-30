import { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  FlatList,
  Image,
  StyleSheet,
  RefreshControl,
  ScrollView,
  Text,
  View,
} from "react-native";
import profileImage from "../../assets/images/profile.png";
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
    { value: 2000, label: "S,", frontColor: "#FF844B" },
    { value: 1500, label: "T", frontColor: "#FF844B" },
    { value: 1800, label: "Q", frontColor: "#FF844B" },
    { value: 1000, label: "Q", frontColor: "#FF844B" },
    { value: 1200, label: "S", frontColor: "#FF844B" },
    { value: 1100, label: "S", frontColor: "#FF844B" },
    { value: 3150, label: "D", frontColor: "#FF844B" },
  ];
  const currentDate = new Date().toLocaleDateString("pt-BR", {
    weekday: "long",
    day: "numeric",
    month: "long",
  });

  return (
    <SafeAreaView>
      <ScrollView>
        <View style={styles.container}>
          <Image source={profileImage} style={styles.icon} />
          <View style={styles.textContainer}>
            <Text style={styles.text3xl}>Olá, Seja bem vindo.</Text>
            <Text style={styles.textLg}>{currentDate}</Text>
          </View>
        </View>
        <View>
          <Text style={styles.textXl}>Diário semanal</Text>
          <Text style={styles.textSubtitle}>Calorias Semanais:</Text>
          <Text style={styles.textValue}>11000</Text>
        </View>
        <View style={styles.chartContainer}>
          <BarChart
            barWidth={22}
            noOfSections={1}
            barBorderRadius={4}
            frontColor="#E9F1F7"
            data={barData}
            yAxisThickness={0}
            xAxisThickness={0}
            width={300}
            height={150}
          />
        </View>
        <View style={styles.container}>
          <List.Section>
            <List.Item
              style={styles.listItem}
              onPress={() => {}}
              title={
                <View style={styles.itemContent}>
                  <View style={styles.iconContainer}>
                    <Text style={styles.titleIcon}>Objetivo</Text>
                  </View>
                  <View style={styles.rightContainer}>
                    <Text style={styles.title}>2.000</Text>
                    <Text style={styles.unit}>kcal</Text>
                  </View>
                </View>
              }
            />
            <List.Item
              style={styles.listItem}
              onPress={() => {}}
              title={
                <View style={styles.itemContent}>
                  <View style={styles.iconContainer}>
                    <Text style={styles.titleIcon}>Média Diária</Text>
                  </View>
                  <View style={styles.rightContainer}>
                    <Text style={styles.title}>2.000</Text>
                    <Text style={styles.unit}>kcal</Text>
                  </View>
                </View>
              }
            />

            <List.Item
              style={styles.listItem}
              onPress={() => {}}
              title={
                <View style={styles.itemContent}>
                  <View style={styles.iconContainer}>
                    <Text style={styles.titleIcon}>Meta de Água</Text>
                  </View>
                  <View style={styles.rightContainer}>
                    <Text style={styles.title}>2l/2l</Text>
                    <Text style={styles.unit}>kcal</Text>
                  </View>
                </View>
              }
            />
          </List.Section>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = {
  container: {
    flexDirection: "row",
    alignItems: "center",
    marginHorizontal: 10,
    marginTop: 10,
    marginLeft: 10,
    padding: 5,
    flexWrap: "wrap",
    paddingHorizontal: 10,
    paddingVertical: 10,
  },

  icon: {
    width: 60,
    height: 60,
    borderRadius: 20,
    margin: 10,
  },
  text3xl: {
    fontSize: 20,
    fontFamily: "Manrope-Bold",
    color: "#242752",
  },
  textLg: {
    fontSize: 14,
    color: "gray",
    textTransform: "capitalize",
    fontFamily: "Manrope-Medium",
  },
  textXl: {
    fontSize: 24,
    color: "#242752",
    textTransform: "capitalize",
    fontFamily: "Manrope-Bold",
    marginLeft: 25,
    marginTop: 35,
  },
  chartContainer: {
    marginVertical: 50,
    marginHorizontal: 20,
  },

  listItem: {
    backgroundColor: "transparent",
    borderColor: "#DDDDDD",
    borderWidth: 1,
    borderRadius: 10,
    flexDirection: "row",
    alignItems: "left",
    paddingHorizontal: 8,
    marginBottom: 10,
    width: 370,
    height: 110,
    flexDirection: "column",
  },
  textContainer: {
    flex: 1,
    marginLeft: 6,
  },
  rightContainer: {
    flexDirection: "column",
  },

  titleIcon: {
    marginRight: 35,
    fontSize: 18,
    fontFamily: "Manrope-Bold",
    color: "#242752",
  },

  title: {
    fontSize: 16,
    fontFamily: "Manrope-Medium",
    color: "#242752",
    marginBottom: 4,
    top: 0,
  },
  value: {
    marginRight: 5,
  },
  unit: {
    color: "#97A7B7",
    fontSize: 12,
  },

  image: {
    width: 24,
    height: 24,
  },

  iconContainer: {
    flexDirection: "row",
    alignItems: "center",
  },

  textSubtitle: {
    fontSize: 18,
    color: "#242752",
    textTransform: "capitalize",
    fontFamily: "Manrope-Medium",
    marginLeft: 25,
    marginTop: 2,
  },

  textValue: {
    fontSize: 18,
    color: "#242752",
    textTransform: "capitalize",
    fontFamily: "Manrope-Bold",
    marginLeft: 25,
    marginTop: 2,
  },
};

export default Home;
