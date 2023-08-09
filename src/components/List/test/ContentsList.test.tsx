import { fireEvent, render, waitFor } from '@render';
import ContentsList from '../ContentsList';
import { isNull } from '@fxts/core';

describe('ContentsList', () => {
  it('match snapshot', () => {
    const props = {
      contents: [
        {
          id: '1',
          summary: 'summary',
          title: 'title',
          createdAt: '2020-02-02',
        },
      ],
      newArticleButtonOnClick: () => {},
    };
    const utils = render(<ContentsList {...props} />);
    expect(utils.container).toMatchSnapshot();
  });

  it('리스트의 버튼을 클릭시 프롭스로 전달한 newArticleButtonOnClick이 호출 된다. ', () => {
    const props = {
      contents: [
        {
          id: '1',
          summary: 'summary',
          title: 'title',
          createdAt: '2020-02-02',
        },
      ],
      newArticleButtonOnClick: jest.fn(),
    };
    const utils = render(<ContentsList {...props} />);
    const button = utils.container.querySelector('button');

    if (isNull(button)) throw new Error('button missing');

    fireEvent.click(button);
    expect(props.newArticleButtonOnClick).toBeCalled();
  });
});
