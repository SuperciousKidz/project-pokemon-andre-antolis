import { render } from '@testing-library/react';
import App from './App';

describe('app', () => {
  it("render properly", async () => {
    const { debug } = render(<App />);
    debug();
  });
})