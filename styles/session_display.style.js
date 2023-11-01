import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  main_container: {
    borderTopColor: "black",
    borderBottomColor: "black",
    borderTopWidth: 2,
    width: 2000,
  },
  view_active_sessions: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center",
  },
  active_sessions_text: {
    fontSize: 20,
    color: "black",
  },
  time_header_text: {
    fontSize: 20,
    color: "black",
  },
  timeAxis: {
    flexDirection: "row",
    borderTopWidth: 2,
    borderTopColor: "black",
    marginTop: 5,
  },
  timeAxisItem: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    borderLeftColor: "black",
    borderLeftWidth: 1,
    borderRightWidth: 1,
    borderRightColor: "black",
    height: 50,
  },
  timeAxisText: {
    fontSize: 12,
  },
  marketLabel: {
    textAlign: "center",
  },
});

export default styles;
