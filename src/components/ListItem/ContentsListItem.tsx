import type ContentListItemProps from './ContentsListItem.types';
import ContentListItemStyles from './ContentsListItem.styles';
import Link from 'next/link';

export function ContentsListItem({ id, title, summary }: ContentListItemProps) {
  return (
    <Link href={`/contents/${id}`} style={{ display: 'contents' }} key={id}>
      <ContentListItemStyles.Layout>
        <ContentListItemStyles.Title>{title}</ContentListItemStyles.Title>
        <ContentListItemStyles.Summary>{summary}</ContentListItemStyles.Summary>
      </ContentListItemStyles.Layout>
    </Link>
  );
}
