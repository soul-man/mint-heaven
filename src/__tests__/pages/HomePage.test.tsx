import { render, screen } from '@testing-library/react';

import HomePage from '$/index';

describe('Homepage', () => {
  it('renders the Components', () => {
    render(<HomePage />);

    const heading = screen.getByText(
      /Next.js + Tailwind + ThirdWeb + web3 + dapp + TypeScript Starter/i
    );

    expect(heading).toBeInTheDocument();
  });
});
