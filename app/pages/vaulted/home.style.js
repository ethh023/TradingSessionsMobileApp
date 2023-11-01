import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  main_container: {
    flex: 1,
    justifyContent: "center",
    width: "80%",
    alignSelf: "center",
  },
  header_text: {
    fontSize: 24,
    color: "black",
    textAlign: "center",
    padding: 20,
  },
  body_text: {
    fontSize: 14,
    color: "black",
  },
  dropdown: {
    padding: 10,
  },
  dropdown_select: {
    backgroundColor: "#F5F5F5",
    borderRadius: 30,
  },
  continue_button: {
    marginTop: 10,
    padding: 5,
    backgroundColor: "#8ADE75",
    borderRadius: 16,
    justifyContent: "center",
    width: "70%",
    alignSelf: "center",
  },
});

export default styles;
