import React, { Component } from 'react';
import styles from './Select.module.scss';

type State = { value: any };
type Props = {
  options: any[];
  onChange: (any) => void;
};

export class Select extends Component<Props, State> {
  constructor(props) {
    super(props);
    this.state = { value: props.options[0] };
    this.onChange = this.onChange.bind(this);
  }

  onChange(event) {
    const { value } = event.target;
    this.props.onChange(value);
    this.setState({ value });
  }

  render(): React.ReactElement {
    return (
      <div className={styles['select']}>
        <div>{this.state.value} Items</div>
        <select className={styles['select-input']} onChange={this.onChange}>
          {this.props.options.map((v) => (
            <option value={v} key={`opt=${v}`}>
              {v} Items
            </option>
          ))}
        </select>
      </div>
    );
  }
}

export default Select;
