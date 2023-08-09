import { render } from '@render';
import ContentsListItem from '../ContentsListItem';

describe('ContentsListItem', () => {
  it('match snapshot', () => {
    const props = {
      id: '0',
      title: 'TITLE',
      summary: 'SUMMARY',
      createdAt: '22-02-22',
    };
    const utils = render(<ContentsListItem {...props} />);
    expect(utils.container).toMatchSnapshot();
  });
});
