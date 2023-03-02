import { StyleSheet } from "react-native";

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  header: {
    marginTop: 30,
    marginBottom: 15,
    backgroundColor: 'skyblue',
    flexDirection: 'row',
  },
  footer: {
    marginTop: 20,
    backgroundColor: 'skyblue',
    flexDirection: 'row',
    marginBottom:10
  },
  title: {
    color: '#fff',
    fontWeight: 'bold',
    flex: 1,
    fontSize: 23,
    textAlign: 'center',
    margin: 10,
  },
  author: {
    color: '#fff',
    fontWeight: 'bold',
    flex: 1,
    fontSize: 15,
    textAlign: 'center',
    margin: 10,
  },
  gameboard: {
    backgroundColor: '#fff',
  },
  gameinfo: {
    backgroundColor: '#fff',
    textAlign: 'center',
    justifyContent: 'center',
    fontSize: 20,
    marginTop: 10
  },
  row: {
    padding: 10
  },
  buttonText: {
    color:"#2B2B52",
    fontSize: 20
  },

  //added and edited styling
  icon: {
    margin:10,
  },
  text: {
    fontSize: 20,
    margin:10,
  },
  textSmall: {
    fontSize: 15,
    margin:10,
  },
  input: {
    borderWidth:1,
    color:'#000000',
    width:250,
    margin:10,
    padding:5,
    fontSize:20
  },
  button: {
    margin: 10,
    flexDirection: "row",
    padding: 5,
    backgroundColor: "#2895dd",
    borderRadius: 15,
  },
  flex: {
    flexDirection: "row",
  },
  center: {
    alignSelf:'center'
  }
})