import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const ChallengeCard = ({ challenge }) => {
  if (!challenge) return null;

  return (
    <View style={styles.card}>
      <View style={styles.header}>
        <Text style={styles.category}>{challenge.category}</Text>
        <Text style={styles.difficulty}>{challenge.difficulty}</Text>
      </View>
      
      <Text style={styles.title}>{challenge.title}</Text>
      <Text style={styles.description}>{challenge.description}</Text>
      
      <View style={styles.footer}>
        <Text style={styles.objective}>🎯 {challenge.technical_objective}</Text>
        <View style={styles.pointsBadge}>
          <Text style={styles.pointsText}>+{challenge.points} pts</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#393E46',
    borderRadius: 15,
    padding: 20,
    marginVertical: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  category: { color: '#00ADB5', fontWeight: 'bold', fontSize: 12, textTransform: 'uppercase' },
  difficulty: { color: '#F9ED69', fontSize: 12 },
  title: { color: '#EEEEEE', fontSize: 22, fontWeight: 'bold', marginBottom: 10 },
  description: { color: '#CCCCCC', fontSize: 15, lineHeight: 22, marginBottom: 15 },
  footer: { borderTopWidth: 1, borderTopColor: '#4E545C', paddingTop: 15 },
  objective: { color: '#00ADB5', fontSize: 13, fontStyle: 'italic', marginBottom: 10 },
  pointsBadge: {
    backgroundColor: '#00ADB5',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 20,
    alignSelf: 'flex-start',
  },
  pointsText: { color: '#EEEEEE', fontWeight: 'bold', fontSize: 14 },
});

export default ChallengeCard;