import { ReactNode } from 'react';

export interface WithChildrenProps {
  children?: ReactNode;
}

export interface WithKey {
  key: string;
}

export interface KnownError {
  code: string; message: string
}