import React from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import profileImage from "../../assets/images/profile.png";

const getCurrentDate = () => {
  const date = new Date();
  return date.toLocaleDateString("pt-BR", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};

const WelcomeHeader = ({ username }) => {
  return (
    <View style={styles.headerContainer}>
      <Image source={profileImage} style={styles.icon} />
      <View style={styles.textContainer}>
        <Text style={styles.welcomeText}>Olá, {username}!</Text>
        <Text style={styles.dateText}>{getCurrentDate()}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    marginTop: 64,
    marginLeft: 12,
  },
  icon: {
    width: 60,
    height: 60,
    borderRadius: 20,
  },
  textContainer: {
    marginLeft: 10,
  },
  welcomeText: {
    fontSize: 20,
    fontFamily: "Manrope-Bold",
  },
  dateText: {
    fontSize: 16,
    color: "gray",
    textTransform: "capitalize",
    fontFamily: "Manrope-Medium",
  },
});

export default WelcomeHeader;
