import { useLocalSearchParams } from "expo-router";
import React, { useEffect, useState } from "react";
import { View, Text } from "react-native";
import { Card } from "react-native-paper";

const Details = ({ route }) => {
  const { id } = useLocalSearchParams();

  const [recipe, setRecipe] = useState([]);

  useEffect(() => {
    fetch("https://run.mocky.io/v3/268497b8-2b9e-4962-b317-8d46432c794f")
      .then((response) => response.json())
      .then((data) => {
        const recipes = data.filter((recipe) => recipe.id == id);
        setRecipe(recipes[0]);
      })
      .catch((error) => console.error("Error:", error));
  }, []);

  return (
    <View>
      <Text className="mx-10 my-8 text-xl">{recipe.title}</Text>
      <View className="p-5">
        <Card>
          <Card.Cover source={{ uri: recipe.image }} />
        </Card>
      </View>
      <Text className="mx-10 my-2 text-lg">Ingredients:</Text>
      <Text className="mx-10 my-2">{recipe.ingredients}</Text>
      <Text className="mx-10 mt-5 text-lg">Instructions:</Text>
      <Text className="mx-10 my-2">{recipe.instructions}</Text>
      <Text className="mx-10 my-2 text-lg">
        Number of Servings: {recipe.servings}
      </Text>
    </View>
  );
};

export default Details;
