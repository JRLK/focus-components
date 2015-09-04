// Load dependencies.

Focus.components = FocusComponents;
const LoadingBar = Focus.components.application.loadingBar.component;

Focus.dispatcher.handleServerAction({data:{request:{id: 131, status: 'pending'}} ,type: 'update'});
Focus.dispatcher.handleServerAction({data:{request:{id: 132, status: 'pending'}} ,type: 'update'});
Focus.dispatcher.handleServerAction({data:{request:{id: 133, status: 'pending'}} ,type: 'update'});

setTimeout(() => {
    Focus.dispatcher.handleServerAction({data:{request:{id: 133, status: 'error'}} ,type: 'update'});
    Focus.dispatcher.handleServerAction({data:{request:{id: 132, status: 'success'}} ,type: 'update'});
}, 3000);

return <LoadingBar/>;
