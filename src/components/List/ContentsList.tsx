import ContentsListStyles from './ContentsList.styles';
import { ContentsListProps } from './ContentsList.types';
import { ContentsListItem } from '../ListItem/ContentsListItem';

export default function ContentsList({ contents }: ContentsListProps) {
  return (
    <ContentsListStyles.Layout>
      <ContentsListStyles.AddContentButton />
      {contents.map((v) => (
        <ContentsListItem {...v} key={v.id} />
      ))}
    </ContentsListStyles.Layout>
  );
}
