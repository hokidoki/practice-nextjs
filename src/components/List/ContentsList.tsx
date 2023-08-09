import ContentsListStyles from './ContentsList.styles';
import { ContentsListProps } from './ContentsList.types';
import ContentsListItem from '../ListItem/ContentsListItem';

export default function ContentsList({
  contents,
  newArticleButtonOnClick,
}: ContentsListProps) {
  return (
    <ContentsListStyles.Layout>
      <ContentsListStyles.AddContentButton onClick={newArticleButtonOnClick} />
      {contents.map((v) => (
        <ContentsListItem {...v} key={v.id} />
      ))}
    </ContentsListStyles.Layout>
  );
}
