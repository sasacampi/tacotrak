import { StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { View, Text, ScrollView, Dimensions, Alert, Image } from "react-native";
import * as React from "react";
import { Avatar, List } from "react-native-paper";

const Profile = () => {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        <View style={styles.header}>
          <Image
            source={require("../../assets/icons/Close.png")}
            style={styles.closeIcon}
          />
          <Text style={styles.heading}>Seu Perfil</Text>
          <Image
            source={require("../../assets/icons/config.png")}
            style={styles.settingsIcon}
          />
        </View>

        <View style={styles.profileContainer}>
          <Avatar.Image
            size={150}
            source={require("../../assets/images/profile.png")}
          />
          <Text style={styles.username}>Usuário</Text>
          <View style={styles.statsContainer}>
            <View style={[styles.statItem, styles.marginRight]}>
              <Text style={styles.statValue}>70kg</Text>
              <Text style={styles.statLabel}>Peso</Text>
            </View>
            <View style={[styles.statItem, styles.marginRight]}>
              <Text style={styles.statValue}>1,70</Text>
              <Text style={styles.statLabel}>Altura</Text>
            </View>
            <View style={styles.statItem}>
              <Text style={styles.statValue}>25</Text>
              <Text style={styles.statLabel}>Idade</Text>
            </View>
          </View>
        </View>
        <View style={styles.line}></View>
        <View style={styles.goalsContainer}>
          <Text style={styles.goalsHeading}>Seus Objetivos</Text>
          <List.Section>
            <List.Item
              title="Corrida"
              description={
                <Text>
                  <Text style={styles.descriptionText}>70/80</Text>
                  <Text style={styles.lightText}>km/h</Text>
                </Text>
              }
              left={() => (
                <Image
                  source={require("../../assets/icons/run.png")}
                  style={styles.icon}
                />
              )}
              right={() => (
                <Image
                  source={require("../../assets/icons/percentage.png")}
                  style={{ width: 38, height: 38 }}
                />
              )}
            />
            <List.Item
              title="Dormir"
              description={
                <Text>
                  <Text style={styles.descriptionText}>50/60</Text>
                  <Text style={styles.lightText}>hrs</Text>
                </Text>
              }
              left={() => (
                <Image
                  source={require("../../assets/icons/sleep.png")}
                  style={styles.icon}
                />
              )}
              right={() => (
                <Image
                  source={require("../../assets/icons/percentage2.png")}
                  style={{ width: 38, height: 38 }}
                />
              )}
            />
            <List.Item
              title="Perda de peso"
              description={
                <Text>
                  <Text style={styles.descriptionText}>70/100</Text>
                  <Text style={styles.lightText}>kg</Text>
                </Text>
              }
              left={() => (
                <Image
                  source={require("../../assets/icons/fire.png")}
                  style={styles.icon}
                />
              )}
              right={() => (
                <Image
                  source={require("../../assets/icons/percentage3.png")}
                  style={{ width: 38, height: 38 }}
                />
              )}
            />
          </List.Section>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  profileContainer: {
    alignItems: "center",
    marginTop: 28,
  },
  username: {
    fontSize: 24,
    marginTop: 16,
    marginBottom: 2,
    color: "#242752",
    fontFamily: "Circular-Medium",
  },

  marginRight: {
    marginRight: 24,
  },

  statsContainer: {
    flexDirection: "row",
    marginTop: 8,
    justifyContent: "space-around",
  },
  statItem: {
    alignItems: "center",
  },
  statValue: {
    fontSize: 18,
    fontFamily: "Manrope-Bold",
    color: "#242752",
  },
  statLabel: {
    fontSize: 16,
    color: "#777",
    fontFamily: "Manrope-Medium",
  },
  goalsContainer: {
    marginTop: 64,
    marginHorizontal: 36,
  },
  goalsHeading: {
    fontSize: 20,
    fontFamily: "Manrope-Bold",
    color: "#242752",
  },

  header: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 16,
    marginTop: 14,
  },

  closeIcon: {
    width: 64,
    height: 64,
    marginRight: "auto",
  },
  heading: {
    fontSize: 18,
    color: "#242752",
    textAlign: "center",
    fontFamily: "Circular-Medium",
  },

  settingsIcon: {
    width: 64,
    height: 64,
    marginLeft: "auto",
  },

  icon: {
    width: 32,
    height: 32,
    marginRight: 10,
  },

  descriptionText: {
    color: "#97A7B7",
    fontFamily: "Manrope-Medium",
    fontSize: 14,
  },
  lightText: {
    color: "#97A7B7",
    fontSize: 14,
  },
});

export default Profile;
