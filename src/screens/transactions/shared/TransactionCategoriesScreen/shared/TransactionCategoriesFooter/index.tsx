import PrimaryButton from '@components/PrimaryButton';
import PrimaryIcon from '@components/PrimaryIcon';
import {plusIcon} from '@constants/sources';
import i18n from '@locales/index';
import colors from '@themes/colors';
import fonts from '@themes/fonts';
import React from 'react';
import styled from 'styled-components/native';

interface Props {
  onPress?: () => void;
}

const TransactionCategoriesFooter: React.FC<Props> = ({onPress}) => {
  return (
    <Container onPress={onPress}>
      <PlusIconContainer>
        <PrimaryIcon
          source={plusIcon}
          width={12}
          height={12}
          tintColor={colors.WHITE}
        />
      </PlusIconContainer>
      <Title>{i18n.t('transaction.addCategory')}</Title>
    </Container>
  );
};

const Container = styled.TouchableOpacity`
  height: 50px;
  flex-direction: row;
  align-items: center;
  background-color: ${colors.CONCRETE};
`;

const PlusIconContainer = styled.View`
  width: 24px;
  height: 24px;
  margin-left: 30px;
  border-radius: 12px;
  align-items: center;
  justify-content: center;
  background-color: ${colors.GREEN_1};
`;

const Title = styled(fonts.PrimaryFontMediumSize14)`
  margin-left: 18px;
  color: ${colors.GREEN_1};
`;

export default TransactionCategoriesFooter;
