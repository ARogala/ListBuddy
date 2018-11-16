import React from 'react';
import PropTypes from 'prop-types';

class ListTypeForm extends React.Component {
	constructor(props) {
		super(props);
		this.state={
			template: 'To Do'
		};
	}

	handleTemplateChange(e) {
		this.setState({template: e.target.value});
	}

	handleSubmit(e) {
		e.preventDefault();
		this.props.updateTemplate(this.state.template);
		this.resetForm();
	}

	resetForm() {
		this.setState({
			template: 'To Do'
		});
	}

	render() {

		return (
			<form className="listTypeForm" onSubmit={(e) => this.handleSubmit(e)}>
				<fieldset>
					<legend>Select A List Template</legend>
					<div>
						<label htmlFor="template">List Templates:</label>
						<select className="listTypeForm__select" id="template" value={this.state.template} onChange={(e)=> this.handleTemplateChange(e)}>
							<option value="To Do">To Do</option>
							<option value="Grocery">Grocery</option>
							<option value="Travel">Travel</option>
						</select>
					</div>
					<div className="listTypeForm__btnContainer">
						<button
							type="submit"
							value="Submit"
							className="listTypeForm__btn"
						>
							Use Template
						</button>
						<button
							type="button"
							value="Reset"
							className="listTypeForm__btn"
							onClick={() => this.resetForm()}
						>
							Cancel
						</button>
					</div>
				</fieldset>
			</form>
		);
	}
}

export default ListTypeForm;

ListTypeForm.propTypes = {
  updateTemplate: PropTypes.func.isRequired,

}