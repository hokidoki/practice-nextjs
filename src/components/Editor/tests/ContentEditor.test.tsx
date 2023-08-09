import { fireEvent, render, waitFor } from '@render';
import ContentEditor from '../ContentEditor';
import { isNull } from '@fxts/core';

describe('ContentEditor', () => {
  it('match snapshot', () => {
    const props = {
      title: 'TITLE',
      article: 'ARTICLE',
      onSubmit: () => Promise.resolve(),
    };
    const utils = render(<ContentEditor {...props} />);
    expect(utils.container).toMatchSnapshot();
  });

  it('마운트 당시의 제목과 글이 이전과 동일한 경우, button은 disabled상태이다.', async () => {
    const props = {
      title: 'TITLE',
      article: 'ARTICLE',
      onSubmit: () => Promise.resolve(),
    };
    const utils = render(<ContentEditor {...props} />);

    const input = utils.container.querySelector('input');
    const editor = utils.container.querySelector('[contenteditable]');
    const button = utils.container.querySelector('button');

    if (isNull(input) || isNull(button) || isNull(editor))
      throw new Error('Element is null');

    expect(button.disabled).toBeTruthy();
    fireEvent.input(input, { target: { value: 'NEW_TITLE' } });
    expect(button.disabled).toBeFalsy();
  });

  it('입력이 3이하인 경우, button은 disabled상태이다.', async () => {
    const props = {
      title: 'TITLE',
      article: 'ARTICLE',
      onSubmit: () => Promise.resolve(),
    };
    const utils = render(<ContentEditor {...props} />);

    const input = utils.container.querySelector('input');
    const editor = utils.container.querySelector('[contenteditable]');
    const button = utils.container.querySelector('button');

    if (isNull(input) || isNull(button) || isNull(editor))
      throw new Error('Element is null');

    expect(button.disabled).toBeTruthy();
    fireEvent.input(input, { target: { value: 'N' } });
    fireEvent.input(editor, { target: { innerHTML: 'H' } });
    expect(button.disabled).toBeTruthy();
  });
  it('버튼을 눌러 입력을 제출하여 pending일 때, input과 [contenteditable]요소는 disabled 상태이다.', async () => {
    const props = {
      title: 'TITLE',
      article: 'ARTICLE',
      onSubmit: () => Promise.resolve(),
    };
    const utils = render(<ContentEditor {...props} />);

    const input = utils.container.querySelector('input');
    const editor = utils.container.querySelector('[contenteditable]');
    const button = utils.container.querySelector('button');

    if (isNull(input) || isNull(button) || isNull(editor))
      throw new Error('Element is null');

    expect(button.disabled).toBeTruthy();
    fireEvent.input(input, { target: { value: 'NEW_TITLE' } });
    fireEvent.input(editor, { target: { innerHTML: 'NEW_ARTICLE' } });
    expect(button.disabled).toBeFalsy();

    fireEvent.click(button);
    await waitFor(() => {
      expect(input.disabled).toBeTruthy();
      expect(editor.getAttribute('contenteditable')).toBe('false');
    });
  });
});
