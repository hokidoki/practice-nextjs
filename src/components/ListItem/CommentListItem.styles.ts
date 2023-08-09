import styled from 'styled-components';
import ContentViewerStyles from '../Viewer/ContentViewer.styles';

// ContentListItem
const CommentListItemStyles = (() => {
  const Layout = styled.div`
    ${({ theme }) =>
      theme.mixin.flexbox({ direction: 'column', align: 'center' })};
    position: relative;
    width: 100%;
    min-height: 200px;
    height: 200px;
    border: 2px solid ${({ theme }) => theme.bordercolor.layer_1};
    border-radius: 10px;
  `;

  const ViewerHeader = ContentViewerStyles.ViewerHeader;
  const CreatedAt = ContentViewerStyles.CreatedAt;
  const Controlls = ContentViewerStyles.Controlls;
  const ControlButton = ContentViewerStyles.ControlButton;
  const Article = ContentViewerStyles.Article;

  return {
    Layout,
    ViewerHeader,
    CreatedAt,
    Controlls,
    ControlButton,
    Article,
  };
})();

export default CommentListItemStyles;
