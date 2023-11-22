import * as React from 'react';
import { act, render, screen } from '@testing-library/react';
// eslint-disable-next-line import/no-extraneous-dependencies
import userEvent from '@testing-library/user-event';

import App from './App';

const courseId = 'Fake-ID';

describe('App', () => {
  it('renders collapsible button', () => {
    const onSetIsAiTranslations = jest.fn();
    render(
      <App
        setIsAiTranslations={onSetIsAiTranslations}
        closeTranscriptSettings={() => {}}
        courseId={courseId}
      />,
    );

    expect(
      screen.getByText(/Get free translations/),
    ).toBeInTheDocument();
  });

  it('renders App component', async () => {
    const onSetIsAiTranslations = jest.fn();

    render(
      <App
        setIsAiTranslations={onSetIsAiTranslations}
        closeTranscriptSettings={() => {}}
      />,
    );

    userEvent.click(screen.getByTestId('app-entry-btn'));
    expect(await screen.findByTestId('action-row-btns')).toBeTruthy();
  });

  it('goes back to previous view', async () => {
    const onSetIsAiTranslations = jest.fn();
    render(
      <App
        setIsAiTranslations={onSetIsAiTranslations}
        closeTranscriptSettings={() => {}}
      />,
    );

    userEvent.click(
      screen.getByText(/Get free translations/),
    );
    expect(await screen.findByText(/Translations is not available/)).toBeInTheDocument();
    expect(await screen.findByTestId('action-row-back-btn')).toBeInTheDocument();

    await act(async () => {
      userEvent.click(screen.queryByTestId('action-row-back-btn'));
    });

    expect(onSetIsAiTranslations).toHaveBeenCalled();
    expect(await screen.findByText(/Get free translations/)).toBeInTheDocument();
    expect(screen.queryByText(/Get free translations is not available/)).not.toBeInTheDocument();
  });

  it('calls closeTranscriptSettings when close button is clicked', async () => {
    const onSetIsAiTranslations = jest.fn();
    const onCloseTranscriptSettings = jest.fn();
    render(
      <App
        setIsAiTranslations={onSetIsAiTranslations}
        closeTranscriptSettings={onCloseTranscriptSettings}
      />,
    );

    userEvent.click(
      screen.getByText(/Get free translations/),
    );
    expect(await screen.findByText(/Translations is not available/)).toBeInTheDocument();
    expect(await screen.findByTestId('action-row-close-btn')).toBeInTheDocument();

    await userEvent.click(screen.queryByTestId('action-row-close-btn'));

    expect(onCloseTranscriptSettings).toHaveBeenCalled();
  });
});
