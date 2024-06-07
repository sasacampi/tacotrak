import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Alert,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
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
    backgroundColor: "#1E90FF",
    paddingVertical: 15,
    borderRadius: 5,
    alignItems: "center",
    marginVertical: 10,
  },
  disabledButton: {
    backgroundColor: "#B0C4DE",
  },
  buttonText: {
    color: "#FFFFFF",
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
    backgroundColor: "#333333",
    color: "#FFFFFF",
    padding: 15,
    borderRadius: 5,
    marginBottom: 15,
    fontSize: 16,
  },
});

const SignIn = () => {
  const [form, setForm] = useState({ email: "", password: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (name, value) => {
    setForm({ ...form, [name]: value });
  };

  const submit = () => {
    if (!form.email || !form.password) {
      Alert.alert("Erro", "Por favor, preencha todos os campos.");
      return;
    }

    setIsSubmitting(true);
    const loginUrl = "http://localhost:3000/login";

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

        Alert.alert("Sucesso", "Login realizado com sucesso.");

        navigation.navigate("home");
      })
      .catch((error) => {
        Alert.alert("Erro", error.message);
      })
      .finally(() => {
        setIsSubmitting(false);
      });
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={{ padding: "20px" }}>
        <Text style={styles.title}>Sign In</Text>

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
          onPress={submit}
          title={isSubmitting ? "Signing In..." : "Sign In"}
          disabled={isSubmitting}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0D0D0D",
    justifyContent: "center",
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#FFFFFF",
    marginBottom: 20,
    textAlign: "center",
  },
});

export default SignIn;
