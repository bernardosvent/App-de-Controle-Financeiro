import { useContext } from "react";
import { StyleSheet } from "react-native";
import { List } from "react-native-paper";
import { NoteContext } from "../App";

function MovementCard({ movimentacao, index, navigation }) {
  const { setSelectedNote } = useContext(NoteContext);

  return (
    <List.Item
      style={{
        borderColor: "grey",
        borderWidth: 1,
        borderRadius: 5,
        margin: 3,
        backgroundColor : movimentacao.tipo > 0 ? "#40FF57" : "#FF4040"
      }}
      
        onPress={() => {
        setSelectedNote({ movimentacao, index });
        navigation.navigate("Editar movimentação", {
          id: movimentacao.id,
        });
      }}
      title={`${movimentacao.descricao} - R$${movimentacao.valor}`}
      right={(props) => <List.Icon {...props} icon="note" />}
    />
  );
}

const styles = StyleSheet.create({
  list: {
    borderColor: "grey",
    borderWidth: 1,
    borderRadius: 5,
    margin: 3,
  },
});

export default MovementCard;
