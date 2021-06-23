import React from 'react';

const Rank = ({userName,userEntries}) => {
	return (
		<div className="white">
			<div className="f3">
				{`Hello ${userName}, your current image count is...`}
			</div>
			<div className="f1">
				{userEntries}
			</div>
		</div>
	);
}
export default Rank;