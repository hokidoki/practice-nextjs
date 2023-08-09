import { fireEvent, render, waitFor } from '@render';
import CommentEditor from '../CommentEditor';
import { isNull } from '@fxts/core';

describe('CommentEditor', () => {
  it('match snapshot', () => {
    const props = {
      article: 'ARTICLE',
      onSubmit: () => Promise.resolve(),
      disabled: false,
    };
    const utils = render(<CommentEditor {...props} />);
    expect(utils.container).toMatchSnapshot();
  });

  it('onSubmit이 resolved 상태라면, [contenteditable]요소의 내용은 삭제된다.', async () => {
    const props = {
      article: 'ARTICLE',
      onSubmit: jest.fn().mockResolvedValue('SUCCESS'),
      disabled: false,
    };
    const utils = render(<CommentEditor {...props} />);
    const editor = utils.container.querySelector('[contenteditable]');
    const button = utils.container.querySelector('button');

    if (isNull(button) || isNull(editor)) throw new Error('Element is null');

    expect(editor.innerHTML).toBe(props.article);

    fireEvent.click(button);

    await waitFor(() => expect(props.onSubmit).toBeCalled());

    expect(editor.innerHTML).toBe('');
  });

  it('onSubmit이 rejected상태라면, [contenteditable]요소의 내용은 이전과 동일하다.', async () => {
    const props = {
      article: 'ARTICLE',
      onSubmit: jest.fn().mockRejectedValue('FAILED'),
      disabled: false,
    };
    const utils = render(<CommentEditor {...props} />);
    const editor = utils.container.querySelector('[contenteditable]');
    const button = utils.container.querySelector('button');

    if (isNull(button) || isNull(editor)) throw new Error('Element is null');

    expect(editor.innerHTML).toBe(props.article);

    fireEvent.click(button);

    await waitFor(() => expect(props.onSubmit).toBeCalled());

    expect(editor.innerHTML).toBe(props.article);
  });
});
