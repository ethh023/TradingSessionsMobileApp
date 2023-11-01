import React, { useState, useEffect, useCallback } from "react";
import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  Modal,
  Button,
} from "react-native";
import { Stack } from "expo-router";
import { SelectList } from "react-native-dropdown-select-list";
import moment from "moment-timezone";
import styles from "../styles/session_display.style";

const stockMarketData = [
  { exchange: "Sydney Session", openHour: 12, closeHour: 18 },
  { exchange: "Tokyo Session", openHour: 13, closeHour: 19 },
  { exchange: "London Session", openHour: 21, closeHour: 24 },
  { exchange: "London Session Continued", openHour: 0, closeHour: 5.5 },
  { exchange: "New York Session", openHour: 2.5, closeHour: 9 },
];

const SessionDisplay = () => {
  //
  //hooks and state vars
  const [currentTime, setCurrentTime] = useState(new Date());
  const [selectedTimezone, setSelectedTimezone] = useState(
    Intl.DateTimeFormat().resolvedOptions().timeZone
  );
  const [selected1, setSelected1] = useState(null);
  const [isModalVisible, setModalVisible] = useState(false);
  const [isModalTimeVisible, setModalTimeVisible] = useState(false);

  //
  //hook for current time zone -> selected time zone
  //why:
  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentTime(moment.tz(new Date(), selectedTimezone).toDate());
    }, 1000);

    return () => {
      clearInterval(intervalId);
    };
  }, [selectedTimezone]);

  //
  //Time Zone Toggle Modal -> enable / disable modal
  //why: user needs to be able to close the modal if its open, vice versa if its closed, and user wants to open it
  //just call func to set the state var to the opposite val of what it is currently
  const toggleTimeZoneModal = () => {
    setModalTimeVisible(!isModalTimeVisible);
  };

  //
  //Active Sessions Toggle Modal -> enable / disable modal
  //why: user needs to be able to close the modal if its open, vice versa if its closed, and user wants to open it
  //just call func to set the state var to the opposite val of what it is currently
  const toggleActiveSessionsModal = () => {
    setModalVisible(!isModalVisible);
  };

  //
  //Get all time zones from library moment tz
  //why: gets all time zones from moment library so user can choose which time they'd like to select
  const getTimeZones = () => {
    const timeZones = moment.tz.names();
    return timeZones;
  };

  //
  //used to calc the remaining active session time
  //why: so that the remaining time can be displayed easier for users in the ActiveSessions Modal
  const formatTimeRemaining = (endTime) => {
    const timeDiff = Math.max(endTime - currentTime, 0);
    const hours = Math.floor(timeDiff / 3600000);
    const minutes = Math.floor((timeDiff % 3600000) / 60000);
    const seconds = Math.floor((timeDiff % 60000) / 1000);
    return `${hours}h ${minutes}m ${seconds}s`;
  };

  //
  //used to calc if their are any active sessions
  //why: to create a list of open exchanges based on the current time
  const getCurrentOpenExchanges = (currentTime) => {
    return stockMarketData.filter((market) => {
      const openTime = new Date();
      openTime.setHours(market.openHour, 0, 0, 0);
      const closeTime = new Date();
      closeTime.setHours(market.closeHour, 0, 0, 0);
      return currentTime >= openTime && currentTime <= closeTime;
    });
  };

  //
  //default: use current user's local time zone and time -> return that time as 12 hr
  //it gets displayed at the top left of the application
  //user selection: user selects new time zone, get selected time zone and time -> return it as 12 hr
  //why: so that the user can see their own local time, + can select a new time zone and then see that time zone's local time
  // -> this func was also meant to combine with another func that takes the user's current or selected time zone and convert the stock market
  // exchange session times from NZDT -> user's current / selected time zone
  const formatTimeForTimeZone = useCallback(() => {
    if (currentTime && selectedTimezone) {
      const formattedTime = moment(currentTime)
        .tz(selectedTimezone)
        .format("h:mm:ss A");
      return formattedTime;
    }
    return "";
  }, [currentTime, selectedTimezone]);

  //vars declared after funcs
  const currentOpenExchanges = getCurrentOpenExchanges(currentTime);
  const timeZones = getTimeZones();

  //styling + functionality
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
      <Stack.Screen
        options={{
          headerShown: false,
        }}
      />

      <View
        style={{
          margin: 10,
          padding: 10,
          backgroundColor: "lightblue",
          borderRadius: 16,
          maxWidth: "35%",
        }}
      >
        <TouchableOpacity onPress={toggleModalTime}>
          <Text style={{ fontSize: 20 }}>{formatTimeForTimeZone()}</Text>
          <Text>{selectedTimezone}</Text>
        </TouchableOpacity>
        <Modal
          animationType="slide"
          transparent={false}
          visible={isModalTimeVisible}
        >
          <View
            style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
          >
            <View
              style={{
                backgroundColor: "#F5F5F5",
                padding: 20,
                borderRadius: 10,
              }}
            >
              <Button
                title="Close"
                onPress={() => {
                  toggleModalTime();
                }}
              />
              <Text>Change timezone</Text>
              <SelectList
                boxStyles={styles.dropdown_select}
                setSelected={(val) => setSelected1(val)}
                data={timeZones.map((tz) => ({ label: tz, value: tz }))}
                save="value"
                placeholder="Select a time zone"
                search={false}
              />

              <Button
                title="Set Timezone"
                onPress={() => {
                  setSelectedTimezone(selected1);
                  toggleTimeZoneModal();
                }}
              />
            </View>
          </View>
        </Modal>
      </View>

      <ScrollView
        horizontal
        vertical
        showsHorizontalScrollIndicator={true}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.main_container}>
          {stockMarketData.map((market, index) => (
            <View
              key={index}
              style={{
                top: index * 2 + 0,
                left: (market.openHour / 24) * 100 + "%",
                width: ((market.closeHour - market.openHour) / 24) * 100 + "%",
                height: 70,
                backgroundColor: "#D8E5FF",
                opacity: 0.7,
                borderRadius: 10,
              }}
            >
              <Text style={styles.marketLabel}>{market.exchange}</Text>
            </View>
          ))}

          <View style={styles.timeAxis}>
            {Array.from({ length: 24 }, (_, hour) => (
              <View
                style={[
                  styles.timeAxisItem,
                  {
                    borderBottomColor:
                      currentTime.getHours() === hour ? "black" : "transparent",
                  },
                ]}
                key={hour}
              >
                <Text
                  style={[
                    styles.timeAxisText,
                    {
                      fontWeight:
                        currentTime.getHours() === hour ? "bold" : "normal",
                    },
                  ]}
                >
                  {hour.toString().padStart(2, "0") + ":00"}
                </Text>
              </View>
            ))}
          </View>
        </View>
      </ScrollView>

      <View style={styles.view_active_sessions}>
        <TouchableOpacity onPress={toggleModal}>
          <Text
            style={[
              styles.active_sessions_text,
              { textAlign: "center", fontWeight: "bold" },
            ]}
          >
            ^
          </Text>
          <Text style={styles.active_sessions_text}>View Active Sessions</Text>
        </TouchableOpacity>
        <Modal
          animationType="slide"
          transparent={true}
          visible={isModalVisible}
        >
          <View
            style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
          >
            <View
              style={{
                backgroundColor: "#F5F5F5",
                padding: 20,
                borderRadius: 10,
              }}
            >
              <Text>Active Sessions</Text>
              {currentOpenExchanges.length === 0 ? (
                <Text>No Open Exchanges</Text>
              ) : (
                currentOpenExchanges.map((exchange) => (
                  <View key={exchange.exchange}>
                    <Text>
                      {exchange.exchange} Closes in:{" "}
                      {formatTimeRemaining(
                        new Date(
                          currentTime.getTime() +
                            (exchange.closeHour - currentTime.getHours()) *
                              3600000
                        )
                      )}
                    </Text>
                  </View>
                ))
              )}
              <Button title="Close" onPress={toggleActiveSessionsModal} />
            </View>
          </View>
        </Modal>
      </View>
    </SafeAreaView>
  );
};

export default SessionDisplay;
