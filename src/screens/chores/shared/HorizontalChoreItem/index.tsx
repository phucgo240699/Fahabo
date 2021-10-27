import React from 'react';
import styled from 'styled-components/native';
import colors from '@themes/colors';
import fonts from '@themes/fonts';
import {Avatar, FlatList, Menu, Pressable} from 'native-base';
import {Platform} from 'react-native';
import {DummyDetailFamily} from '@constants/DummyData';
import PrimaryButton from '@components/PrimaryButton';
import {ChoreStatus, ChoreType} from '@constants/types/chores';
import i18n from '@locales/index';
import {getChoreStatusColor, getChoreStatusText} from '@utils/chores';
import {Constants} from '@constants/Constants';
import {useDispatch} from 'react-redux';
import {updateChoreRequestAction} from '@store/actionTypes/chores';

interface Props {
  item: ChoreType;
  onPress?: (item: any) => void;
}

const HorizontalChoreItem: React.FC<Props> = ({item, onPress}) => {
  const dispatch = useDispatch();
  const [shouldOverlapWithTrigger] = React.useState(false);
  const [position, setPosition] = React.useState('bottom right');

  const onPressTouch = () => {
    if (onPress) {
      onPress(item);
    }
  };
  const onUpdateDoneStatus = () => {
    if (item.status === ChoreStatus.IN_PROGRESS) {
      dispatch(
        updateChoreRequestAction({choreId: item.id, status: ChoreStatus.DONE}),
      );
    }
  };
  const renderItem = ({item}: {item: any}) => {
    return (
      <Avatar mr={2} size="sm" source={{uri: item.avatar}}>
        {/* <Avatar.Badge bg="green.500" /> */}
      </Avatar>
    );
  };

  return (
    <Touch
      onPress={onPressTouch}
      activeOpacity={Platform.OS === 'ios' ? 0.6 : 1.0}>
      <Container>
        <Title numberOfLines={2}>{item.title}</Title>
        <Deadline numberOfLines={1}>{item.deadline}</Deadline>
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
        <Menu
          p={1}
          width={200}
          borderRadius={14}
          bgColor={colors.WHITE}
          borderColor={colors.WHITE}
          shouldOverlapWithTrigger={shouldOverlapWithTrigger} // @ts-ignore
          placement={position == 'auto' ? undefined : position}
          trigger={triggerProps => {
            return (
              <Pressable
                top={2}
                right={2}
                width={24}
                height={8}
                borderRadius={16}
                position={'absolute'}
                alignItems={'center'}
                justifyContent={'center'}
                bgColor={getChoreStatusColor(item.status)}
                {...triggerProps}>
                <StatusText>{getChoreStatusText(item.status)}</StatusText>
              </Pressable>
            );
          }}>
          {item.status !== ChoreStatus.DONE && (
            <Menu.Item
              borderRadius={10}
              bgColor={colors.WHITE}
              _text={{color: getChoreStatusColor(ChoreStatus.DONE)}}
              onPress={onUpdateDoneStatus}>
              {getChoreStatusText(ChoreStatus.DONE)}
            </Menu.Item>
          )}
        </Menu>
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
  bottom: 46px;
  width: 100%;
  height: 1px;
  opacity: 0.6;
  position: absolute;
  background-color: ${colors.SILVER};
`;

const StatusButton = styled.View<{backgroundColor: string}>`
  top: 8px;
  right: 8px;
  width: 80px;
  position: absolute;
  border-radius: 16px;
  padding-bottom: 6px;
  background-color: ${props => props.backgroundColor};
`;

const StatusText = styled(fonts.PrimaryFontMediumSize12)`
  color: ${colors.WHITE};
`;

export default React.memo(HorizontalChoreItem);
