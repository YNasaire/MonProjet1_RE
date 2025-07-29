
import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';

const MODE_LABELS = {
  orange: 'Orange Money',
  mtn: 'MTN Mobile Money',
  stripe: 'Stripe',
  cb: 'Carte Bancaire',
};

export default function ConfirmationScreen({ route, navigation }) {
  const { montant, evenement, mode, telephone, email, cb, confirmationMsg } = route.params || {};
  const [step, setStep] = useState(1); // 1: confirmation, 2: billet, 3: retour
  const [downloaded, setDownloaded] = useState(false);

  // Générer un numéro de réservation fictif
  const reservationNumber = 'RES' + Math.floor(100000 + Math.random() * 900000);
  // Générer un cota fictif (ex: 1 place)
  const cota = '1 place';

  const handleOk = () => {
    setStep(2);
  };

  const handleDownload = () => {
    setDownloaded(true);
    setStep(3);
    Alert.alert('Téléchargement', 'Téléchargement du billet effectué avec succès.');
  };

  const handleReturn = () => {
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      {step === 1 && (
        <>
          <Text style={styles.title}>Confirmation</Text>
          <Text style={styles.message}>
            Paiement de <Text style={styles.bold}>{montant} FCFA</Text> pour <Text style={styles.bold}>&quot;{evenement}&quot;</Text> soumis via <Text style={styles.bold}>{MODE_LABELS[mode] || '---'}</Text> !
          </Text>
          {mode === 'orange' || mode === 'mtn' ? (
            <Text style={styles.info}>Numéro utilisé : <Text style={styles.bold}>{telephone}</Text></Text>
          ) : null}
          {mode === 'stripe' ? (
            <Text style={styles.info}>Email utilisé : <Text style={styles.bold}>{email}</Text></Text>
          ) : null}
          {mode === 'cb' ? (
            <Text style={styles.info}>Carte utilisée : <Text style={styles.bold}>{cb}</Text></Text>
          ) : null}
          <Text style={styles.confirmation}>{confirmationMsg}</Text>
          <TouchableOpacity style={styles.okBtn} onPress={handleOk}>
            <Text style={styles.okBtnText}>OK</Text>
          </TouchableOpacity>
        </>
      )}
      {step === 2 && (
        <>
          <Text style={styles.title}>Votre billet de réservation</Text>
          <View style={styles.ticketBox}>
            <Text style={styles.ticketInfo}><Text style={styles.bold}>Événement :</Text> {evenement}</Text>
            <Text style={styles.ticketInfo}><Text style={styles.bold}>Montant :</Text> {montant} FCFA</Text>
            <Text style={styles.ticketInfo}><Text style={styles.bold}>Cota :</Text> {cota}</Text>
            <Text style={styles.ticketInfo}><Text style={styles.bold}>Numéro de réservation :</Text> {reservationNumber}</Text>
            {mode === 'orange' || mode === 'mtn' ? (
              <Text style={styles.ticketInfo}><Text style={styles.bold}>Numéro Mobile :</Text> {telephone}</Text>
            ) : null}
            {mode === 'stripe' ? (
              <Text style={styles.ticketInfo}><Text style={styles.bold}>Email Stripe :</Text> {email}</Text>
            ) : null}
            {mode === 'cb' ? (
              <Text style={styles.ticketInfo}><Text style={styles.bold}>N° Carte Bancaire :</Text> {cb}</Text>
            ) : null}
            <Text style={styles.ticketInfo}><Text style={styles.bold}>Informations supplémentaires :</Text> Présentez ce billet à l'entrée de l'événement. Valable pour une seule entrée.</Text>
          </View>
          <TouchableOpacity style={styles.downloadBtn} onPress={handleDownload}>
            <Text style={styles.downloadBtnText}>Télécharger mon billet</Text>
          </TouchableOpacity>
        </>
      )}
      {step === 3 && (
        <>
          <Text style={styles.title}>Billet téléchargé</Text>
          <Text style={styles.confirmation}>Votre billet a été téléchargé avec succès.</Text>
          <TouchableOpacity style={styles.okBtn} onPress={handleReturn}>
            <Text style={styles.okBtnText}>Retour à la page de paiement</Text>
          </TouchableOpacity>
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  ticketBox: {
    borderWidth: 1,
    borderColor: '#007AFF',
    borderRadius: 12,
    backgroundColor: '#fff',
    padding: 18,
    marginVertical: 18,
    width: '100%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  ticketInfo: {
    fontSize: 16,
    color: '#333',
    marginBottom: 8,
  },
  downloadBtn: {
    marginTop: 40,
    backgroundColor: '#28a745',
    paddingVertical: 14,
    paddingHorizontal: 40,
    borderRadius: 8,
    alignItems: 'center',
  },
  downloadBtnText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 18,
    letterSpacing: 1,
  },
  okBtn: {
    marginTop: 40,
    backgroundColor: '#007AFF',
    paddingVertical: 14,
    paddingHorizontal: 40,
    borderRadius: 8,
    alignItems: 'center',
  },
  okBtnText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 18,
    letterSpacing: 1,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#f8f9fa',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#007AFF',
    marginBottom: 24,
  },
  message: {
    fontSize: 18,
    textAlign: 'center',
    marginBottom: 10,
    color: '#222',
  },
  info: {
    fontSize: 16,
    color: '#555',
    marginBottom: 10,
  },
  confirmation: {
    fontSize: 16,
    color: '#007AFF',
    marginTop: 20,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  bold: {
    fontWeight: 'bold',
    color: '#222',
  },
});
