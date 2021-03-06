import React from 'react';
import fonts from '@themes/fonts';
import colors from '@themes/colors';
import {useDispatch, useSelector} from 'react-redux';
import styled from 'styled-components/native';
import {Avatar, FlatList, Menu, Pressable} from 'native-base';
import {ChoreStatus, ChoreType} from '@constants/types/chores';
import {updateChoreRequestAction} from '@store/actionTypes/chores';
import {getChoreStatusColor, getChoreStatusText} from '@utils/chores';
import {accessTokenSelector} from '@store/selectors/authentication';

interface Props {
  item: ChoreType;
  onPress?: (item: any) => void;
}

const HorizontalChoreItem: React.FC<Props> = ({item, onPress}) => {
  const dispatch = useDispatch();
  const accessToken = useSelector(accessTokenSelector);

  const [shouldOverlapWithTrigger] = React.useState(true);
  const [position, setPosition] = React.useState('bottom right');

  const onPressTouch = () => {
    if (onPress) {
      onPress(item);
    }
  };
  const onUpdateDoneStatus = () => {
    dispatch(
      updateChoreRequestAction({choreId: item.id, status: ChoreStatus.DONE}),
    );
  };
  const renderItem = ({item}: {item: any}) => {
    return (
      <Avatar
        mr={2}
        size="sm"
        source={{
          uri: item.avatar,
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }}>
        {/* <Avatar.Badge bg="green.500" /> */}
      </Avatar>
    );
  };

  return (
    <Container onPress={onPressTouch} activeOpacity={1.0}>
      <Title numberOfLines={2}>{item.title}</Title>
      <Deadline numberOfLines={1}>{item.deadline?.split(' ')[0]}</Deadline>
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

      {item.status !== ChoreStatus.DONE ? (
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
          <Menu.Item
            borderRadius={10}
            bgColor={colors.WHITE}
            _text={{color: getChoreStatusColor(ChoreStatus.DONE)}}
            onPress={onUpdateDoneStatus}>
            {getChoreStatusText(ChoreStatus.DONE)}
          </Menu.Item>
        </Menu>
      ) : (
        <Pressable
          top={2}
          right={2}
          width={24}
          height={8}
          borderRadius={16}
          position={'absolute'}
          alignItems={'center'}
          justifyContent={'center'}
          bgColor={getChoreStatusColor(item.status)}>
          <StatusText>{getChoreStatusText(item.status)}</StatusText>
        </Pressable>
      )}
    </Container>
  );
};

const Container = styled.TouchableOpacity`
  padding: 10px;
  elevation: 10;
  height: 150px;
  margin-top: 10px;
  margin-left: 30px;
  margin-right: 30px;
  margin-bottom: 10px;
  border-radius: 10px;
  shadow-opacity: 0.2;
  shadow-radius: 10px;
  shadow-color: ${colors.BLACK};
  background-color: ${colors.WHITE};
`;

const Title = styled(fonts.PrimaryFontBoldSize18)`
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

const StatusText = styled(fonts.PrimaryFontMediumSize12)`
  color: ${colors.WHITE};
`;

export default HorizontalChoreItem;
