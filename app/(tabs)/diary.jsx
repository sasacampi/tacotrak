import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  Image,
  FlatList,
  ScrollView,
  Modal,
  TouchableHighlight,
} from "react-native";
import DropDownPicker from "react-native-dropdown-picker";
import { IconButton } from "react-native-paper";
import profileImage from "../../assets/images/profile.png";
import { LinearGradient } from "expo-linear-gradient";
import { BarChart } from "react-native-gifted-charts";

const getCurrentDate = () => {
  const date = new Date();
  return date.toLocaleDateString("pt-BR", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};

const meals = {
  breakfast: "Café Da Manhã",
  lunch: "Almoço",
  dinner: "Jantar",
  snacks: "Lanches",
};

const App = () => {
  const [foodData, setFoodData] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedMeal, setSelectedMeal] = useState("");
  const [items, setItems] = useState({
    breakfast: [],
    lunch: [],
    dinner: [],
    snacks: [],
  });

  const [totals, setTotals] = useState({
    breakfast: { calories: 0, carbohydrates: 0, protein: 0, lipids: 0 },
    lunch: { calories: 0, carbohydrates: 0, protein: 0, lipids: 0 },
    dinner: { calories: 0, carbohydrates: 0, protein: 0, lipids: 0 },
    snacks: { calories: 0, carbohydrates: 0, protein: 0, lipids: 0 },
  });

  const query = `
  {
    getAllFood {
      id,
      name,
      category {
        id,
        name
      }
      nutrients {
        carbohydrates,
        lipids,
        kcal,
        protein,
        dietaryFiber,
      }
    }
  }
`;

  const getFoodData = () => {
    try {
      fetch("https://run.mocky.io/v3/159059e1-4b8e-4dd5-a6b4-ce019df0a383", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ query }),
      })
        .then((response) => response.json())
        .then((data) => setFoodData(data));
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getFoodData();
  }, []);

  const objetivoTotalCalorias = 2000;

  const removeItem = (id, mealName, nutrients) => {
    setItems({
      ...items,
      [mealName]: items[mealName].filter((item) => item.id !== id),
    });

    setTotals({
      ...totals,
      [mealName]: {
        calories: totals[mealName].calories - parseInt(nutrients.kcal),
        carbohydrates:
          totals[mealName].carbohydrates - parseInt(nutrients.carbohydrates),
        protein: totals[mealName].protein - parseInt(nutrients.protein),
        lipids: totals[mealName].lipids - parseInt(nutrients.lipids),
      },
    });
  };

  const handleSelectFood = (item, mealName) => {
    setModalVisible(false);

    setItems({
      ...items,
      [mealName]: [...items[mealName], item],
    });

    setTotals({
      ...totals,
      [mealName]: {
        calories: totals[mealName].calories + parseInt(item.nutrients.kcal),
        carbohydrates:
          totals[mealName].carbohydrates +
          parseInt(item.nutrients.carbohydrates),
        protein: totals[mealName].protein + parseInt(item.nutrients.protein),
        lipids: totals[mealName].lipids + parseInt(item.nutrients.lipids),
      },
    });
  };

  const renderMeal = (mealName) => {
    return (
      <View style={styles.mealContainer}>
        <View style={styles.titleContainer}></View>
        <View style={styles.gradientContainer}>
          <LinearGradient
            colors={["#FC74B1", "#FCAE48"]}
            start={{ x: 0, y: 1 }}
            end={{ x: 1, y: 0 }}
            style={styles.gradient}
          >
            <View style={styles.gradientTextContainer}>
              <Text style={styles.gradientText}>{meals[mealName]}</Text>
            </View>

            <View style={styles.addButtonContainer}>
              <IconButton
                icon="plus"
                size={24}
                onPress={() => {
                  setSelectedMeal(mealName);
                  setModalVisible(true);
                }}
                color="#FFFFFF"
              />
            </View>
          </LinearGradient>
        </View>
        {/* cristo do ceu que trabalho fazer grid de cor */}
        <View style={styles.shadowContainer}>
          <Text style={styles.calories}>{totals[mealName].calories} kcal</Text>
          <View style={styles.macroContainer}>
            <View style={styles.macroRow}>
              <Text
                style={[styles.macroText, { color: "#FC74B1", marginRight: 5 }]}
              >
                ●
              </Text>
              <Text style={styles.gorduraText}>
                Gordura: {totals[mealName].lipids}g
              </Text>
            </View>
            <View style={styles.macroRow}>
              <Text
                style={[styles.macroText, { color: "#FCAE48", marginRight: 5 }]}
              >
                ●
              </Text>
              <Text style={styles.carbsText}>
                Carbs: {totals[mealName].carbohydrates}g
              </Text>
            </View>
            <View style={styles.macroRow}>
              <Text
                style={[styles.macroText, { color: "#B46EE2", marginRight: 5 }]}
              >
                ●
              </Text>
              <Text style={styles.protText}>
                Prot: {totals[mealName].protein}g
              </Text>
            </View>
          </View>
          <FlatList
            data={items[mealName]}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => (
              <View style={styles.foodItem}>
                <Text>{item.name}</Text>
                <Text>{item.nutrients.kcal} kcal</Text>
                <IconButton
                  icon="close"
                  size={24}
                  onPress={() => removeItem(item.id, mealName, item.nutrients)}
                />
              </View>
            )}
          />
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.appContainer}>
      <Modal
        animationType="slide"
        transparent={false}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
      >
        <View style={{ marginTop: 22 }}>
          <View>
            <Text>Lista de alimentos</Text>
            <FlatList
              data={foodData}
              keyExtractor={(item) => item.id.toString()}
              renderItem={({ item }) => (
                <TouchableHighlight
                  onPress={() => handleSelectFood(item, selectedMeal)}
                >
                  <View style={styles.foodItem}>
                    <Text>{item.name}</Text>
                    <Text>{item.nutrients.kcal} kcal</Text>
                    <Text>{item.nutrients.carbohydrates}c</Text>
                    <Text>{item.nutrients.lipids}g </Text>
                    <Text>{item.nutrients.protein}p</Text>
                  </View>
                </TouchableHighlight>
              )}
            />

            <TouchableHighlight
              onPress={() => {
                setModalVisible(!modalVisible);
              }}
            >
              <Text>X</Text>
            </TouchableHighlight>
          </View>
        </View>
      </Modal>
      <ScrollView>
        <View style={styles.headerContainer}>
          <Image source={profileImage} style={styles.icon} />
          <View style={styles.textContainer}>
            <Text style={styles.welcomeText}>Olá, nome de usuário.</Text>
            <Text style={styles.dateText}>{getCurrentDate()}</Text>
          </View>
        </View>
        <View style={styles.container}>
          {renderMeal("breakfast")}
          {renderMeal("lunch")}
          {renderMeal("dinner")}
          {renderMeal("snacks")}
        </View>

        <View style={styles.summaryDivider}></View>

        <View style={styles.summaryContainer}>
          <Text style={styles.summaryTitle}>Sumário:</Text>
          <View style={styles.caloriesContainer}>
            <Text style={styles.label}>Calorias restantes:</Text>
            <Text style={styles.value}>
              {objetivoTotalCalorias -
                (totals.breakfast.calories +
                  totals.lunch.calories +
                  totals.dinner.calories +
                  totals.snacks.calories)}
            </Text>
          </View>
          <View style={styles.caloriesContainer}>
            <Text style={styles.label}>Calorias consumidas:</Text>
            <Text style={styles.value}>
              {totals.breakfast.calories +
                totals.lunch.calories +
                totals.dinner.calories +
                totals.snacks.calories}
            </Text>
          </View>
          <View style={styles.caloriesContainer}>
            <Text style={styles.label}>39% do RDI: </Text>
            <Text style={styles.value}>
              {totals.breakfast.calories +
                totals.lunch.calories +
                totals.dinner.calories +
                totals.snacks.calories}
            </Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
  },

  addButton: {
    alignSelf: "flex-end",
  },

  appContainer: {
    flex: 1,
    backgroundColor: "#fff",
  },
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
    color: "#242752",
  },
  dateText: {
    fontSize: 14,
    color: "gray",
    textTransform: "capitalize",
    fontFamily: "Manrope-Medium",
  },
  container: {
    margin: 20,
    padding: 2,
    borderRadius: 8,
    backgroundColor: "#fff",
  },
  mealContainer: {
    marginBottom: 20,
  },

  macroContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 4,
    color: "#888",
  },

  gorduraText: {
    fontSize: 12,
    fontFamily: "Manrope-Medium",
    color: "#888",
  },

  carbsText: {
    fontSize: 12,
    fontFamily: "Manrope-Medium",
    color: "#888",
  },

  protText: {
    fontSize: 12,
    fontFamily: "Manrope-Medium",
    color: "#888",
  },

  dropdownHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 45,
    marginLeft: 2,
  },

  dropdown: {
    padding: 2,
    borderRadius: 18,
    borderColor: "rgb(202, 202, 202)",
    color: "#gray",
    marginTop: 25,
    marginBottom: 25,
  },

  calories: {
    fontSize: 14,
    fontFamily: "Manrope-Bold",
    color: "#242752",
    marginTop: 5,
  },
  //terminar aqui
  foodItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 10,
    backgroundColor: "#fff",
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  summaryContainer: {
    padding: 8,
    margin: 8,
    borderRadius: 8,
  },
  caloriesContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    color: "#242752",
  },
  label: {
    fontSize: 16,
    fontFamily: "Manrope-ExtraLight",
    flexWrap: "wrap",
  },
  value: {
    fontSize: 16,
    fontFamily: "Manrope-Bold",
  },

  summaryTitle: {
    fontSize: 16,
    fontFamily: "Manrope-Bold",
    color: "#242752",
  },

  addButtonContainer: {
    backgroundColor: "#fff",
    borderRadius: 25,
    padding: 2,
    width: 26,
    height: 26,
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    right: 0,
    top: 10,
    bottom: 0,
    justifyContent: "center",
    paddingRight: 2,
    marginRight: 10,
  },

  //ta mto feio esse botao deus do ceu
  addButton: {
    backgroundColor: "#F85C7F",
  },
  shadowContainer: {
    padding: 10,
    backgroundColor: "#fff",
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    shadowColor: "rgb(136, 136, 136)",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 4,
    elevation: 2,
    marginTop: -5,
    overflow: "hidden",
  },

  macroRow: {
    flexDirection: "row",
    alignItems: "center",
    marginRight: 20,
  },

  titleContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },

  gradient: {
    width: "100%",
    height: 50,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
  },

  gradientTextContainer: {
    position: "absolute",
    padding: 6,
    marginLeft: 16,
    alignItems: "left",
  },

  gradientText: {
    fontFamily: "Manrope-Bold",
    fontSize: 16.5,
    padding: 2,
    color: "#FFF",
  },

  summaryDivider: {
    height: 1,
    width: "100%",
    backgroundColor: "rgb(230, 230, 230)",
  },

  scrollViewContent: {
    flexGrow: 1,
    minHeight: "100%",
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
    paddingVertical: 20,
  },
});

export default App;
