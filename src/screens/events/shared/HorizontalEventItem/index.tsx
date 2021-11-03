import React from 'react';
import fonts from '@themes/fonts';
import colors from '@themes/colors';
import {useDispatch} from 'react-redux';
import styled from 'styled-components/native';
import {Avatar, FlatList} from 'native-base';
import {EventType} from '@constants/types/events';

interface Props {
  item: EventType;
  onPress?: (item: EventType) => void;
}

const HorizontalEventItem: React.FC<Props> = ({item, onPress}) => {
  const dispatch = useDispatch();

  const onPressTouch = () => {
    if (onPress) {
      onPress(item);
    }
  };
  const renderItem = ({item}: {item: any}) => {
    return <Avatar mr={2} size="sm" source={{uri: item.avatar}} />;
  };

  return (
    <Touch onPress={onPressTouch} activeOpacity={1.0}>
      <Container>
        <Title numberOfLines={2}>{item.title}</Title>
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
      </Container>
    </Touch>
  );
};

const Touch = styled.TouchableOpacity`
  height: 150px;
  border-radius: 10px;
`;

const Container = styled.View`
  flex: 1;
  padding: 10px;
  elevation: 10;
  margin-top: 15px;
  margin-left: 30px;
  margin-right: 30px;
  border-radius: 10px;
  shadow-opacity: 0.2;
  shadow-radius: 10px;
  shadow-color: ${colors.BLACK};
  background-color: ${colors.WHITE};
`;

const Title = styled(fonts.PrimaryFontBoldSize16)`
  margin-right: 86px;
`;

const Deadline = styled(fonts.PrimaryFontRegularSize12)`
  margin-top: 4px;
  color: ${colors.GRAY};
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

export default HorizontalEventItem;
