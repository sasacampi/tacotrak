import React from "react";
import { View, Text, Image, StatusBar, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { images } from "../constants";
import { CustomButton, Loader } from "../components";
import { useGlobalContext } from "../context/GlobalProvider";

const Welcome = () => {
  const { loading, isLogged } = useGlobalContext();

  if (!loading && isLogged) return <Redirect href="/home" />;

  return (
    <SafeAreaView style={{ backgroundColor: "white", flex: 1 }}>
      <Loader isLoading={loading} />

      <ScrollView
        contentContainerStyle={{
          height: "100%",
        }}
      >
        <View
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
            paddingHorizontal: 4,
          }}
        >
          <Image
            source={images.card}
            style={{ maxWidth: 380, width: "100%", height: 329 }}
            resizeMode="contain"
          />

          <View style={{ position: "relative", marginTop: 5 }}>
            <Text
              style={{
                fontSize: 24,
                color: "#3D3D3D",
                fontWeight: "bold",
                textAlign: "center",
              }}
            >
              Alcance seus Objetivos{"\n"}
              Fitness com <Text style={{ color: "#FF6347" }}>Tacotrak</Text>
            </Text>

            <Image
              source={images.path}
              style={{
                width: 136,
                height: 15,
                position: "absolute",
                bottom: -2,
                right: -8,
              }}
              resizeMode="contain"
            />
          </View>

          <Text
            style={{
              fontSize: 14,
              fontFamily: "Pregular",
              marginBottom: 5,
              color: "#fff",
              marginTop: 5,
              textAlign: "center",
            }}
          >
            Com o TacoTrak, você controla suas calorias de forma prática e
            eficiente, utilizando a tabela brasileira de composição alimentar.
          </Text>

          <CustomButton
            title="Crie sua conta"
            handlePress={() => router.push("/sign-up")}
            containerStyles={{ width: "100%", marginTop: 7 }}
          />
        </View>
      </ScrollView>

      <StatusBar backgroundColor="#161622" style="light" />
    </SafeAreaView>
  );
};

export default Welcome;
