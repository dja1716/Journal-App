import React, { useEffect, useState } from "react";
import styled from "styled-components/native";
import colors from "../colors";
import { Ionicons } from "@expo/vector-icons";
import { useDB } from "../context";
import {
  FlatList,
  TouchableOpacity,
  LayoutAnimation,
  UIManager,
} from "react-native";

if (Platform.OS === "android") {
  if (UIManager.setLayoutAnimationEnabledExperimental) {
    UIManager.setLayoutAnimationEnabledExperimental(true);
  }
}

const Home = ({ navigation: { navigate } }) => {
  const realm = useDB();
  const [feelings, setFeelings] = useState();
  useEffect(() => {
    const feelings = realm.objects("Feeling");

    feelings.addListener((feelings, changes) => {
      LayoutAnimation.configureNext(LayoutAnimation.Presets.spring);
      //   LayoutAnimation.linear();
      setFeelings(feelings.sorted("_id", true));
    });
    return () => {
      feelings.removeAllListeners();
    };
  }, []);
  const onPress = (id) => {
    realm.write(() => {
      const feeling = realm.objectForPrimaryKey("Feeling", id);
      console.log(feeling);
      realm.delete(feeling);
    });
  };
  // const happy = feelings.filtered("emotion = '🤬'");
  // console.log(happy);
  return (
    <View>
      <Title>My journal</Title>
      <FlatList
        data={feelings}
        ItemSeparatorComponent={Separator}
        contentContainerStyle={{ paddingVertical: 10 }}
        keyExtractor={(feeling) => feeling._id + ""}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => onPress(item._id)}>
            <Record>
              <Emotion>{item.emotion}</Emotion>
              <Message>{item.message}</Message>
            </Record>
          </TouchableOpacity>
        )}
      />
      <Btn onPress={() => navigate("Write")}>
        <Ionicons name="add" color="white" size={40} />
      </Btn>
    </View>
  );
};

export default Home;

const View = styled.View`
  padding-top: 100px;
  padding: 0px 30px;
  flex: 1;
  background-color: ${colors.bgColor};
`;
const Title = styled.Text`
  color: ${colors.textColor};
  font-size: 38px;
  margin-bottom: 100px;
`;
const Btn = styled.TouchableOpacity`
  position: absolute;
  bottom: 50px;
  right: 50px;
  background-color: ${colors.btnColor};
  height: 80px;
  width: 80px;
  border-radius: 40px;
  justify-content: center;
  align-items: center;
  elevation: 5;
  box-shadow: 1px 1px 5px rgba(0, 0, 0, 0.3);
`;
const BtnText = styled.Text`
  color: white;
`;

const Record = styled.View`
  background-color: ${colors.cardColor};
  flex-direction: row;
  padding: 10px 20px;
  border-radius: 10px;
  align-items: center;
`;

const Emotion = styled.Text`
  font-size: 24px;
  margin-right: 10px;
`;

const Message = styled.Text`
  font-size: 18px;
  font-weight: 400;
`;

const Separator = styled.View`
  height: 10px;
`;
