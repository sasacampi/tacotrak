import React, { useState } from "react";
import {
  View,
  Text,
  ScrollView,
  Alert,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from "react-native";

const CustomButton = ({ onPress, title, disabled }) => {
  return (
    <TouchableOpacity
      style={[stylesButton.button, disabled && styles.disabledButton]}
      onPress={onPress}
      disabled={disabled}
    >
      <Text style={styles.buttonText}>{title}</Text>
    </TouchableOpacity>
  );
};

const stylesButton = StyleSheet.create({
  button: {
    backgroundColor: "#8b5cf6",
    paddingVertical: 15,
    borderRadius: 50,
    alignItems: "center",
    marginVertical: 10,
    color: "#fff",
  },
  disabledButton: {
    backgroundColor: "#B0C4DE",
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
});

const FormField = ({
  placeholder,
  value,
  onChangeText,
  secureTextEntry,
  keyboardType,
  autoCapitalize,
}) => {
  return (
    <TextInput
      style={formStyles.input}
      placeholder={placeholder}
      placeholderTextColor="#6B7280"
      value={value}
      onChangeText={onChangeText}
      secureTextEntry={secureTextEntry}
      keyboardType={keyboardType}
      autoCapitalize={autoCapitalize}
    />
  );
};

const formStyles = StyleSheet.create({
  input: {
    backgroundColor: "#fff",
    color: "#242752",
    padding: 15,
    borderRadius: 50,
    marginBottom: 15,
    fontSize: 16,
    borderColor: "#242752",
    borderWidth: 1,
  },
});

const SignUp = () => {
  const [isSubmitting, setSubmitting] = useState(false);
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleChange = (name, value) => {
    setForm({ ...form, [name]: value });
  };

  const signUp = () => {
    if (!form.name || !form.email || !form.password) {
      Alert.alert("Erro", "Por favor, preencha todos os campos.");
      return;
    }

    setSubmitting(true);
    const signUpUrl = "http://localhost:3000/users";

    fetch(signUpUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(form),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Erro ao criar usuário. Por favor, tente novamente.");
        }

        Alert.alert("Sucesso", "Usuário criado com sucesso.");

        setForm({
          name: "",
          email: "",
          password: "",
        });

        // Redirect to sign in

        navigation.navigate("sign-in");
      })
      .catch((error) => {
        Alert.alert("Erro", error.message);
      })
      .finally(() => {
        setSubmitting(false);
      });
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={{ padding: "20px" }}>
        <Text style={styles.title}>Bem-vindo</Text>
        <Text style={styles.subtitle}>Crie sua conta para continuar.</Text>

        <FormField
          placeholder="Username"
          value={form.name}
          onChangeText={(value) => handleChange("name", value)}
        />

        <FormField
          placeholder="Email"
          value={form.email}
          onChangeText={(value) => handleChange("email", value)}
          keyboardType="email-address"
          autoCapitalize="none"
        />

        <FormField
          placeholder="Password"
          value={form.password}
          onChangeText={(value) => handleChange("password", value)}
          secureTextEntry
        />

        <CustomButton
          onPress={signUp}
          title={isSubmitting ? "Criando conta..." : "Criar conta"}
          disabled={isSubmitting}
        />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: "center",
    paddingHorizontal: 20,
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#242752",
    textAlign: "left",
  },
  subtitle: {
    color: "#97A7B7",
    marginBottom: 30,
    fontSize: 16,
  },
});

export default SignUp;
