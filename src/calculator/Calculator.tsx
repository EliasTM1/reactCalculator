import { Stack } from "@chakra-ui/react";
import { Screen } from "./Screen";
import { Keypad } from "./Keypad";
import { useState } from "react";
import { NonNumeric } from "./types";

export const Calculator = () => {
	const [displayedValue, setDisplayedValue] = useState<number>(0);
	const [accomulator, setAccomulator] = useState<number>(0);
	const [currentOperator, setCurrentOperator] = useState<NonNumeric>();

	function handleValueChange(value: number) {
		setDisplayedValue((previosState) => {
			if (previosState === 0) return value;
			return previosState + value;
		});
	}

	function handleOperatorChange(operator: string) {
		setCurrentOperator(operator as NonNumeric);
		setAccomulator(displayedValue);
		setDisplayedValue(0);
	}

	function calcProduct() {
		console.log(accomulator, "accomulator");
		console.log(currentOperator, "currentOperator")
	}

	return (
		<Stack
			backgroundColor='calc.60'
			height='100vh'
			justifyContent='center'
			alignItems='center'
		>
			<Screen displayedValue={displayedValue} />
			<Keypad
				onValueChanged={handleValueChange}
				onOperatorChange={handleOperatorChange}
				onEqual={calcProduct}
			/>
		</Stack>
	);
};
