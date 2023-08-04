import type BoardPageProps from './BoardPage.types';
import BoardPageStyle from './BoardPage.styles';

export function BoardPage({ children }: BoardPageProps) {
  return (
    <BoardPageStyle.Layout>
      <BoardPageStyle.Title>Content Lists</BoardPageStyle.Title>
      {children}
    </BoardPageStyle.Layout>
  );
}
