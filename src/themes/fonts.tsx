import styled from 'styled-components/native';
import colors from './colors';

export const RobotoLight = 'Roboto-Light';
export const RobotoLightItalic = 'Roboto-LightItalic';
export const RobotoRegular = 'Roboto-Regular';
export const RobotoItalic = 'Roboto-Italic';
export const RobotoMedium = 'Roboto-Medium';
export const RobotoMediumItalic = 'Roboto-MediumItalic';
export const RobotoBold = 'Roboto-Bold';
export const RobotoBoldItalic = 'Roboto-BoldItalic';
export const PrimaryFontBold = 'Roboto-Bold';

function withDefault<T extends {defaultProps?: Partial<TDefaults>}, TDefaults>(
  o: T,
  defaultProps: TDefaults,
): T & {defaultProps: TDefaults} {
  o.defaultProps = defaultProps;
  return o as any;
}

const BasePrimaryFontLight = withDefault(
  styled.Text`
    color: ${colors.TEXT};
    font-family: ${RobotoLight};
    font-weight: 300;
  `,
  {
    allowFontScaling: false,
  },
);

const BasePrimaryFontRegular = withDefault(
  styled.Text`
    color: ${colors.TEXT};
    font-family: ${RobotoRegular};
    font-weight: 400;
  `,
  {
    allowFontScaling: false,
  },
);

const BasePrimaryFontMedium = withDefault(
  styled.Text`
    color: ${colors.TEXT};
    font-family: ${RobotoMedium};
    font-weight: 500;
  `,
  {
    allowFontScaling: false,
  },
);

const BasePrimaryFontBold = withDefault(
  styled.Text`
    color: ${colors.TEXT};
    font-family: ${RobotoBold};
    font-weight: 700;
  `,
  {
    allowFontScaling: false,
  },
);

const PrimaryFontLightSize8 = styled(BasePrimaryFontLight)`
  font-size: 8px;
`;

const PrimaryFontLightSize10 = styled(BasePrimaryFontLight)`
  font-size: 10px;
`;

const PrimaryFontLightSize12 = styled(BasePrimaryFontLight)`
  font-size: 12px;
`;

const PrimaryFontLightSize14 = styled(BasePrimaryFontLight)`
  font-size: 14px;
`;

const PrimaryFontLightSize16 = styled(BasePrimaryFontLight)`
  font-size: 16px;
`;

const PrimaryFontLightSize18 = styled(BasePrimaryFontLight)`
  font-size: 18px;
`;

const PrimaryFontLightSize20 = styled(BasePrimaryFontLight)`
  font-size: 20px;
`;

const PrimaryFontLightSize25 = styled(BasePrimaryFontLight)`
  font-size: 25px;
`;

const primaryFontLight = {
  PrimaryFontLightSize8,
  PrimaryFontLightSize10,
  PrimaryFontLightSize12,
  PrimaryFontLightSize14,
  PrimaryFontLightSize16,
  PrimaryFontLightSize18,
  PrimaryFontLightSize20,
  PrimaryFontLightSize25,
};

const PrimaryFontRegularSize8 = styled(BasePrimaryFontRegular)`
  font-size: 8px;
`;

const PrimaryFontRegularSize10 = styled(BasePrimaryFontRegular)`
  font-size: 10px;
`;

const PrimaryFontRegularSize12 = styled(BasePrimaryFontRegular)`
  font-size: 12px;
`;

const PrimaryFontRegularSize14 = styled(BasePrimaryFontRegular)`
  font-size: 14px;
`;

const PrimaryFontRegularSize16 = styled(BasePrimaryFontRegular)`
  font-size: 16px;
`;

const PrimaryFontRegularSize18 = styled(BasePrimaryFontRegular)`
  font-size: 18px;
`;

const PrimaryFontRegularSize20 = styled(BasePrimaryFontRegular)`
  font-size: 20px;
`;

const PrimaryFontRegularSize25 = styled(BasePrimaryFontRegular)`
  font-size: 25px;
`;

const primaryFontRegular = {
  PrimaryFontRegularSize8,
  PrimaryFontRegularSize10,
  PrimaryFontRegularSize12,
  PrimaryFontRegularSize14,
  PrimaryFontRegularSize16,
  PrimaryFontRegularSize18,
  PrimaryFontRegularSize20,
  PrimaryFontRegularSize25,
};

const PrimaryFontMediumSize8 = styled(BasePrimaryFontMedium)`
  font-size: 8px;
`;

const PrimaryFontMediumSize10 = styled(BasePrimaryFontMedium)`
  font-size: 10px;
`;

const PrimaryFontMediumSize12 = styled(BasePrimaryFontMedium)`
  font-size: 12px;
`;

const PrimaryFontMediumSize14 = styled(BasePrimaryFontMedium)`
  font-size: 14px;
`;

const PrimaryFontMediumSize16 = styled(BasePrimaryFontMedium)`
  font-size: 16px;
`;

const PrimaryFontMediumSize18 = styled(BasePrimaryFontMedium)`
  font-size: 18px;
`;

const PrimaryFontMediumSize20 = styled(BasePrimaryFontMedium)`
  font-size: 20px;
`;

const PrimaryFontMediumSize25 = styled(BasePrimaryFontMedium)`
  font-size: 25px;
`;

const primaryFontMedium = {
  PrimaryFontMediumSize8,
  PrimaryFontMediumSize10,
  PrimaryFontMediumSize12,
  PrimaryFontMediumSize14,
  PrimaryFontMediumSize16,
  PrimaryFontMediumSize18,
  PrimaryFontMediumSize20,
  PrimaryFontMediumSize25,
};

const PrimaryFontBoldSize8 = styled(BasePrimaryFontBold)`
  font-size: 8px;
`;

const PrimaryFontBoldSize10 = styled(BasePrimaryFontBold)`
  font-size: 10px;
`;

const PrimaryFontBoldSize12 = styled(BasePrimaryFontBold)`
  font-size: 12px;
`;

const PrimaryFontBoldSize14 = styled(BasePrimaryFontBold)`
  font-size: 14px;
`;

const PrimaryFontBoldSize16 = styled(BasePrimaryFontBold)`
  font-size: 16px;
`;

const PrimaryFontBoldSize18 = styled(BasePrimaryFontBold)`
  font-size: 18px;
`;

const PrimaryFontBoldSize20 = styled(BasePrimaryFontBold)`
  font-size: 20px;
`;

const PrimaryFontBoldSize25 = styled(BasePrimaryFontBold)`
  font-size: 25px;
`;

const primaryFontBold = {
  PrimaryFontBoldSize8,
  PrimaryFontBoldSize10,
  PrimaryFontBoldSize12,
  PrimaryFontBoldSize14,
  PrimaryFontBoldSize16,
  PrimaryFontBoldSize18,
  PrimaryFontBoldSize20,
  PrimaryFontBoldSize25,
};

export default {
  ...primaryFontLight,
  ...primaryFontRegular,
  ...primaryFontMedium,
  ...primaryFontBold,
};
