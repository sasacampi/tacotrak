import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  Image,
  FlatList,
  ScrollView,
} from "react-native";
import DropDownPicker from "react-native-dropdown-picker";
import { IconButton } from "react-native-paper";
import profileImage from "../../assets/images/profile.png";
import { LinearGradient } from "expo-linear-gradient";

const getCurrentDate = () => {
  const date = new Date();
  return date.toLocaleDateString("pt-BR", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};

const App = () => {
  const [open, setOpen] = useState({
    caféDaManhã: false,
    almoço: false,
    jantar: false,
    lanches: false,
  });
  const [items, setItems] = useState({
    caféDaManhã: [],
    almoço: [],
    jantar: [],
    lanches: [],
  });
  const [totals, setTotals] = useState({
    caféDaManhã: { calorias: 0, carboidratos: 0, proteínas: 0, gordura: 0 },
    almoço: { calorias: 0, carboidratos: 0, proteínas: 0, gordura: 0 },
    jantar: { calorias: 0, carboidratos: 0, proteínas: 0, gordura: 0 },
    lanches: { calorias: 0, carboidratos: 0, proteínas: 0, gordura: 0 },
  });
  const objetivoTotalCalorias = 2000;

  const adicionarItem = (tipoRefeição) => {
    const novoItem = {
      id: items[tipoRefeição].length + 1,
      nome: "Item de comida",
      calorias: 100,
      carboidratos: 20,
      proteínas: 10,
      gordura: 5,
    };
    setItems({
      ...items,
      [tipoRefeição]: [...items[tipoRefeição], novoItem],
    });
    setTotals({
      ...totals,
      [tipoRefeição]: {
        calorias: totals[tipoRefeição].calorias + novoItem.calorias,
        carboidratos: totals[tipoRefeição].carboidratos + novoItem.carboidratos,
        proteínas: totals[tipoRefeição].proteínas + novoItem.proteínas,
        gordura: totals[tipoRefeição].gordura + novoItem.gordura,
      },
    });
  };

  const removerItem = (
    tipoRefeição,
    id,
    calorias,
    carboidratos,
    proteínas,
    gordura
  ) => {
    setItems({
      ...items,
      [tipoRefeição]: items[tipoRefeição].filter((item) => item.id !== id),
    });
    setTotals({
      ...totals,
      [tipoRefeição]: {
        calorias: totals[tipoRefeição].calorias - calorias,
        carboidratos: totals[tipoRefeição].carboidratos - carboidratos,
        proteínas: totals[tipoRefeição].proteínas - proteínas,
        gordura: totals[tipoRefeição].gordura - gordura,
      },
    });
  };

  const renderRefeição = (tipoRefeição) => {
    const formattedRefeição =
      tipoRefeição.charAt(0).toUpperCase() + tipoRefeição.slice(1);
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
              <Text style={styles.gradientText}>{formattedRefeição}</Text>
            </View>

            <View style={styles.addButtonContainer}>
              <IconButton
                icon="plus"
                size={24}
                onPress={() => adicionarItem(tipoRefeição)}
                color="#FFFFFF"
              />
            </View>
          </LinearGradient>
        </View>
        {/* cristo do ceu que trabalho fazer grid de cor */}
        <View style={styles.shadowContainer}>
          <Text style={styles.calories}>
            {totals[tipoRefeição].calorias} kcal
          </Text>
          <View style={styles.macroContainer}>
            <View style={styles.macroRow}>
              <Text
                style={[styles.macroText, { color: "#FC74B1", marginRight: 5 }]}
              >
                ●
              </Text>
              <Text style={styles.gorduraText}>
                Gordura: {totals[tipoRefeição].gordura}g
              </Text>
            </View>
            <View style={styles.macroRow}>
              <Text
                style={[styles.macroText, { color: "#FCAE48", marginRight: 5 }]}
              >
                ●
              </Text>
              <Text style={styles.carbsText}>
                Carbs: {totals[tipoRefeição].carboidratos}g
              </Text>
            </View>
            <View style={styles.macroRow}>
              <Text
                style={[styles.macroText, { color: "#B46EE2", marginRight: 5 }]}
              >
                ●
              </Text>
              <Text style={styles.protText}>
                Prot: {totals[tipoRefeição].proteínas}g
              </Text>
            </View>
          </View>
          <DropDownPicker
            open={open[tipoRefeição]}
            value={null}
            items={items[tipoRefeição].map((item) => ({
              label: item.nome,
              value: item.id,
            }))}
            setOpen={(value) => setOpen({ ...open, [tipoRefeição]: value })}
            setValue={() => {}}
            setItems={(items) => setItems({ ...items, [tipoRefeição]: items })}
            style={styles.dropdown}
            placeholder="Selecione um item"
            textStyle={{
              color: "#888",
              fontFamily: "Manrope-ExtraLight",
              marginLeft: 6,
            }}
          />
          <FlatList
            data={items[tipoRefeição]}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => (
              <View style={styles.foodItem}>
                <Text>{item.nome}</Text>
                <Text>{item.calorias} kcal</Text>
                <IconButton
                  icon="close"
                  size={24}
                  onPress={() =>
                    removerItem(
                      tipoRefeição,
                      item.id,
                      item.calorias,
                      item.carboidratos,
                      item.proteínas,
                      item.gordura
                    )
                  }
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
      <ScrollView>
        <View style={styles.headerContainer}>
          <Image source={profileImage} style={styles.icon} />
          <View style={styles.textContainer}>
            <Text style={styles.welcomeText}>Olá, nome de usuário.</Text>
            <Text style={styles.dateText}>{getCurrentDate()}</Text>
          </View>
        </View>
        <View style={styles.container}>
          {renderRefeição("caféDaManhã")}
          {renderRefeição("almoço")}
          {renderRefeição("jantar")}
          {renderRefeição("lanches")}
        </View>

        <View style={styles.summaryDivider}></View>

        <View style={styles.summaryContainer}>
          <Text style={styles.summaryTitle}>Sumário:</Text>
          <View style={styles.caloriesContainer}>
            <Text style={styles.label}>Calorias restantes:</Text>
            <Text style={styles.value}>
              {objetivoTotalCalorias -
                (totals.caféDaManhã.calorias +
                  totals.almoço.calorias +
                  totals.jantar.calorias +
                  totals.lanches.calorias)}
            </Text>
          </View>
          <View style={styles.caloriesContainer}>
            <Text style={styles.label}>Calorias consumidas:</Text>
            <Text style={styles.value}>
              {totals.caféDaManhã.calorias +
                totals.almoço.calorias +
                totals.jantar.calorias +
                totals.lanches.calorias}
            </Text>
          </View>
          <View style={styles.caloriesContainer}>
            <Text style={styles.label}>39% do RDI: </Text>
            <Text style={styles.value}>
              {totals.caféDaManhã.calorias +
                totals.almoço.calorias +
                totals.jantar.calorias +
                totals.lanches.calorias}
            </Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
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
