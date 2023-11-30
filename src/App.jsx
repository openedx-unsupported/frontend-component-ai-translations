import { useState } from 'react';
import {
  ActionRow, Collapsible, Icon, IconButton, Image,
} from '@edx/paragon';
import { ChevronLeft, ChevronRight, Close } from '@edx/paragon/icons';
import PropTypes from 'prop-types';

import XpertLogo from './XpertLogo';

const App = ({ setIsAiTranslations, closeTranscriptSettings }) => {
  const googleTranslateImage = 'https://prod-edx-ai-translations-assets.s3.amazonaws.com/google-translate.png';
  const [appState, setAppState] = useState({
    selectedLanguages: [],
    translationsError: false,
    view: '',
  });

  const handleAppState = (updatedData) => {
    setAppState((previousState) => ({ ...previousState, ...updatedData }));
  };

  const handleViewClick = () => {
    handleAppState({ view: 'request' });
    setIsAiTranslations(true);
  };

  const handleBackButton = () => {
    if (appState.view === 'request') {
      setIsAiTranslations(false);
      setAppState({ ...appState, view: '' });
    }
  };

  return (
    <div>
      {!appState.view && (
        <Collapsible.Advanced
          onOpen={handleViewClick}
          key="ai-translation-btn"
        >
          <Collapsible.Trigger
            className="row m-0 justify-content-between align-items-center mt-4"
            data-testid="app-entry-btn"
            onClick={handleViewClick}
          >
            <div className="d-flex flex-column justify-content-center">
              <XpertLogo />
              Get free translations
              <Image
                src={googleTranslateImage}
                className="flex-grow-0"
                width="122px"
                height="14px"
              />
            </div>
            <Icon src={ChevronRight} />
          </Collapsible.Trigger>
        </Collapsible.Advanced>
      )}
      {appState.view && (
        <>
          <ActionRow
            className="custom-arrow-row mb-3"
            data-testid="action-row-btns"
            key="ai-action-btns"
          >
            <IconButton
              data-testid="action-row-back-btn"
              key="back-button"
              size="sm"
              iconAs={Icon}
              src={ChevronLeft}
              alt="back button to main transcript settings view"
              onClick={handleBackButton}
            />
            <ActionRow.Spacer />
            <IconButton
              size="sm"
              iconAs={Icon}
              onClick={() => {
                closeTranscriptSettings();
                setIsAiTranslations(false);
              }}
              src={Close}
              alt="close settings"
              data-testid="action-row-close-btn"
            />
          </ActionRow>
          <div className="d-flex flex-column" key="ai-translations-views">
            Translations is not available
          </div>
        </>
      )}
    </div>
  );
};

App.propTypes = {
  setIsAiTranslations: PropTypes.func.isRequired,
  closeTranscriptSettings: PropTypes.func.isRequired,
};

export default App;
