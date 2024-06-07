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
        <Text style={styles.title}>Sign Up</Text>

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
          title={isSubmitting ? "Signing Up..." : "Sign Up"}
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
    backgroundColor: "#0D0D0D",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#FFFFFF",
    marginBottom: 20,
    textAlign: "center",
  },
});

export default SignUp;
