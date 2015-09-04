// Load dependencies.

Focus.components = FocusComponents;

const items = [
    {icon:'circle', route: 'papa', onClick:function(){console.log('I click here......')}, name: '1'},
    {icon:'circle',  onClick:function(){console.log('I click here 2 only cb......')}, name: '2'}
];

const Menu = FocusComponents.application.menu.component;
const Button = FocusComponents.common.button.action.component;

const TestApp = React.createClass({
    displayName: 'TestApp',
    handleOnClickLeft() {
        this.refs.menuLeft.toggle();
    },
    handleOnClickTop() {
        this.refs.menuTop.toggle();
    },
    handleOnClickRight() {
        this.refs.menuRight.toggle();
    },
    handleOnClickBottom() {
        this.refs.menuBottom.toggle();
    },
    render() {
        return (
            <div>
                Menu test, you can try out any of these menus.
                <br/>
                <br/>
                <br/>
                <br/>
                <Button handleOnClick={this.handleOnClickLeft} label='Toggle menu left'/>
                <Menu items={items} open={false} ref='menuLeft' title='Menu left'/>
                <Button handleOnClick={this.handleOnClickTop} label='Toggle menu top'/>
                <Menu direction='horizontal' items={items} open={false} position='top' ref='menuTop' title='Menu top'/>
                <Button handleOnClick={this.handleOnClickRight} label='Toggle menu right'/>
                <Menu direction='vertical' items={items} open={false} position='right' ref='menuRight' title='Menu right'/>
                <Button handleOnClick={this.handleOnClickBottom} label='Toggle menu bottom'/>
                <Menu direction='horizontal' items={items} open={false} position='bottom' ref='menuBottom' title='Menu bottom'/>
            </div>
        );
    }
});

return <TestApp/>;
