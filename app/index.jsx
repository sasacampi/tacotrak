import { StatusBar } from "expo-status-bar";
import { Redirect, router } from "expo-router";
import { View, Text, Image, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { images } from "../constants";
import { CustomButton, Loader } from "../components";
import { useGlobalContext } from "../context/GlobalProvider";

const Welcome = () => {
  const { loading, isLogged } = useGlobalContext();

  if (!loading && isLogged) return <Redirect href="/home" />;

  return (
    <SafeAreaView className="bg-white h-full">
      <Loader isLoading={loading} />

      <ScrollView
        contentContainerStyle={{
          height: "100%",
        }}
      >
        <View className="w-full flex justify-center items-center h-full px-4">
          <Image
            source={images.card}
            className="max-w-[380px] w-full h-[329px]"
            resizeMode="contain"
          />

          <View className="relative mt-5">
            <Text className="text-3xl text-secondary-200 font-bold text-center">
              Alcance seus Objetivos{"\n"}
              Fitness com <Text className="text-red-400">Tacotrak</Text>
            </Text>

            <Image
              source={images.path}
              className="w-[136px] h-[15px] absolute -bottom-2 -right-8"
              resizeMode="contain"
            />
          </View>

          <Text className="text-sm font-pregular mb-5 text-gray-100 mt-5 text-center">
            Com o TacoTrak, você controla suas calorias de forma prática e
            eficiente, utilizando a tabela brasileira de composição alimentar.
          </Text>

          <CustomButton
            title="Crie sua conta"
            handlePress={() => router.push("/sign-in")}
            containerStyles="w-full text-mt-7 "
          />
        </View>
      </ScrollView>

      <StatusBar backgroundColor="#161622" style="light" />
    </SafeAreaView>
  );
};

export default Welcome;
