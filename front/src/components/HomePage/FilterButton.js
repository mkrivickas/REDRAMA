import React from 'react';

function FilterButton() {
	return (
		<div>
			<select value={props.selected} onChange={dropdownChangeHandler}>
				<option value="1">sausis</option>
				<option value="2">vasaris</option>
				<option value="3">kovas</option>
				<option value="4">balandis</option>
			</select>
		</div>
	);
}

export default FilterButton;
