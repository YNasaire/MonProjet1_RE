
import React, { useState } from 'react';
import { View, Text, TextInput, Button, Alert, StyleSheet, TouchableOpacity, Platform } from 'react-native';
import { Picker } from '@react-native-picker/picker';

const EVENEMENTS = [
  'Concert Davido',
  'Concert Burna Boy',
  'Conférence IA',
  'Spectacle Humour',
  'Boxing Night',
  'Anniversaire Géant',
  'Match Cameroun Vs France',
  'Festival Jazz',
  'Soirée Gospel',
  'Salon de l’Innovation',
  'Exposition Art Contemporain',
  'Festival Cinéma Africain',
  'Concert Ayo',
  'Festival Musique Urbaine',
  'Festival de Danse',
  'Festival de Théâtre',
  'Parlement de rire',
  'Festival de la Gastronomie',
];

const MODES = [
  { label: 'Orange Money', value: 'orange' },
  { label: 'MTN MoMo', value: 'mtn' },
  { label: 'Stripe', value: 'stripe' },
  { label: 'Carte Bancaire', value: 'cb' },
];

export default function PaiementScreen({ navigation }) {
  const [montant, setMontant] = useState('');
  const [evenement, setEvenement] = useState(EVENEMENTS[0]);
  const [mode, setMode] = useState(MODES[0].value);
  const [telephone, setTelephone] = useState('');
  const [email, setEmail] = useState('');
  const [cb, setCB] = useState('');

  const handlePaiement = () => {
    const montantNum = parseFloat(montant);
    if (isNaN(montantNum) || montantNum <= 0) {
      Alert.alert('Erreur', 'Le montant doit être supérieur à 0');
      return;
    }
    if (mode === 'orange' || mode === 'mtn') {
      if (!telephone || telephone.length < 9) {
        Alert.alert('Erreur', 'Numéro mobile invalide');
        return;
      }
    }
    if (mode === 'stripe') {
      if (!email || !email.includes('@')) {
        Alert.alert('Erreur', 'Email Stripe invalide');
        return;
      }
    }
    if (mode === 'cb') {
      if (!cb || cb.length < 12) {
        Alert.alert('Erreur', 'Numéro de carte invalide');
        return;
      }
    }
    // Message de confirmation selon le mode
    let confirmationMsg = '';
    if (mode === 'orange' || mode === 'mtn') {
      confirmationMsg = 'Consultez votre messagerie pour la confirmation.';
    } else {
      confirmationMsg = 'Consultez votre email pour la confirmation.';
    }
    navigation.navigate('Confirmation', {
      montant: montantNum,
      evenement,
      mode,
      telephone,
      email,
      cb,
      confirmationMsg,
    });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Paiement de billet</Text>
      <Text style={styles.label}>Montant (FCFA)</Text>
      <TextInput
        style={styles.input}
        keyboardType="numeric"
        placeholder="Ex: 5000"
        value={montant}
        onChangeText={setMontant}
      />

      <Text style={styles.label}>Événement</Text>
      <View style={styles.pickerWrapper}>
        <Picker
          selectedValue={evenement}
          style={styles.picker}
          onValueChange={setEvenement}
        >
          {EVENEMENTS.map(ev => (
            <Picker.Item key={ev} label={ev} value={ev} />
          ))}
        </Picker>
      </View>

      <Text style={styles.label}>Mode de paiement</Text>
      <View style={styles.modesRow}>
        {MODES.map(m => (
          <TouchableOpacity
            key={m.value}
            style={[styles.modeBtn, mode === m.value && styles.modeBtnActive]}
            onPress={() => setMode(m.value)}
          >
            <Text style={mode === m.value ? styles.modeBtnTextActive : styles.modeBtnText}>{m.label}</Text>
          </TouchableOpacity>
        ))}
      </View>

      {(mode === 'orange' || mode === 'mtn') && (
        <>
          <Text style={styles.label}>Numéro Mobile Money</Text>
          <TextInput
            style={styles.input}
            keyboardType="phone-pad"
            placeholder="Ex: 699000000"
            value={telephone}
            onChangeText={setTelephone}
          />
        </>
      )}
      {mode === 'stripe' && (
        <>
          <Text style={styles.label}>Email Stripe</Text>
          <TextInput
            style={styles.input}
            keyboardType="email-address"
            placeholder="Ex: email@stripe.com"
            value={email}
            onChangeText={setEmail}
          />
        </>
      )}
      {mode === 'cb' && (
        <>
          <Text style={styles.label}>Numéro de carte bancaire</Text>
          <TextInput
            style={styles.input}
            keyboardType={Platform.OS === 'ios' ? 'number-pad' : 'numeric'}
            placeholder="Ex: 1234 5678 9012"
            value={cb}
            onChangeText={setCB}
          />
        </>
      )}

      <Button title="Payer" onPress={handlePaiement} color="#007AFF" />
    </View>
  );
}


const styles = StyleSheet.create({
  container: {
    padding: 20,
    flex: 1,
    backgroundColor: '#f8f9fa',
    justifyContent: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 24,
    color: '#007AFF',
    textAlign: 'center',
  },
  label: {
    fontSize: 16,
    marginTop: 18,
    marginBottom: 4,
    color: '#333',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 10,
    marginBottom: 8,
    backgroundColor: '#fff',
  },
  pickerWrapper: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    backgroundColor: '#fff',
    marginBottom: 8,
    overflow: 'hidden',
  },
  picker: {
    width: '100%',
    height: 44,
  },
  modesRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
    marginTop: 8,
  },
  modeBtn: {
    flex: 1,
    marginHorizontal: 4,
    paddingVertical: 10,
    borderRadius: 8,
    backgroundColor: '#e0e0e0',
    alignItems: 'center',
  },
  modeBtnActive: {
    backgroundColor: '#007AFF',
  },
  modeBtnText: {
    color: '#333',
    fontWeight: 'bold',
  },
  modeBtnTextActive: {
    color: '#fff',
    fontWeight: 'bold',
  },
});
