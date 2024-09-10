import { getAuth, sendPasswordResetEmail } from "firebase/auth";
import { useState } from "react";
import {
  Alert,
  KeyboardAvoidingView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { Button, Card, TextInput } from "react-native-paper";

export const Resetpassword = () => {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handlePasswordReset = async () => {
    if (!email) {
      Alert.alert("Erro", "Por favor, insira seu e-mail.");
      return;
    }
    setIsLoading(true);
    try {
      const auth = getAuth();
      await sendPasswordResetEmail(auth, email);
      Alert.alert(
        "Sucesso",
        "Um link de redefinição de senha foi enviado para o seu e-mail."
      );
    } catch (error) {
      const err = error as { message: string };
      Alert.alert(
        "Erro",
        `Erro ao enviar o e-mail de redefinição: ${err.message}`
      );
    }
    setIsLoading(false);
  };

  return (
    <View style={styles.container}>
      <Card style={styles.card}>
        <Text>Esqueci minha senha</Text>

        <TextInput
          label="Email"
          mode="outlined"
          style={styles.input}
          value={email}
          keyboardType="email-address"
          onChangeText={setEmail}
        />
        <Button
          mode="contained"
          onPress={handlePasswordReset}
          loading={isLoading}
          style={styles.button}
          disabled={isLoading}
        >
          Enviar e-mail de redefinição
        </Button>
      </Card>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
  },
  card: {
    width: "100%",
    padding: 20,
    backgroundColor: "white",
    borderRadius: 10,
    elevation: 5,
  },
  input: {
    marginBottom: 20,
  },
  button: {
    borderRadius: 25,
  },
});
