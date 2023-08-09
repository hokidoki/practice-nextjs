import { fireEvent, render } from '@render';
import CommentListItem from '../CommentListItem';
import { act } from 'react-dom/test-utils';

describe('CommentListItem', () => {
  it('match snapshot when editing', () => {
    const props = {
      id: '0',
      article: 'Comment',
      createdAt: '22-02-22',
      editing: true,
      articleId: '0',
      setEdit: () => {},
      deleteComment: () => Promise.resolve(''),
      putComment: () => Promise.resolve(''),
      isLoading: false,
    };
    const utils = render(<CommentListItem {...props} />);
    expect(utils.container).toMatchSnapshot();
  });

  it('match snapshot when viewmode', () => {
    const props = {
      id: '0',
      article: 'Comment',
      createdAt: '22-02-22',
      editing: false,
      articleId: '0',
      setEdit: () => {},
      deleteComment: () => Promise.resolve(''),
      putComment: () => Promise.resolve(''),
      isLoading: false,
    };
    const utils = render(<CommentListItem {...props} />);
    expect(utils.container).toMatchSnapshot();
  });

  it('editing일때, 쓰기 버튼을 클릭하면 putComment가 호출된다.', async () => {
    const props = {
      id: '0',
      article: 'Comment',
      createdAt: '22-02-22',
      editing: true,
      articleId: '0',
      setEdit: () => {},
      deleteComment: () => Promise.resolve(''),
      putComment: jest.fn().mockResolvedValue(''),
      isLoading: false,
    };
    const utils = render(<CommentListItem {...props} />);
    const writeButton = utils.getByText('쓰기');

    await act(async () => fireEvent.click(writeButton));
    expect(props.putComment).toBeCalled();
  });

  it('삭제 버튼을 클릭하면 deleteComment가 호출된다.', async () => {
    const props = {
      id: '0',
      article: 'Comment',
      createdAt: '22-02-22',
      editing: true,
      articleId: '0',
      setEdit: () => {},
      deleteComment: jest.fn().mockResolvedValue(''),
      putComment: jest.fn().mockResolvedValue(''),
      isLoading: false,
    };
    const utils = render(<CommentListItem {...props} />);
    const writeButton = utils.getByText('삭제');

    await act(async () => fireEvent.click(writeButton));
    expect(props.deleteComment).toBeCalled();
  });

  it('취소 혹은 수정버튼을 클릭하면, setEdit가 호출된다.', async () => {
    const props = {
      id: '0',
      article: 'Comment',
      createdAt: '22-02-22',
      editing: true,
      articleId: '0',
      setEdit: jest.fn(),
      deleteComment: jest.fn().mockResolvedValue(''),
      putComment: jest.fn().mockResolvedValue(''),
      isLoading: false,
    };
    const utils = render(<CommentListItem {...props} />);
    const cancelbtn = utils.getByText('취소');

    await act(async () => fireEvent.click(cancelbtn));
    expect(props.setEdit).toBeCalledTimes(1);

    props.editing = false;
    utils.rerender(<CommentListItem {...props} />);
    const editBtn = utils.getByText('수정');
    await act(async () => fireEvent.click(editBtn));
    expect(props.setEdit).toBeCalledTimes(2);
  });
});
