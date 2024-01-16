import * as React from 'react';
import { render, screen } from '@testing-library/react';

import App from './App';

describe('App', () => {
  it('renders App component', async () => {
    render(
      <App
        setIsAiTranslations={() => {}}
        closeTranscriptSettings={() => {}}
      />,
    );

    expect(screen.findByTestId('empty-app')).toBeTruthy();
  });
});
