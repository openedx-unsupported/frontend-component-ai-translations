import * as React from 'react';
import { act, render, screen } from '@testing-library/react';
import { IntlProvider } from '@edx/frontend-platform/i18n';
// eslint-disable-next-line import/no-extraneous-dependencies
import userEvent from '@testing-library/user-event';

import App from './App';
import messages from './messages';

const courseId = 'Fake-ID';

describe('App', () => {
  it('renders collapsible button', () => {
    const onSetIsAiTranslations = jest.fn();
    render(
      <IntlProvider locale="en">
        <App
          setIsAiTranslations={onSetIsAiTranslations}
          closeTranscriptSettings={() => {}}
          courseId={courseId}
        />
      </IntlProvider>,
    );

    expect(
      screen.getByText(messages.getFreeTranslations.defaultMessage),
    ).toBeInTheDocument();
  });

  it('renders App component', async () => {
    const onSetIsAiTranslations = jest.fn();

    render(
      <IntlProvider locale="en">
        <App
          setIsAiTranslations={onSetIsAiTranslations}
          closeTranscriptSettings={() => {}}
        />
      </IntlProvider>,
    );

    userEvent.click(screen.getByTestId('app-entry-btn'));
    expect(await screen.findByTestId('action-row-btns')).toBeTruthy();
  });

  it('goes back to previous view', async () => {
    const onSetIsAiTranslations = jest.fn();
    render(
      <IntlProvider locale="en">
        <App
          setIsAiTranslations={onSetIsAiTranslations}
          closeTranscriptSettings={() => {}}
        />
      </IntlProvider>,
    );

    userEvent.click(
      screen.getByText(messages.getFreeTranslations.defaultMessage),
    );
    expect(await screen.findByText(messages.translationsNotAvailable.defaultMessage)).toBeInTheDocument();
    expect(await screen.findByTestId('action-row-back-btn')).toBeInTheDocument();

    await act(async () => {
      userEvent.click(screen.queryByTestId('action-row-back-btn'));
    });

    expect(onSetIsAiTranslations).toHaveBeenCalled();
    expect(await screen.findByText(messages.getFreeTranslations.defaultMessage)).toBeInTheDocument();
    expect(screen.queryByText(/Get free translations is not available/)).not.toBeInTheDocument();
  });

  it('calls closeTranscriptSettings when close button is clicked', async () => {
    const onSetIsAiTranslations = jest.fn();
    const onCloseTranscriptSettings = jest.fn();
    render(
      <IntlProvider locale="en">
        <App
          setIsAiTranslations={onSetIsAiTranslations}
          closeTranscriptSettings={onCloseTranscriptSettings}
        />
      </IntlProvider>,
    );

    userEvent.click(
      screen.getByText(messages.getFreeTranslations.defaultMessage),
    );
    expect(await screen.findByText(messages.translationsNotAvailable.defaultMessage)).toBeInTheDocument();
    expect(await screen.findByTestId('action-row-close-btn')).toBeInTheDocument();

    await userEvent.click(screen.queryByTestId('action-row-close-btn'));

    expect(onCloseTranscriptSettings).toHaveBeenCalled();
  });
});
