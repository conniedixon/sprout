/** @format */

import React from 'react';
import { Text } from 'react-native';

const ValidationErrorMessage = props => {
  // console.log(props.children);
  return <Text style={{ color: 'red' }}>{props.children}</Text>;
};

export default ValidationErrorMessage;
