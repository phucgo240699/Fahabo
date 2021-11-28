import React, {useState} from 'react';
import fonts from '@themes/fonts';
import colors from '@themes/colors';
import styled from 'styled-components/native';
import FocusAwareStatusBar from '@components/FocusAwareStatusBar';
import {Platform} from 'react-native';
import {getStatusBarHeight} from 'react-native-status-bar-height';
import {Button, FormControl, Input} from 'native-base';
import i18n from '@locales/index';
import {squarePlaceHolderImage} from '@constants/sources';
import ProfileHeader from '@components/ProfileHeader';
import {isNull} from '@utils/index';

interface Props {}

const CreateTransactionCategoryScreen: React.FC<Props> = ({}) => {
  const [name, setName] = useState('');
  const [iconBase64, setIconBase64] = useState('');
  const [iconUri, setIconUri] = useState('');

  const onChangeName = (_text: string) => {
    setName(_text);
  };

  const onCreateCategory = () => {};

  return (
    <SafeView>
      <FocusAwareStatusBar
        translucent
        barStyle={'dark-content'}
        backgroundColor={colors.WHITE}
      />
      <ProfileHeader title={i18n.t('transaction.addCategory')} />
      <Container>
        <FormControl mt={6}>
          <Label>{`${i18n.t('transaction.categoryName')}* :`}</Label>
          <Input
            mt={-1}
            height={50}
            value={name}
            borderRadius={20}
            isRequired={true}
            color={colors.TEXT}
            keyboardType={'number-pad'}
            borderColor={colors.SILVER}
            onChangeText={onChangeName}
          />

          <Label>{`${i18n.t('transaction.categoryIcon')}* :`}</Label>
          <IconButton>
            <Icon source={squarePlaceHolderImage} />
          </IconButton>

          <Button
            mt={10}
            mb={6}
            size="lg"
            borderRadius={28}
            onPress={onCreateCategory}
            disabled={isNull(name) || isNull(iconBase64) || isNull(iconUri)}
            _text={{color: colors.WHITE}}
            backgroundColor={colors.GREEN_1}>
            {i18n.t('chores.done')}
          </Button>
        </FormControl>
      </Container>
    </SafeView>
  );
};

const SafeView = styled.SafeAreaView`
  flex: 1;
  background-color: ${colors.WHITE};
  margin-top: ${Platform.OS === 'android' ? getStatusBarHeight() : 0}px;
`;

const Container = styled.View`
  flex: 1;
  margin-left: 30px;
  margin-right: 30px;
`;

const Label = styled(fonts.PrimaryFontMediumSize14)`
  margin-top: 16px;
  margin-bottom: 10px;
  color: ${colors.DANUBE};
`;

const Icon = styled.Image`
  width: 64px;
  height: 64px;
  border-radius: 6px;
`;

const IconButton = styled.TouchableOpacity`
  width: 64px;
  height: 64px;
`;

export default CreateTransactionCategoryScreen;
