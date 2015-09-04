const Example = React.createClass({
    render() {
        return (
            <div>
                <button onClick={function(){throw new Error('Errroooooorrrrrrrrrrrr...........'); }}>Generate error</button>
                <FocusComponents.application.errorCenter.component />
            </div>
        );
    }
});

return <Example/>;
