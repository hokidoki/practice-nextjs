import { render } from '@render';
import DashArrayCircleSpinner from '../DashArrayCircleSpinner';

describe('CommentListItem', () => {
  it('match snapshot', () => {
    const utils = render(<DashArrayCircleSpinner />);
    expect(utils.container).toMatchSnapshot();
  });
});
