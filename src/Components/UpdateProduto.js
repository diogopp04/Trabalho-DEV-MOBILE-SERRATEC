import * as React from 'react';
import { TextInput, SafeAreaView, View, FlatList, StyleSheet, StatusBar,Modal ,Image, Pressable, Button, Text, Alert} from 'react-native';
import api from '../services/api';

const UpdateProduto = (props) => {
    
    const [categoria, setCategoria] = React.useState('');
    const [nomeProduto, setNomeProduto] = React.useState('');
    const [valor, setValor] = React.useState('');
    const [foto, setFoto] = React.useState('');
    const [id, setId] = React.useState(props.id);
    const [produto, setProduto] = React.useState([]);
    console.log(valor)
    //MODAL---
    const [modalVisible, setModalVisible] = React.useState(false);
    //--------

    const salvarProduto = async() => {
        const produtoData = {
            id: id,
            nome: nomeProduto,
            valorUnitario: valor,
            categoria:categoria,
            foto: foto
        }
    
        const { data } = await api.put(`/produtos/${props.id}`, produtoData)
    
        const produtoEditado = produto.map( produto => {
          if(produto.id === data.id) {
            return {
              id: produto.id,...produtoData
            }
          }
          return produto
        })
    
        setProduto(produtoEditado)
        setNomeProduto("")
        setValor("")
        setFoto("")
        
        alert("Produto atualizado com sucesso")
        window.location.reload()
    }

    React.useEffect(() => {
        setId(props.id);
        setNomeProduto(props.nome);
        setValor(props.valor);
        setFoto(props.foto);
    }, []);


    return(
        <View style={styles.centeredView}>
            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => {
                    setModalVisible(!modalVisible);
                }}
            >
                <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                        <Text style={styles.modalText}>Atualizar Produto</Text>
                        <View style={{height: 250, width: 300, backgroundColor: 'white'}}>
                            <Image source={{uri : foto}} style={{height: 250, width: 250}}/>
                        </View>
                        <TextInput defaultValue={props.nome}
                            onChangeText={setNomeProduto}
                            maxLength={40} 
                            style={{backgroundColor: 'white', 
                            width:300, 
                            padding: 5}}>
                        </TextInput>
                        <TextInput
                            onChangeText={setValor}
                            keyboardType='numeric'
                            style={{backgroundColor: 'white', 
                            width:300, 
                            padding: 5}}
                        >
                        </TextInput>
                        <TextInput defaultValue={props.foto}
                            onChangeText={setFoto}
                            style={{backgroundColor: 'white', 
                            width:300, 
                            padding: 5}}
                        >
                        </TextInput>
                        
                        <Pressable
                            style={[styles.button, styles.buttonClose]}
                            onPress={() => setModalVisible(!modalVisible)}
                        >
                            <Text style={styles.textStyle}>Fechar</Text>
                        </Pressable>
                        <Pressable
                            style={[styles.button, styles.buttonClose]}
                            onPress={() => setModalVisible(!modalVisible)}
                        >
                            <Text style={styles.textStyle}>Salvar</Text>
                        </Pressable>
                    </View>
                </View>
            </Modal>
            <Pressable
                style={[styles.button, styles.buttonOpen]}
                onPress={() => setModalVisible(true)}
            >
                <Text style={styles.textStyle}>Atualizar</Text>
            </Pressable>
        </View>
    )
}

export default UpdateProduto;

const styles = StyleSheet.create({
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 100,
    },
    modalView: {
        margin: 20,
        backgroundColor: "grey",
        borderRadius: 20,
        padding: 35,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5
    },
    button: {
        borderRadius: 10,
        padding: 10,
        elevation: 2,
    },
    buttonOpen: {
        width: "100%",
        backgroundColor: "#181818",
        height: 50,
    },
    buttonClose: {
        backgroundColor: "#2196F3",
    },
    textStyle: {
        padding: 5,
        color: "white",
        fontWeight: "bold",
        alignSelf: 'center'
    },
    modalText: {
        marginBottom: 15,
        textAlign: "center"
    },
});