import { View, Text, ScrollView, Dimensions, Alert, Image } from "react-native";
import * as React from "react";
import { Button, Card, Chip } from "react-native-paper";
import { useState, useEffect } from "react";
import { Link } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";

const Recipes = () => {
  const [recipes, setRecipes] = useState([]);
  const [filteredRecipes, setFilteredRecipes] = useState(recipes);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("https://run.mocky.io/v3/268497b8-2b9e-4962-b317-8d46432c794f")
      .then((response) => response.json())
      .then((data) => {
        setRecipes(data);
        setFilteredRecipes(data);
        setLoading(false);
      })
      .catch((error) => console.error("Error:", error));
  }, []);

  const handleFilter = (tag) => {
    const filtered = recipes.filter((recipe) => recipe.tags.includes(tag));
    setFilteredRecipes(filtered);
  };

  const filters = [
    "quick",
    "easy",
    "healthy",
    "vegan",
    "vegetarian",
    "dairy-free",
    "gluten-free",
  ];

  if (loading) return <Text>Loading...</Text>;
  return (
    <SafeAreaView>
      <ScrollView horizontal className="pt-2" height={60}>
        <View className="flex flex-row gap-x-5 h-10">
          {filters.map((tag) => (
            <Chip onPress={() => handleFilter(tag)}>
              <Text className="text-sm" key={`filter-${tag}`}>
                {tag}
              </Text>
            </Chip>
          ))}
        </View>
      </ScrollView>
      <ScrollView className="my-10">
        <View className="my-10 mx-10">
          <Text className="text-3xl font-bold">Receitas</Text>
        </View>
        {filteredRecipes.map((recipe, index) => (
          <View className="p-8">
            <Card>
              <Card.Cover source={{ uri: recipe.image }} />
              <Card.Content>
                <Text className="mt-5 text-lg">{recipe.title}</Text>
                <View className="flex flex-row">
                  {recipe.tags.map((tag) => (
                    <Text className="text-sm mr-2 my-2" key={tag}>
                      {tag}
                    </Text>
                  ))}
                </View>
              </Card.Content>
              <Card.Actions>
                <Button>
                  <Link
                    href={{
                      pathname: "/recipes/[id]",
                      params: { id: recipe.id },
                    }}
                  >
                    Ver mais
                  </Link>
                </Button>
              </Card.Actions>
            </Card>
          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
};

export default Recipes;
