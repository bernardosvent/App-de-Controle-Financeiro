import { useEffect, useState } from "react";
import { View, StyleSheet, ScrollView, As, Alert, Text } from "react-native";
import { Button, Switch, TextInput, ToggleButton } from "react-native-paper";
import { useSQLiteContext } from "expo-sqlite";
import { inserirMovimentacoes } from "../db";
import { enumTipoMovimentacao } from "../enums/Enums";

const AddMovementScreen = ({ navigation }) => {
  const db = useSQLiteContext();
  const [descricao, setDescricao] = useState("");
  const [valor, setValor] = useState(0);
  const [tipo, setTipo] = useState(0);
  const [errorDescricao, setErrorDescricao] = useState(false);
  const [errorValor, setErrorValor] = useState(false);
  const [entrada, setEntrada] = useState(false);

  const onToggleSwitch = () => setEntrada(!entrada);
  useEffect(() => {
    setErrorDescricao(descricao.length < 5);
  }, [descricao]);

  useEffect(() => {
    setErrorValor(valor <= 0 || isNaN(valor));
  }, [valor]);

  const handleSaveMovement = async () => {
    try {
      if (errorDescricao || errorValor) return;
      const movimentacao = {
        tipo: entrada
          ? enumTipoMovimentacao.ENTRADA
          : enumTipoMovimentacao.SAIDA,
        valor,
        descricao,
        datacadastro: new Date().toLocaleDateString(),
      };

      await inserirMovimentacoes(
        db,
        movimentacao.tipo,
        movimentacao.valor,
        movimentacao.descricao,
        movimentacao.datacadastro
      );

      navigation.navigate("Movimentações");
    } catch (e) {
      alert(e);
    }
  };

  return (
    <ScrollView>
      <View style={{ padding: 20, justifyContent: "space-around" }}>
        <TextInput
          style={styles.textarea}
          placeholder="Digite aqui"
          mode="contained"
          multiline={true}
          label={"Descrição"}
          numberOfLines={5}
          error={errorDescricao}
          onChangeText={(text) => setDescricao(text)}
        />
        <TextInput
          style={styles.textarea}
          keyboardType="numeric"
          placeholder="Digite aqui"
          mode="contained"
          multiline={true}
          label={"Valor"}
          numberOfLines={5}
          error={errorValor}
          onChangeText={(valor) => setValor(parseFloat(valor | 0))}
        />
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            gap: 5,
            marginBottom: 8,
            alignSelf: "center",
          }}
        >
          <Text style={{ fontSize: 22 }}>Saída</Text>
          <Switch value={entrada} onValueChange={onToggleSwitch} />
          <Text style={{ fontSize: 22 }}>Entrada</Text>
        </View>

        <Button
          onPress={handleSaveMovement}
          mode="contained"
          buttonColor="#009067"
          icon="plus"
          disabled={errorDescricao || errorValor}
        >
          Adicionar
        </Button>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  textarea: {
    marginBottom: 8,
  },
});

export default AddMovementScreen;
