import { fireEvent, render } from '@render';
import ContentPage from '../ContentPage';

describe('ContentPage', () => {
  it('match snapshot ', () => {
    const utils = render(<ContentPage title="TITLE" />);
    expect(utils.container).toMatchSnapshot();
  });
});
