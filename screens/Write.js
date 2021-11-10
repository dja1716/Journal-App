import React, { useState } from "react";
import styled from "styled-components/native";
import colors from "../colors";
import { Alert } from "react-native";

const emotions = ["🤯", "🥲", "🤬", "🤗", "🥰", "😊", "🤩"];

const Write = () => {
  const [selectedEmotion, setEmotion] = useState(null);
  const [feelings, setFeelings] = useState("");

  const onChangeText = (text) => setFeelings(text);
  const onEmotionPress = (face) => setEmotion(face);
  const onSubmit = () => {
    if (feelings === "" || selectedEmotion == null) {
      Alert.alert("Please complete form.");
    }
  };

  return (
    <View>
      <Title>How do you feel today?</Title>
      <Emotions>
        {emotions.map((emotion, index) => (
          <Emotion
            selected={emotion === selectedEmotion}
            key={index}
            onPress={() => onEmotionPress(emotion)}
          >
            <EmotionText>{emotion}</EmotionText>
          </Emotion>
        ))}
      </Emotions>

      <TextInput
        returnKeyLabel="done"
        returnKeyType="done"
        onSubmitEditing={onSubmit}
        placeholder="Write your feelings..."
        placeholderTextColor="grey"
        value={feelings}
        onChangeText={onChangeText}
      />
      <Btn>
        <BtnText onPress={onSubmit}>Save</BtnText>
      </Btn>
    </View>
  );
};

export default Write;
const View = styled.View`
  background-color: ${colors.bgColor};
  flex: 1;
  padding: 0px 30px;
`;
const Title = styled.Text`
  color: ${colors.textColor};
  margin: 50px 0;
  text-align: center;
  font-size: 28px;
  font-weight: 500;
`;

const TextInput = styled.TextInput`
  background-color: white;
  border-radius: 20px;
  padding: 10px 20px;
  font-size: 18px;
`;

const Btn = styled.TouchableOpacity`
  width: 100%;
  background-color: ${colors.btnColor};
  margin-top: 30px;
  padding: 10px 20px;
  align-items: center;
  border-radius: 20px;
`;

const BtnText = styled.Text`
  color: white;
  font-size: 18px;
  font-weight: 500;
`;

const Emotion = styled.TouchableOpacity`
  background-color: white;
  elevation: 5;
  box-shadow: 1px 1px 5px rgba(0, 0, 0, 0.3);
  padding: 10px 10px;
  border-width: ${(props) => (props.selected ? "2px" : "0px")};
  border-color: rgba(0, 0, 0, 0.5);
  border-radius: 10px;
`;

const Emotions = styled.View`
  flex-direction: row;
  margin-bottom: 20px;
  justify-content: space-between;
`;

const EmotionText = styled.Text`
  font-size: 12px;
`;
