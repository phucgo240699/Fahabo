import React, {useState} from 'react';
import fonts from '@themes/fonts';
import colors from '@themes/colors';
import {useDispatch} from 'react-redux';
import styled from 'styled-components/native';
import {Avatar, FlatList} from 'native-base';
import {EventType} from '@constants/types/events';
import {Constants} from '@constants/Constants';
import {Animated, Easing} from 'react-native';

const cellWidth = (Constants.MAX_WIDTH - 50) / 2;
const animTime = 200;

interface Props {
  item: EventType;
  onPress?: (item: EventType) => void;
}

const VerticalEventItem: React.FC<Props> = ({item, onPress}) => {
  const [isDone, setIsDone] = useState(false);
  const doneOpacityAnim = new Animated.Value(0);

  const dispatch = useDispatch();

  const renderItem = ({item}: {item: any}) => {
    return <Avatar mr={2} size="sm" source={{uri: item.avatar}} />;
  };
  const onPressTouch = () => {
    if (onPress) {
      onPress(item);
    }
  };
  const onPressDone = () => {
    Animated.timing(doneOpacityAnim, {
      duration: animTime,
      toValue: 1,
      easing: Easing.linear,
      useNativeDriver: false,
    }).start(() => {
      setTimeout(() => {
        Animated.timing(doneOpacityAnim, {
          duration: animTime,
          toValue: 0,
          easing: Easing.linear,
          useNativeDriver: false,
        }).start();
      }, 1500);
    });
  };

  return (
    <Touch onPress={onPressTouch} activeOpacity={1.0}>
      <Container>
        <Title numberOfLines={4}>{item.title}</Title>
        <Deadline numberOfLines={1}>{`${item.from?.split(' ')[0]}-${
          item.to?.split(' ')[0]
        }`}</Deadline>
        <HLine />
        <FlatList
          left={3}
          bottom={2}
          horizontal
          position="absolute"
          scrollEnabled={false}
          renderItem={renderItem}
          data={(item.assignees ?? []).filter((item, index) => {
            return index < 5;
          })}
          showsHorizontalScrollIndicator={false}
          keyExtractor={(item, index) => index.toString()}
        />
        <Circle onPress={onPressDone}>
          <Point style={{opacity: doneOpacityAnim}} />
        </Circle>
      </Container>
    </Touch>
  );
};

const Touch = styled.TouchableOpacity`
  height: 180px;
  margin-top: 15px;
  margin-left: 10px;
  border-radius: 10px;
  width: ${cellWidth}px;
`;

const Container = styled.View`
  flex: 1;
  padding: 10px;
  elevation: 10;
  border-radius: 10px;
  shadow-opacity: 0.15;
  shadow-radius: 10px;
  shadow-color: ${colors.BLACK};
  background-color: ${colors.WHITE};
`;

const Circle = styled.TouchableOpacity`
  top: 6px;
  right: 6px;
  width: 24px;
  height: 24px;
  border-width: 1px;
  position: absolute;
  border-radius: 15px;
  align-items: center;
  justify-content: center;
  border-color: ${colors.SILVER};
`;

const Point = styled(Animated.View)`
  width: 16px;
  height: 16px;
  border-radius: 10px;
  background-color: ${colors.DANUBE};
`;

const Title = styled(fonts.PrimaryFontBoldSize16)`
  width: ${cellWidth - 50}px;
  margin-right: 86px;
`;

const Deadline = styled(fonts.PrimaryFontRegularSize12)`
  margin-top: 6px;
  color: ${colors.DARK_GRAY};
`;

const HLine = styled.View`
  left: 10px;
  bottom: 48px;
  width: 100%;
  height: 1px;
  opacity: 0.6;
  position: absolute;
  background-color: ${colors.SILVER};
`;

export default VerticalEventItem;
