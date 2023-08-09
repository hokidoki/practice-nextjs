import { fireEvent, render } from '@render';
import EditorPage from '../EditorPage';

describe('EditorPage', () => {
  it('match snapshot ', () => {
    const utils = render(<EditorPage />);
    expect(utils.container).toMatchSnapshot();
  });
});
