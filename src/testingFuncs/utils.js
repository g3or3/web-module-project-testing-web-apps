import userEvent from "@testing-library/user-event";

const checkIfInDocument = (lookUpBy, ...rest) => {
	for (const idx in rest) {
		expect(lookUpBy(rest[idx])).toBeInTheDocument();
	}
};

const typeInput = (lookUpBy, ...rest) => {
	rest.forEach((elem, idx) => {
		if (idx % 2 === 0) userEvent.type(lookUpBy(elem), rest[idx + 1]);
	});
};

const clickOnElem = (lookUpBy, elem) => {
	lookUpBy(elem).click();
};

export { checkIfInDocument, typeInput, clickOnElem };
