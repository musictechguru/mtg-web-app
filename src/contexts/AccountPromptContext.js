import { createContext, useContext } from 'react';

// Lets any paywall or results screen send a visitor without an account to the
// sign-up form. MainApp provides the handler, which takes { view, role, reason }.
const AccountPromptContext = createContext(null);

export const AccountPromptProvider = AccountPromptContext.Provider;

export const useAccountPrompt = () => {
    const openAccount = useContext(AccountPromptContext);
    // Outside MainApp, fall back to the landing page, which has the form
    return openAccount || (() => window.location.assign('/'));
};
