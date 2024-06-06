import React, { useState } from "react";
import { View, Text, ScrollView, Dimensions, Alert } from "react-native";
import { CustomButton, FormField } from "../../components";

const SignUp = () => {
  const [isSubmitting, setSubmitting] = useState(false);
  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
  });

  const signUp = async () => {
    if (form.username === "" || form.email === "" || form.password === "") {
      Alert.alert("Error", "Please fill in all fields");
      return;
    }

    setSubmitting(true);

    try {
      const response = await fetch("http://192.168.1.100:3000/api/user", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      if (!response.ok) {
        throw new Error("Failed to sign up");
      }

      Alert.alert("Success", "Sign up successful");
    } catch (error) {
      Alert.alert("Error", error.message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
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
          }}
        >
          Taco<Text style={{ color: "orange" }}>trak</Text>
        </Text>

        <Text
          style={{
            fontSize: 20,
            fontWeight: "600",
            color: "white",
            marginTop: 10,
            fontFamily: "Psemibold",
          }}
        >
          Sign Up for Tacotrak
        </Text>

        <FormField
          title="Username"
          value={form.username}
          handleChangeText={(text) => setForm({ ...form, username: text })}
          otherStyles={{ marginTop: 10 }}
        />

        <FormField
          title="Email"
          value={form.email}
          handleChangeText={(text) => setForm({ ...form, email: text })}
          otherStyles={{ marginTop: 7 }}
          keyboardType="email-address"
        />

        <FormField
          title="Password"
          value={form.password}
          handleChangeText={(text) => setForm({ ...form, password: text })}
          otherStyles={{ marginTop: 7 }}
          secureTextEntry
        />

        <CustomButton
          title="Sign Up"
          handlePress={signUp}
          containerStyles={{ marginTop: 7 }}
          isLoading={isSubmitting}
        />

        <View
          style={{
            flexDirection: "row",
            justifyContent: "center",
            paddingTop: 5,
          }}
        >
          <Text style={{ fontSize: 16, color: "white", marginRight: 5 }}>
            Already have an account?
          </Text>
          <Link
            href="/sign-in"
            style={{ fontSize: 16, color: "orange", fontWeight: "600" }}
          >
            Sign In
          </Link>
        </View>
      </View>
    </ScrollView>
  );
};

export default SignUp;
