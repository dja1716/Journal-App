import React from "react";
import styled from "styled-components/native";
import colors from "../colors";
import { SafeAreaView } from "react-native-safe-area-context";

const Home = ({ navigation: { navigate } }) => (
  <SafeAreaView style={{ flex: 1, backgroundColor: colors.bgColor }}>
    <View>
      <Title>My journal</Title>
      <Btn onPress={() => navigate("Write")}>
        <BtnText>Write</BtnText>
      </Btn>
    </View>
  </SafeAreaView>
);

export default Home;

const View = styled.View`
  /* padding-top: 100px; */
  padding: 0px 50px;
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
`;
const BtnText = styled.Text``;
