import React from 'react';
import PropTypes from 'prop-types';
import './dob.scss';

class DOB extends React.Component {

  renderDays() {
    const {dayValue} = this.props;
    let days = [];
    for (let iter = 1; iter <= 31; iter++) days.push(iter);
    return (
      <select onChange={this.props.onChange} name='dobDay' value={dayValue}>
        <option value='' disabled='disabled' className='options_label'>Day</option>
        {days.map(item => <option key={item} value={item}>{item}</option>)}
      </select>
    )
  }

  renderMonths() {
    const {monthValue} = this.props;
    return (
      <select onChange={this.props.onChange} name='dobMonth' value={monthValue}>
        <option value='' disabled='disabled' className='options_label'>Month</option>
        {['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'].map((item, index) =>
          <option key={index} value={index + 1}>{item}</option>
        )}
      </select>
    );
  }

  renderYears() {
    const {yearValue} = this.props;
    let years = [];
    let date = new Date();
    for (let iter = date.getUTCFullYear() - 1; iter > 1947; iter--) years.push(iter);
    return (
      <select onChange={this.props.onChange} name='dobYear' value={yearValue}>
        <option value='' disabled='disabled' className='options_label'>Year</option>
        {years.map(item => <option key={item} value={item}>{item}</option>)}
      </select>
    );
  }

  render() {
    const {label} = this.props;
    return (
      <div className='dob_input'>
        {label !== '' && <label>{label}</label>}
        <div className='inputs'>
          <div className='item'>
            <span className='lnr-chevron-down dropdown_icon'/>
            {this.renderDays()}
          </div>
          <div className='item'>
            <span className='lnr-chevron-down dropdown_icon'/>
            {this.renderMonths()}
          </div>
          <div className='item'>
            <span className='lnr-chevron-down dropdown_icon'/>
            {this.renderYears()}
          </div>
        </div>
      </div>
    )
  }
}

DOB.propTypes = {
  label: PropTypes.string,
  dayValue: PropTypes.string,
  monthValue: PropTypes.string,
  yearValue: PropTypes.string
};

DOB.defaultProps = {
  label: '',
  dayValue: '',
  monthValue: '',
  yearValue: ''
};

export default DOB;
