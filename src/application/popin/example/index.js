const Popin = FocusComponents.application.popin.component;
const PopinContent = <div>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis condimentum, turpis non aliquam bibendum, ligula ex convallis dui, vel tincidunt ipsum risus et lacus. Vivamus quam lectus, finibus in gravida id, auctor semper libero. Cras lacinia dapibus erat facilisis vestibulum. Suspendisse aliquam sollicitudin lorem, eu ultricies velit malesuada in. Nunc at eros id erat gravida tincidunt. Nulla id ornare sem, nec mattis lacus. In ex libero, pulvinar semper nisl ut, pulvinar facilisis nisl. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis condimentum, turpis non aliquam bibendum, ligula ex convallis dui, vel tincidunt ipsum risus et lacus. Vivamus quam lectus, finibus in gravida id, auctor semper libero. Cras lacinia dapibus erat facilisis vestibulum. Suspendisse aliquam sollicitudin lorem, eu ultricies velit malesuada in. Nunc at eros id erat gravida tincidunt. Nulla id ornare sem, nec mattis lacus. In ex libero, pulvinar semper nisl ut, pulvinar facilisis nisl. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis condimentum, turpis non aliquam bibendum, ligula ex convallis dui, vel tincidunt ipsum risus et lacus. Vivamus quam lectus, finibus in gravida id, auctor semper libero. Cras lacinia dapibus erat facilisis vestibulum. Suspendisse aliquam sollicitudin lorem, eu ultricies velit malesuada in. Nunc at eros id erat gravida tincidunt. Nulla id ornare sem, nec mattis lacus. In ex libero, pulvinar semper nisl ut, pulvinar facilisis nisl. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis condimentum, turpis non aliquam bibendum, ligula ex convallis dui, vel tincidunt ipsum risus et lacus. Vivamus quam lectus, finibus in gravida id, auctor semper libero. Cras lacinia dapibus erat facilisis vestibulum. Suspendisse aliquam sollicitudin lorem, eu ultricies velit malesuada in. Nunc at eros id erat gravida tincidunt. Nulla id ornare sem, nec mattis lacus. In ex libero, pulvinar semper nisl ut, pulvinar facilisis nisl. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis condimentum, turpis non aliquam bibendum, ligula ex convallis dui, vel tincidunt ipsum risus et lacus. Vivamus quam lectus, finibus in gravida id, auctor semper libero. Cras lacinia dapibus erat facilisis vestibulum. Suspendisse aliquam sollicitudin lorem, eu ultricies velit malesuada in. Nunc at eros id erat gravida tincidunt. Nulla id ornare sem, nec mattis lacus. In ex libero, pulvinar semper nisl ut, pulvinar facilisis nisl. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis condimentum, turpis non aliquam bibendum, ligula ex convallis dui, vel tincidunt ipsum risus et lacus. Vivamus quam lectus, finibus in gravida id, auctor semper libero. Cras lacinia dapibus erat facilisis vestibulum. Suspendisse aliquam sollicitudin lorem, eu ultricies velit malesuada in. Nunc at eros id erat gravida tincidunt. Nulla id ornare sem, nec mattis lacus. In ex libero, pulvinar semper nisl ut, pulvinar facilisis nisl.</div>;

const menuMixin = FocusComponents.application.menu.mixin;

const Menu = React.createClass({
    mixins: [menuMixin],
    renderContent() {
        return this.renderLinks();
    },
    renderTitle() {
        return (
            <h3>{this.props.title}</h3>
        );
    }
});

const Button = FocusComponents.common.button.action.component;

const Demo = React.createClass({
    displayName: 'PopinDemo',
    popinOpener(ref) {
        const self = this;
        return (event) => {
            event.preventDefault();
            self.refs[ref].toggleOpen();
        };
    },
    render() {
        return (
            <div>
                <Menu open={true} position='left' title='M'/>
                <div className='buttons'>
                    <Button handleOnClick={this.popinOpener('full')} label='Open full popin' style={{className: 'btn-primary'}}/>
                    <Button handleOnClick={this.popinOpener('from-menu')} label='Open from-menu popin' style={{className: 'btn-primary'}}/>
                    <Button handleOnClick={this.popinOpener('from-right')} label='Open from-right popin' style={{className: 'btn-primary'}}/>
                </div>
                <div className='content'>
                    <h3>Some content to fill the page</h3>
                    <img src='http://lorempixel.com/800/600/sports/'/>
                    <img src='http://lorempixel.com/800/600/abstract/'/>
                    <img src='http://lorempixel.com/800/600/city/'/>
                    <img src='http://lorempixel.com/800/600/technics/'/>
                </div>
                <div className='popins-container'>
                    <Popin ref='full' type='full'>
                        {PopinContent}
                    </Popin>
                    <Popin ref='from-menu' type='from-menu'>
                        <Button handleOnClick={this.popinOpener('from-right-no-overlay')} label='Open from-right popin' style={{className: 'btn-primary'}}/>
                        <Button handleOnClick={this.popinOpener('from-menu-second')} label='Open sub-menu popin' style={{className: 'btn-primary'}}/>
                        <Button handleOnClick={this.popinOpener('full')} label='Open full popin' style={{className: 'btn-primary'}}/>
                        {PopinContent}
                        <Popin overlay={false} ref='from-right-no-overlay' type='from-right'>
                            {PopinContent}
                        </Popin>
                    </Popin>
                    <Popin level={1} overlay={false} ref='from-menu-second' type='from-menu'>
                        {PopinContent}
                    </Popin>
                    <Popin ref='from-right' type='from-right'>
                        {PopinContent}
                    </Popin>
                </div>
            </div>
        );
    }
});

return <Demo/>;
