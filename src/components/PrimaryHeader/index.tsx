import i18n from '@locales/index';
import fonts from '@themes/fonts';
import colors from '@themes/colors';
import React, {useRef, useState} from 'react';
import styled from 'styled-components/native';
import PrimaryButton from '@components/PrimaryButton';
import PrimarySearchBar from '@components/PrimarySearchBar';
import {searchIcon, bellIcon, plusIcon} from '@constants/sources/index';
import {Animated, Easing} from 'react-native';
import {Constants} from '@constants/Constants';

const animationTime = 200;
const searchBarWidth = Constants.MAX_WIDTH - 65;

interface Props {
  title?: string;
  onChangeText?: (text: string) => void;
}

const PrimaryHeader: React.FC<Props> = ({
  title = i18n.t('application.fahabo'),
  onChangeText,
}) => {
  const [isSearching, setIsSearching] = useState(false);
  const cancelOpacityAnim = useRef(new Animated.Value(0)).current;
  const searchIconOpacityAnim = useRef(new Animated.Value(1)).current;
  const searchBarWidthAnim = useRef(new Animated.Value(0)).current;

  const turnOnSearching = () => {
    Animated.timing(searchIconOpacityAnim, {
      duration: animationTime / 2,
      toValue: 0,
      easing: Easing.linear,
      useNativeDriver: false,
    }).start(() => {
      setIsSearching(true);
      Animated.parallel([
        Animated.timing(cancelOpacityAnim, {
          duration: animationTime,
          toValue: 1,
          easing: Easing.linear,
          useNativeDriver: false,
        }),
        Animated.timing(searchBarWidthAnim, {
          duration: animationTime,
          toValue: searchBarWidth,
          easing: Easing.linear,
          useNativeDriver: false,
        }),
      ]).start();
    });
  };

  const turnOffSearching = () => {
    Animated.parallel([
      Animated.timing(cancelOpacityAnim, {
        duration: animationTime,
        toValue: 0,
        easing: Easing.linear,
        useNativeDriver: false,
      }),
      Animated.timing(searchBarWidthAnim, {
        duration: animationTime,
        toValue: 24,
        easing: Easing.linear,
        useNativeDriver: false,
      }),
    ]).start(() => {
      setIsSearching(false);
      Animated.timing(searchIconOpacityAnim, {
        duration: animationTime / 2,
        toValue: 1,
        easing: Easing.linear,
        useNativeDriver: false,
      }).start();
    });
  };

  return (
    <Container searchingMode={isSearching}>
      {!isSearching && (
        <TitleLayer style={{opacity: searchIconOpacityAnim}}>
          <Title numberOfLines={1}>{title}</Title>
        </TitleLayer>
      )}
      {!isSearching && (
        <SearchIconLayer style={{opacity: searchIconOpacityAnim}}>
          <PrimaryButton
            marginLeft={10}
            leftSource={bellIcon}
            leftTintColor={colors.THEME_COLOR_7}
          />
        </SearchIconLayer>
      )}
      {!isSearching && (
        <SearchIconLayer style={{opacity: searchIconOpacityAnim}}>
          <PrimaryButton
            marginLeft={10}
            leftSource={searchIcon}
            leftTintColor={colors.THEME_COLOR_7}
            onPress={turnOnSearching}
          />
        </SearchIconLayer>
      )}
      {!isSearching && (
        <SearchIconLayer style={{opacity: searchIconOpacityAnim}}>
          <PrimaryButton
            marginLeft={4}
            leftSource={plusIcon}
            leftTintColor={colors.THEME_COLOR_7}
          />
        </SearchIconLayer>
      )}

      {isSearching && (
        <SearchBarLayer style={{width: searchBarWidthAnim}}>
          <SearchBar onChangeText={onChangeText} />
        </SearchBarLayer>
      )}
      {isSearching && (
        <CancelButtonLayer style={{opacity: cancelOpacityAnim}}>
          <CancelButton
            titleColor={colors.RED_1}
            title={i18n.t('header.cancel')}
            onPress={turnOffSearching}
          />
        </CancelButtonLayer>
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
  justify-content: ${props => (props.searchingMode ? 'flex-end' : 'flex-end')};
`;

const TitleLayer = styled(Animated.View)`
  left: 10px;
  height: 100%;
  position: absolute;
`;
const Title = styled(fonts.PrimaryFontBoldSize25)`
  flex: 1;
  color: ${colors.THEME_COLOR_7};
`;

const SearchBar = styled(PrimarySearchBar)`
  flex: 1;
`;
const SearchIconLayer = styled(Animated.View)`
  height: 100%;
`;
const SearchBarLayer = styled(Animated.View)`
  width: 100%;
  height: 100%;
  margin-right: 10px;
`;

const CancelButton = styled(PrimaryButton)`
  flex: 1;
`;
const CancelButtonLayer = styled(Animated.View)`
  height: 100%;
`;

export default React.memo(PrimaryHeader);
