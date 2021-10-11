import i18n from '@locales/index';
import fonts from '@themes/fonts';
import colors from '@themes/colors';
import React, {useState} from 'react';
import styled from 'styled-components/native';
import PrimaryButton from '@components/PrimaryButton';
import PrimarySearchBar from '@components/PrimarySearchBar';
import {searchIcon, bellIcon} from '@constants/sources/index';

interface Props {
  title?: string;
  onChangeText?: (text: string) => void;
}

const PrimaryHeader: React.FC<Props> = ({
  title = i18n.t('application.fahabo'),
  onChangeText,
}) => {
  const [isSearching, setIsSearching] = useState(false);

  const turnOnSearching = () => {
    setIsSearching(true);
  };
  const turnOffSearching = () => {
    setIsSearching(false);
  };

  return (
    <Container searchingMode={isSearching}>
      {!isSearching && <Title numberOfLines={1}>{title}</Title>}
      {!isSearching && (
        <PrimaryButton
          leftSource={searchIcon}
          leftTintColor={colors.THEME_COLOR_7}
          onPress={turnOnSearching}
        />
      )}
      {!isSearching && (
        <PrimaryButton
          marginLeft={10}
          leftSource={bellIcon}
          leftTintColor={colors.THEME_COLOR_7}
        />
      )}

      {isSearching && <SearchBar onChangeText={onChangeText} />}
      {isSearching && (
        <CancelButton
          titleColor={colors.RED_1}
          title={i18n.t('header.cancel')}
          onPress={turnOffSearching}
        />
      )}
    </Container>
  );
};

const Container = styled.View<{searchingMode: boolean}>`
  height: 40px;
  padding-left: 10px;
  padding-right: 10px;
  flex-direction: row;
  align-items: center;
  justify-content: ${props =>
    props.searchingMode ? 'space-around' : 'flex-end'};
`;

const Title = styled(fonts.PrimaryFontBoldSize25)`
  flex: 1;
  color: ${colors.THEME_COLOR_7};
`;

const SearchBar = styled(PrimarySearchBar)`
  flex: 1;
`;

const CancelButton = styled(PrimaryButton)`
  height: 100%;
  padding-left: 16px;
`;

export default React.memo(PrimaryHeader);
