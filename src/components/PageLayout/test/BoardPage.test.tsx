import { fireEvent, render } from '@render';
import BoardPage from '../BoardPage';

describe('BoardPage', () => {
  it('match snapshot ', () => {
    const utils = render(<BoardPage />);
    expect(utils.container).toMatchSnapshot();
  });
});
