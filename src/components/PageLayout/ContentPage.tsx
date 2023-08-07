import type ContentPageProps from './ContentPage.types';
import ContentPageStyle from './ContentPage.styles';

export default function ContentPage({ children, title }: ContentPageProps) {
  return (
    <ContentPageStyle.Layout>
      <ContentPageStyle.ContentArea>
        <ContentPageStyle.Title>{title}</ContentPageStyle.Title>
        {children}
      </ContentPageStyle.ContentArea>
    </ContentPageStyle.Layout>
  );
}
