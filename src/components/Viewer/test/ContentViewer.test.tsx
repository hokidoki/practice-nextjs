import { fireEvent, render, waitFor } from '@render';
import ContentViewer from '../ContentViewer';
import ContentVeiwerProps from '../ContentViewer.types';
import { isNull } from '@fxts/core';

describe('ContentViewer', () => {
  it('match snapshot ', () => {
    const props: ContentVeiwerProps = {
      article: 'ARTICLE',
      createdAt: '2020-02-01',
      id: 'A',
      title: 'TITLE',
      editButtonOnClick: () => {},
      deleteContent: () => Promise.resolve(''),
    };
    const utils = render(<ContentViewer {...props} />);
    expect(utils.container).toMatchSnapshot();
  });

  it('수정 버튼을 클릭하면 editButtonOnClick 이 호출 된다.', () => {
    const props: ContentVeiwerProps = {
      article: 'ARTICLE',
      createdAt: '2020-02-01',
      id: 'A',
      title: 'TITLE',
      editButtonOnClick: jest.fn(),
      deleteContent: () => Promise.resolve(''),
    };
    const utils = render(<ContentViewer {...props} />);
    const putBtn = utils.getByText('수정');
    if (isNull(putBtn)) throw new Error('Missing element');

    fireEvent.click(putBtn);

    expect(props.editButtonOnClick).toBeCalled();
  });

  it('삭제 버튼을 클릭하면 deleteContent가 호출되며 각 버튼들이 disabled상태가 된다.', async () => {
    Object.defineProperty(window, 'confirm', { value: () => true });
    const props: ContentVeiwerProps = {
      article: 'ARTICLE',
      createdAt: '2020-02-01',
      id: 'A',
      title: 'TITLE',
      editButtonOnClick: jest.fn(),
      deleteContent: jest.fn().mockResolvedValue(''),
    };
    const utils = render(<ContentViewer {...props} />);
    const putBtn = utils.getByText('수정');
    const deleteBtn = utils.getByText('삭제');
    if (isNull(deleteBtn)) throw new Error('Missing element');

    fireEvent.click(deleteBtn);

    expect(props.deleteContent).toBeCalled();
    await waitFor(() => {
      expect(putBtn.getAttribute('disabled')).toBe('');
      expect(deleteBtn.getAttribute('disabled')).toBe('');
    });
  });
});
