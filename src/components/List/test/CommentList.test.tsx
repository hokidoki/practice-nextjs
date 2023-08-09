import { fireEvent, render, waitFor } from '@render';
import CommentList from '../CommentList';
import { isNull } from '@fxts/core';
import type CommentListItem from '@/components/ListItem/CommentListItem';
import type CommentEditor from '@/components/Editor/CommentEditor';
const PUT_COMMENT_ARG = 'PUT_COMMENT';
jest.mock('../../ListItem/CommentListItem', () => {
  const mockupComponent = ({
    setEdit,
    deleteComment,
    putComment,
    id,
    editing,
    isLoading,
  }: Parameters<typeof CommentListItem>[0]) => {
    return (
      <div id={id}>
        <button t-id={'setEdit'} onClick={() => setEdit(id)} />
        <button t-id={'deleteComment'} onClick={() => deleteComment(id)} />
        <button
          t-id={'putComment'}
          onClick={() => putComment(PUT_COMMENT_ARG)}
        />
        <div t-id={'editing'} t-value={editing.toString()} />
        <div t-id={'isLoading'} t-value={String(isLoading)} />
      </div>
    );
  };

  return jest.fn().mockImplementation(mockupComponent);
});
const POST_COMMENT_ARG = 'NEW_COMMENT';
jest.mock('../../Editor/CommentEditor', () => {
  const mockupComponent = ({
    onSubmit,
    disabled,
  }: Parameters<typeof CommentEditor>[0]) => {
    return (
      <div id="commentEditor">
        <button
          t-id={'onSubmit'}
          onClick={() => onSubmit(POST_COMMENT_ARG)}
        ></button>
        <div t-id={'disabled'} t-value={String(disabled)} />
      </div>
    );
  };

  return jest.fn().mockImplementation(mockupComponent);
});

describe('CommentList', () => {
  it('CommentListItem에서 setEdit를 호출하면 editing 프롭스가 변경된다.', async () => {
    const comments = [
      {
        article: 'ARTICLE',
        id: 'A',
        articleId: '0',
        createdAt: '2020-02-02',
      },
    ];
    const crudObject = {
      createComment: jest.fn().mockResolvedValue(''),
      putComment: jest.fn().mockResolvedValue(''),
      deleteComment: jest.fn().mockResolvedValue(''),
    };
    const utils = render(<CommentList comments={comments} {...crudObject} />);
    const listitem = utils.container.querySelector('#A');

    if (isNull(listitem)) throw new Error('missing');

    const btn = listitem.querySelector('button[t-id=setEdit]')!;
    const value = listitem.querySelector('div[t-id=editing]')!;

    expect(value.getAttribute('t-value')).toBe('false');
    fireEvent.click(btn);
    await waitFor(() => expect(value.getAttribute('t-value')).toBe('true'));
  });

  it('CommentListItem에서 putComment 혹은 deleteComment 함수를 호출하면 isLoading 프롭스가 변경된다.', async () => {
    Object.defineProperty(window, 'confirm', {
      value: () => true,
    });

    const comments = [
      {
        article: 'ARTICLE',
        id: 'A',
        articleId: '0',
        createdAt: '2020-02-02',
      },
    ];
    const crudObject = {
      createComment: jest.fn().mockResolvedValue(''),
      putComment: jest.fn().mockResolvedValue(''),
      deleteComment: jest.fn().mockResolvedValue(''),
    };
    const utils = render(<CommentList comments={comments} {...crudObject} />);
    const listitem = utils.container.querySelector('#A');

    if (isNull(listitem)) throw new Error('missing');

    const deleteBtn = listitem.querySelector('button[t-id=deleteComment]')!;
    const putBtn = listitem.querySelector('button[t-id=putComment]')!;
    const value = listitem.querySelector('div[t-id=isLoading]')!;

    expect(value.getAttribute('t-value')).toBe('false');
    fireEvent.click(deleteBtn);
    await waitFor(() => expect(value.getAttribute('t-value')).toBe('true'));
    expect(value.getAttribute('t-value')).toBe('false');
    fireEvent.click(putBtn);
    await waitFor(() => expect(value.getAttribute('t-value')).toBe('true'));
    expect(value.getAttribute('t-value')).toBe('false');
  });

  it('CommentEditor에서 onSubmit를 호출하면 disabled 프롭스가 변경된다.', async () => {
    const comments: any[] = [];
    const crudObject = {
      createComment: jest.fn().mockResolvedValue(''),
      putComment: jest.fn().mockResolvedValue(''),
      deleteComment: jest.fn().mockResolvedValue(''),
    };
    const utils = render(<CommentList comments={comments} {...crudObject} />);
    const editor = utils.container.querySelector('#commentEditor');

    if (isNull(editor)) throw new Error('missing');

    const postBtn = editor.querySelector('button[t-id=onSubmit]')!;
    const value = editor.querySelector('div[t-id=disabled]')!;

    expect(value.getAttribute('t-value')).toBe('false');
    fireEvent.click(postBtn);
    await waitFor(() => expect(value.getAttribute('t-value')).toBe('true'));
    expect(value.getAttribute('t-value')).toBe('false');
  });
});
