import colors from '@themes/colors';
import React, {useState} from 'react';
import styled from 'styled-components/native';
import PrimaryButton from '@components/PrimaryButton';
import PrimarySearchBar from '@components/PrimarySearchBar';
import {searchIcon, bellIcon} from '@constants/sources/index';
import i18n from '@locales/index';
import fonts from '@themes/fonts';
import {Animated} from 'react-native';
import {getStatusBarHeight} from 'react-native-status-bar-height';

export const headerHeight = 40;
export const minHeaderHeight = 0;

interface Props {
  title?: string;
  scrollY?: any;
  onChangeText?: (text: string) => void;
}

const PrimaryHeader: React.FC<Props> = ({
  title = i18n.t('application.fahabo'),
  scrollY = new Animated.Value(0),
  onChangeText,
}) => {
  const [isSearching, setIsSearching] = useState(false);

  const heightInterpolate = scrollY.interpolate({
    inputRange: [0, headerHeight - minHeaderHeight],
    outputRange: [headerHeight, minHeaderHeight],
    extrapolate: 'clamp',
  });
  const opacityInterpolate = scrollY.interpolate({
    inputRange: [
      0,
      (headerHeight - minHeaderHeight) / 2,
      headerHeight - minHeaderHeight,
    ],
    outputRange: [1, 0, 0],
    extrapolate: 'clamp',
  });

  const turnOnSearching = () => {
    setIsSearching(true);
  };
  const turnOffSearching = () => {
    setIsSearching(false);
  };

  return (
    <Container
      style={{height: heightInterpolate, opacity: opacityInterpolate}}
      searchingMode={isSearching}>
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

const Container = styled(Animated.View)<{searchingMode: boolean}>`
  top: ${getStatusBarHeight()}px;
  width: 100%;
  position: absolute;
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
