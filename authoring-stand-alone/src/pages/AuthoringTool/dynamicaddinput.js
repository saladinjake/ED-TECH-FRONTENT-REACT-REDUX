class DynamicForm extends React.Component {
  constructor() {
    super();
    this.state = {
      shareholders: [{ name: "" }],
    };
  }

  handleShareholderNameChange = (idx) => (evt) => {
    const newShareholders = this.state.shareholders.map((shareholder, sidx) => {
      if (idx !== sidx) return shareholder;
      return { ...shareholder, name: evt.target.value };
    });

    this.setState({ shareholders: newShareholders });
  };

  handleAddShareholder = () => {
    this.setState({
      shareholders: this.state.shareholders.concat([{ name: "" }]),
    });
  };

  handleRemoveShareholder = (idx) => () => {
    this.setState({
      shareholders: this.state.shareholders.filter((s, sidx) => idx !== sidx),
    });
  };

  render() {
    return (
      <div className="row">
        <div className="col-md-12">
          <h6>{this.props.title}</h6>

          {this.state.shareholders.map((shareholder, idx) => (
            <div className="shareholder form-group ">
              <div className="col-md-10 fl-left">
                <input
                  type="text"
                  placeholder={` #${idx + 1} Enter an instructors email`}
                  value={shareholder.name}
                  onChange={this.handleShareholderNameChange(idx)}
                  className="form-control fl-left"
                />
              </div>
              {/*<div class="col-md-2">
            <button
              type="button"
              onClick={this.handleRemoveShareholder(idx)}
              className="small text-white"
            >
              -
            </button>
            </div>*/}

              <br />
              <br />
            </div>
          ))}
          <br />
          <button
            type="button"
            onClick={this.handleAddShareholder}
            className="btn btn-primary text-white"
            style={{ width: "300px", margin: "10px" }}
          >
            Add A Team
          </button>
        </div>

        <br />
        <br />
      </div>
    );
  }
}
