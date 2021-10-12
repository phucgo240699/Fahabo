import React, {memo} from 'react';
import colors from '@themes/colors';
import styled from 'styled-components/native';
import i18n from '@locales/index';
import fonts from '@themes/fonts';
import PrimaryButton from '@components/PrimaryButton';
import {Box, FlatList, Image} from 'native-base';
import {Constants} from '@constants/Constants';
import VerticalFamilyItem from '../VerticalFamilyItem';
import {StyleSheet} from 'react-native';

interface Props {
  data: any[];
  onPressItem?: (index: number) => void;
  onPressViewAll?: () => void;
}

const PreviewFamilyBox: React.FC<Props> = ({
  data,
  onPressItem,
  onPressViewAll,
}) => {
  const renderItem = ({item}: {item: any}) => {
    return <VerticalFamilyItem item={item} onPress={onPressItem} />;
  };
  return (
    <Container>
      <Header>
        <Label>{i18n.t('family.family')}</Label>
        <PrimaryButton
          title={i18n.t('family.viewAll')}
          onPress={onPressViewAll}
        />
      </Header>
      <FlatList
        mt={-2}
        data={data}
        horizontal={true}
        renderItem={renderItem}
        contentContainerStyle={styles.list}
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item, index) => index.toString()}
      />
    </Container>
  );
};

const Container = styled.View`
  width: 100%;
  margin-top: 30px;
`;

const Header = styled.View`
  margin-left: 30px;
  margin-right: 30px;
  flex-direction: row;
  justify-content: space-between;
`;

const Label = styled(fonts.PrimaryFontMediumSize16)`
  color: ${colors.BLACK};
`;

const styles = StyleSheet.create({
  list: {
    paddingLeft: 30,
    paddingRight: 10,
    paddingTop: 15,
    paddingBottom: 15,
  },
});

export default memo(PreviewFamilyBox);
