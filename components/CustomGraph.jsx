import React from "react";
import { View, StyleSheet } from "react-native";
import { LineChart } from "react-native-chart-kit";

const CarbProteinFatChart = ({ data }) => {
  return (
    <View style={styles.container}>
      <LineChart
        data={{
          labels: data.map((entry) => entry.date),
          datasets: [
            {
              data: data.map((entry) => entry.carbRatio),
              color: (opacity = 1) => `rgba(255, 0, 0, ${opacity})`, // Customize color
              strokeWidth: 2,
            },
            {
              data: data.map((entry) => entry.proteinRatio),
              color: (opacity = 1) => `rgba(0, 255, 0, ${opacity})`,
              strokeWidth: 2,
            },
            {
              data: data.map((entry) => entry.fatRatio),
              color: (opacity = 1) => `rgba(0, 0, 255, ${opacity})`,
              strokeWidth: 2,
            },
          ],
        }}
        width={300}
        height={200}
        yAxisSuffix="%"
        chartConfig={{
          backgroundColor: "#FFFFFF",
          backgroundGradientFrom: "#FFFFFF",
          backgroundGradientTo: "#FFFFFF",
          decimalPlaces: 1,
          color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
          labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
          style: {
            borderRadius: 16,
          },
          propsForDots: {
            r: "4",
            strokeWidth: "2",
            stroke: "#000000",
          },
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
  },
});

export default CarbProteinFatChart;
