/* eslint-disable react-native/no-inline-styles */
import {View, Text, StyleSheet, ViewStyle} from 'react-native';
import React from 'react';
import {ReportChartModelType} from '../../../types/issuesType';
import Colors from '../../../common/Colors';
import Theme from '../../../common/Theme';
import Animated, {FadeIn} from 'react-native-reanimated';

type Props = {
  data: ReportChartModelType[];
};
const FaultyMachineChart = (props: Props) => {
  const {data} = props;

  const chartValues = data.map(item => item.CHART_VALUE);

  const MAX_VALUE = Math.max(...chartValues);

  return (
    <Animated.View
      className="flex-row justify-between mt-5"
      entering={FadeIn.duration(1000)}>
      {data.map((item, index) => {
        const value = 75 - (item.CHART_VALUE / MAX_VALUE) * 75;
        const maxValue = item.CHART_VALUE === MAX_VALUE;
        const countZero = item.CHART_VALUE === 0;
        return (
          <View className="items-center" key={index}>
            <View
              style={[
                {
                  height: countZero
                    ? '75%'
                    : maxValue
                    ? '0%'
                    : value.toString() + '%',
                  backgroundColor: '#fcdca5',
                  position: 'absolute',
                  zIndex: 1,
                  borderColor: 'black',
                  borderWidth: 0.3,
                } as ViewStyle,
              ]}
              className="w-10 items-center justify-end"
            />
            <View
              style={[
                Theme.shadow,
                styles.chart,
                {
                  height: '75%',
                  backgroundColor: Colors.primarySecond,
                },
              ]}
              className="w-10 items-center">
              <Text
                style={[
                  Theme.font,
                  item.CHART_VALUE !== 0 && {
                    top: -20,
                  },
                ]}>
                {item.CHART_VALUE}
              </Text>
            </View>
            <Text style={[Theme.font]}>{item.CHART_LABEL}</Text>
          </View>
        );
      })}
    </Animated.View>
  );
};

export default FaultyMachineChart;

const styles = StyleSheet.create({
  chart: {
    backgroundColor: Colors.primarySecond,
    borderColor: 'black',
    borderWidth: 0.3,
    marginBottom: 5,
  },
});
