// Dependencies.

const {builder, types} = require('focus').component;
const moment = require('moment');

// Components

const InputText = require('../text').component;
const DateRangePicker = require('react-bootstrap-daterangepicker'); //https://github.com/skratchdot/react-bootstrap-daterangepicker

const defaultLocale = {
    format: 'L', //cf mo moment.js documentation for further date format
    separator: ' - ',
    applyLabel: 'Apply',
    cancelLabel: 'Cancel',
    fromLabel: 'From',
    toLabel: 'To',
    customRangeLabel: 'Custom',
    daysOfWeek: [
        'Su',
        'Mo',
        'Tu',
        'We',
        'Th',
        'Fr',
        'Sa'
    ],
    monthNames: [
        'January',
        'February',
        'March',
        'April',
        'May',
        'June',
        'July',
        'August',
        'September',
        'October',
        'November',
        'December'
    ],
    firstDay: 1
};

/**
* Input text mixin.
* @type {Object}
*/
const InputDateMixin = {
    /**
    * Tag name.
    */
    displayName: 'InputDate',

    /**
     * Get default props
     * @return {object} default props
     */
    getDefaultProps() {
        return {
            drops: 'down', // possible values: up, down
            showDropdowns: true,
            locale: defaultLocale,
            value: moment()
        };
    },
    /** @inheritdoc */
    propTypes: {
        drops: types('string'),
        error: types('string'),
        formatter: types('func'),
        locale: types('object').isRequired,
        name: types('string').isRequired,
        placeHolder: types('string'),
        value: types('object').isRequired
    },
    /**
     * Get initial state
     * @return {object} initial state
     */
    getInitialState() {
        const rawDate = moment(this.props.value).isValid() ? this.props.value : moment();
        const inputDate = this.getFormattedDate(rawDate);
        return {inputDate, rawDate};
    },
    /**
     * New props handler
     * @param  {object} value new value given as a prop
     */
    componentWillReceiveProps({value}) {
        const rawDate = moment(value).isValid() ? value : moment();
        const inputDate = this.getFormattedDate(rawDate);
        this.setState({inputDate, rawDate});
    },
    /**
    * Get the selected date.
    * @return {object} selected date
    */
    getValue() {
        return moment(this.state.rawDate).toISOString();
    },
    /**
     * Get formatted value.
     * @param  {date} rawDate raw date
     * @return {string} formatted date
     */
    getFormattedDate(rawDate = moment()) {
        const {locale: {format}} = this.props;
        return moment(rawDate).format(format);
    },
    /**
    * Action when selection date event.
    * @param  {event} event event triggered by the component
    * @param  {date} pickerDate date picker date value
    */
    _onPickerApply(event, {startDate: pickerDate}) {
        this.setState({
            inputDate: this.getFormattedDate(pickerDate),
            rawDate: pickerDate
        });
    },
    /**
     * Input blur handler
     * @param  {object} inputDate input field value
     */
    _onInputBlur({target: {value: inputDate}}) {
        if (moment(inputDate).isValid()) {
            this.setState({
                inputDate,
                rawDate: moment(inputDate)
            });
        } else {
            this.setState({
                inputDate: this.getFormattedDate()
            });
        }
    },
    /**
     * Input change handler
     * @param  {object} inputDate input field value
     */
    _onInputChange({target: {value: inputDate}}) {
        if (moment(inputDate).isValid()) {
            this.setState({inputDate, rawDate: inputDate});
        } else {
            this.setState({inputDate});
        }
    },
    /**
     * Render the component
     * @return {HTML} rendered component
     */
    render() {
        const {inputDate, rawDate} = this.state;
        const {drops, error, locale, name, placeHolder, showDropdowns} = this.props;
        const {_onInputBlur, _onInputChange, _onPickerApply} = this;
        return (
            <div data-focus='input-date'>
            <DateRangePicker drops={drops} endDate={moment(rawDate)} locale={locale} onApply={_onPickerApply} opens='center' ref='daterangepicker' showDropdowns={showDropdowns} singleDatePicker={true} startDate={moment(rawDate)}>
                <InputText error={error} name={name} onBlur={_onInputBlur} onChange={_onInputChange} placeHolder={placeHolder} ref='inputDateText' value={inputDate} />
            </DateRangePicker>
            </div>
        );
    }
};

module.exports = builder(InputDateMixin);
