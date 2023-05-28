import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { TextInput } from 'react-native-paper';
import { RoundedButton } from '../../components/RoundedButton';
import { fontSizes, spacing } from '../../utils/sizes';
import { colors } from '../../utils/colors';
import { Alert } from 'react-native';

export const Focus = ({ addSubject }) => {
  const [subject, setSubject] = useState(null);
  const [goals, setGoals] = useState([]);

  const addGoal = (goal, points = 10) => {
    setGoals([...goals, { goal, points }]);
  };

  const resetGoals = () => {
    Alert.alert(
      'Confirm Reset',
      'Are you sure you want to reset the list of goals?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Reset',
          onPress: () => {
            setGoals([]);
          },
        },
      ],
      { cancelable: false }
    );
  };

  const totalPoints = goals.reduce((total, goal) => total + goal.points, 0);

  const renderItem = ({ item, index }) => (
    <View style={styles.goalItem}>
      <Text style={styles.goalText}>{item.goal}</Text>
      <TouchableOpacity
        style={styles.pointsButton}
        onPress={() => {
          const newPoints = prompt('Enter new points:', item.points.toString());
          if (newPoints !== null) {
            const updatedGoals = goals.map((g, i) => {
              if (i === index) {
                return { ...g, points: parseInt(newPoints) };
              } else {
                return g;
              }
            });
            setGoals(updatedGoals);
          }
        }}
      >
        <Text style={styles.pointsText}>{item.points} points</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Today I will focus on:</Text>
        <TextInput
          style={styles.subjectInput}
          placeholder="Enter a subject"
          value={subject}
          onChangeText={setSubject}
        />
        <RoundedButton
          title="Add Goal"
          onPress={() => {
            addSubject(subject);
            setSubject(null);
          }}
        />
        <RoundedButton title="Reset Goals" onPress={resetGoals} />
      </View>
      <View style={styles.body}>
        <FlatList
          data={goals}
          renderItem={renderItem}
          keyExtractor={(item, index) => index.toString()}
        />
        <Text style={styles.totalPoints}>Total Points: {totalPoints}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 0.5,
  },
  innerContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: fontSizes.lg,
    color: colors.white,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: spacing.md,
  },
  list: {
    marginTop: spacing.md,
    marginBottom: spacing.md,
  },
  goalItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.sm,
  },
  goalText: {
    flex: 1,
    color: colors.white,
    fontSize: fontSizes.md,
  },
  pointsButton: {
    backgroundColor: colors.blue,
    padding: spacing.sm,
    borderRadius: 5,
    marginRight: spacing.sm,
  },
  pointsText: {
    color: colors.white,
    fontSize: fontSizes.md,
  },
  deleteButton: {
    backgroundColor: colors.red,
    padding: spacing.sm,
    borderRadius: 5,
  },
  deleteButtonText: {
    color: colors.white,
    fontSize: fontSizes.md,
    fontWeight: 'bold',
  },
  totalPoints: {
    color: colors.white,
    fontSize: fontSizes.md,
    fontWeight: 'bold',
  },
  resetButton: {
    backgroundColor: colors.red,
    padding: spacing.md,
    borderRadius: 5,
  },
  resetButtonText: {
    color: colors.white,
    fontSize: fontSizes.md,
    fontWeight: 'bold',
  },
});
