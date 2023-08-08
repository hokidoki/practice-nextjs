import React from 'react';
import type DashArrayCircleSpinnerProps from './DashArrayCircleSpinner.types';
import DashArrayCircleSpinnerStyle from './DashArrayCircleSpinner.styles';
import SpinnerLayoutStyle from './SpinnerLayout.styles';

export default function DashArrayCircleSpinner({}: DashArrayCircleSpinnerProps) {
  return (
    <DashArrayCircleSpinnerStyle.SVG viewBox="0 0 100 100">
      <DashArrayCircleSpinnerStyle.Circle cx={'50'} cy={'50'} r={'48'} />
    </DashArrayCircleSpinnerStyle.SVG>
  );
}

export function DashArrayCircleSpinnerWithLayout<T>({
  layoutProps,
}: {
  layoutProps?: Parameters<(typeof SpinnerLayoutStyle)['ParentCoverLayout']>[0];
}) {
  return (
    <SpinnerLayoutStyle.ParentCoverLayout {...layoutProps}>
      <DashArrayCircleSpinner />
    </SpinnerLayoutStyle.ParentCoverLayout>
  );
}
