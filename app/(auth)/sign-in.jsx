import { SafeAreaView } from "react-native-safe-area-context";
import { View, Text, ScrollView, Dimensions, Alert, Image } from "react-native";
import { useState } from "react";

import { CustomButton, FormField } from "../../components";

const SignIn = () => {
  const [form, setForm] = useState({
    email: "",
    password: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const submit = () => {
    if (!form.email || !form.password) {
      Alert.alert("Erro", "Por favor, preencha todos os campos.");
      return;
    }

    setIsSubmitting(true);
    const loginUrl = "http://localhost:3000/api/login";

    fetch(loginUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(form),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(
            "Erro de autenticação. Por favor, verifique suas credenciais."
          );
        }
        return response.json();
      })
      .then((data) => {
        const { token } = data;

        console.log("JWT Token:", token);
      })
      .catch((error) => {
        Alert.alert("Erro", error.message);
      })
      .finally(() => {
        setIsSubmitting(false);
      });
  };

  return (
    <SafeAreaView style={{ backgroundColor: "#0D0D0D", flex: 1 }}>
      <ScrollView>
        <View
          style={{
            flex: 1,
            justifyContent: "center",
            paddingHorizontal: 20,
            minHeight: Dimensions.get("window").height - 100,
          }}
        >
          <Text
            style={{
              fontSize: 30,
              fontWeight: "800",
              color: "white",
              marginTop: 10,
              fontFamily: "Psemibold",
              textAlign: "center",
            }}
          >
            Taco<Text style={{ color: "orange" }}>trak</Text>
          </Text>

          <Text
            style={{
              fontSize: 24,
              color: "white",
              textAlign: "center",
              marginTop: 10,
            }}
          >
            Entrar no Tacotrak
          </Text>

          <FormField
            title="Email"
            value={form.email}
            handleChangeText={(e) => setForm({ ...form, email: e })}
            otherStyles={{ marginTop: 20 }}
            keyboardType="email-address"
          />

          <FormField
            title="Senha"
            value={form.password}
            handleChangeText={(e) => setForm({ ...form, password: e })}
            otherStyles={{ marginTop: 20 }}
            secureTextEntry={true}
          />

          <CustomButton
            title="Entrar"
            handlePress={submit}
            containerStyles={{ marginTop: 20 }}
            isLoading={isSubmitting}
          />

          <View
            style={{
              flexDirection: "row",
              justifyContent: "center",
              marginTop: 10,
            }}
          >
            <Text style={{ fontSize: 16, color: "#FFFFFF" }}>
              Não tem uma conta?{" "}
            </Text>
            <Link to="/sign-up" style={{ fontSize: 16, color: "#FF6F61" }}>
              Cadastrar-se
            </Link>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SignIn;
