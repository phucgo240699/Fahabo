import React, {useState} from 'react';
import fonts from '@themes/fonts';
import colors from '@themes/colors';
import styled from 'styled-components/native';
import {Box, Button, Input} from 'native-base';
import FocusAwareStatusBar from '@components/FocusAwareStatusBar';
import i18n from '@locales/index';
import ProfileHeader from '@components/ProfileHeader';
import {isNull} from '@utils/index';
import {useDispatch, useSelector} from 'react-redux';
import {userSelector} from '@store/selectors/authentication';
import {updateProfileRequestAction} from '@store/actionTypes/profile';
import {UpdateProfileRequestType} from '@constants/types/profile';

interface Props {}

const UpdateProfileScreen: React.FC<Props> = ({}) => {
  const dispatch = useDispatch();
  const user = useSelector(userSelector);
  const [email, setEmail] = useState(user?.email);
  const [phoneNumber, setPhoneNumber] = useState(user?.phoneNumber);
  const [name, setName] = useState(user?.name);
  const [birthday, setBirthday] = useState(user?.birthday);

  const onChangeEmail = (text: string) => {
    setEmail(text);
  };
  const onChangePhoneNumber = (text: string) => {
    setPhoneNumber(text);
  };
  const onChangeName = (text: string) => {
    setName(text);
  };
  const onPressBirthday = () => {
    // Open Date Picker
  };

  const onPressUpdate = () => {
    const params: UpdateProfileRequestType = {};
    if (!isNull(email)) {
      params.email = email;
    }
    if (!isNull(phoneNumber)) {
      params.phoneNumber = phoneNumber;
    }
    if (!isNull(name)) {
      params.name = name;
    }
    if (!isNull(birthday)) {
      params.birthday = birthday;
    }
    dispatch(updateProfileRequestAction({...params}));
  };

  return (
    <Box flex={1} safeArea bgColor={colors.WHITE}>
      <FocusAwareStatusBar
        translucent
        barStyle="dark-content"
        backgroundColor={colors.WHITE}
      />
      <ProfileHeader title={i18n.t('profile.profile')} />
      <ScrollView
        bounces={false}
        scrollEventThrottle={16}
        showsVerticalScrollIndicator={false}>
        <Label>{`${i18n.t('profile.email')}:`}</Label>
        <Input
          mt={1}
          value={email}
          color={colors.TEXT}
          borderColor={colors.SILVER}
          onChangeText={onChangeEmail}
        />
        <Label>{`${i18n.t('profile.phoneNumber')}:`}</Label>
        <Input
          mt={1}
          value={phoneNumber}
          color={colors.TEXT}
          borderColor={colors.SILVER}
          onChangeText={onChangePhoneNumber}
        />
        <Label>{`${i18n.t('profile.name')}:`}</Label>
        <Input
          mt={1}
          value={name}
          color={colors.TEXT}
          borderColor={colors.SILVER}
          onChangeText={onChangeName}
        />
        <Label>{`${i18n.t('profile.birthday')}:`}</Label>
        <Button
          mt={1}
          variant="outline"
          borderColor={colors.SILVER}
          _text={{color: colors.GRAY}}
          onPress={onPressBirthday}>
          {isNull(birthday) ? 'dd-mm-yyy' : birthday}
        </Button>
        <Button
          mt={10}
          size="lg"
          borderRadius={28}
          _text={{color: colors.WHITE}}
          onPress={onPressUpdate}>
          {i18n.t('profile.confirm')}
        </Button>
      </ScrollView>
    </Box>
  );
};

const Label = styled(fonts.PrimaryFontBoldSize14)`
  margin-top: 20px;
`;

const ScrollView = styled.ScrollView`
  padding-left: 30px;
  padding-right: 30px;
`;

export default UpdateProfileScreen;
