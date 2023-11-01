// import React, { useState } from "react";
// import { View, Text, SafeAreaView, Button } from "react-native";
// import { Stack, useRouter } from "expo-router";
// import { SelectList } from "react-native-dropdown-select-list";

// import styles from "../styles/home.style";

// const select_timezone = [
//   { key: "1", value: "Time zone 1" },
//   { key: "2", value: "Time zone 2" },
//   { key: "3", value: "Time zone 3" },
//   { key: "4", value: "Time zone 4" },
// ];

// const select_market = [
//   { key: "1", value: "Stock Market" },
//   { key: "2", value: "Foreign Exchange", disabled: true },
//   { key: "3", value: "Futures Market", disabled: true },
//   { key: "4", value: "Cryptocurrency", disabled: true },
// ];

// const Home = () => {
//   const [selected1, setSelected1] = useState(null);
//   const [selected2, setSelected2] = useState(null);

//   const fields_completed = () => {
//     return selected1 !== null && selected2 !== null;
//   };

//   const router = useRouter();

//   const handleClick = () => {
//     router.push("/pages/SessionDisplay");
//   };

//   return (
//     <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
//       <Stack.Screen options={{ headerShadowVisible: false, headerTitle: "" }} />
//       <View style={styles.main_container}>
//         {/* style this */}
//         <Text style={styles.header_text}>Welcome</Text>
//         <View style={styles.dropdown}>
//           <SelectList
//             boxStyles={styles.dropdown_select}
//             setSelected={(val) => setSelected1(val)}
//             data={select_timezone}
//             save="value"
//             placeholder="Select a time zone"
//             search={false}
//           />
//         </View>
//         <View style={styles.dropdown}>
//           <SelectList
//             style={styles.dropdown}
//             boxStyles={styles.dropdown_select}
//             setSelected={(val) => setSelected2(val)}
//             data={select_market}
//             save="value"
//             placeholder="Select a market"
//             search={false}
//           />
//         </View>
//         <View style={styles.continue_button}>
//           <Button
//             title="Continue"
//             disabled={!fields_completed()}
//             onPress={handleClick}
//           />
//         </View>

//         {/* TEST */}
//         <View style={{ marginTop: 50 }}>
//           <Text>VAL 1: {selected1}</Text>
//           <Text>VAL 2: {selected2}</Text>
//         </View>
//       </View>
//     </SafeAreaView>
//   );
// };

// export default Home;