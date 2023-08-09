import React from 'react';
import ErrorPageProps from './ErrorPage.types';
import ErrorPageStyles from './ErrorPage.style';

export default function ErrorPage({ code, message }: ErrorPageProps) {
  return (
    <ErrorPageStyles.Layout>
      <ErrorPageStyles.Title>{code}</ErrorPageStyles.Title>
      <ErrorPageStyles.Message>{message}</ErrorPageStyles.Message>
    </ErrorPageStyles.Layout>
  );
}
