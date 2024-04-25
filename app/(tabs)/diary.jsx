import { View } from "react-native-animatable";
import { Text } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";

const Recipes = () => {
  return (
    <SafeAreaView>
      <View>
        <Text className="text-3xl mx-10 mt-10 font-bold">Diário</Text>
      </View>
    </SafeAreaView>
  );
};

export default Recipes;
