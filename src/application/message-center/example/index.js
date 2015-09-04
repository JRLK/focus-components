// Load dependencies.

Focus.components = FocusComponents;

const MessageCenter = Focus.components.application.messageCenter.component;

// Push messages in the message center.

Focus.message.addErrorMessage({title: 'error message', content: 'content'});
Focus.message.addInformationMessage({title: 'information message', content: 'content'});
Focus.message.addWarningMessage({title: 'warning message', content: 'content'});
Focus.message.addSuccessMessage({title: 'Success message', content: 'content'});

return <MessageCenter/>;
