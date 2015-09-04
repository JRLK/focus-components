const ConfirmationPopin = FocusComponents.application.confirmationPopin.component;
const Button = FocusComponents.common.button.action.component;

const Wrapper = React.createClass({
    getInitialState() {
        return ({status: 'Waiting for confirmation...'});
    },
    _onButtonClickHandler() {
        this.refs.popin.toggleOpen();
    },
    _cancelHandler() {
        this.setState({status: 'Cancelled.'});
    },
    _confirmHandler() {
        this.setState({status: 'Confirmed !'});
    },
    render() {
        return (
            <div>
                <h1>{this.state.status}</h1>
                <Button handleOnClick={this._onButtonClickHandler} label='Confirm action'/>
                <ConfirmationPopin cancelHandler={this._cancelHandler} confirmHandler={this._confirmHandler} ref='popin'>
                    <div>
                        Confirmation popin content goes here.
                    </div>
                </ConfirmationPopin>
            </div>
        )
    }
});

return <Wrapper/>;
