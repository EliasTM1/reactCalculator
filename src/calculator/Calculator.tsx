import { Stack } from "@chakra-ui/react";
import { Screen } from "./Screen";
import { Keypad } from "./Keypad";
import { useState } from "react";
import { NonNumeric } from "./types";
import { Info } from "./Info";

export const Calculator = () => {
	const [displayedValue, setDisplayedValue] = useState<number>(0);
	const [accomulator, setAccomulator] = useState<number>(0);
	const [currentOperator, setCurrentOperator] = useState<NonNumeric | null>(
		null
	);

	const isAllClear =
		displayedValue === 0 && accomulator === 0 && !currentOperator;

	// * Clear the screen and memory:

	function clearAllMemory() {
		setDisplayedValue(0);
		setAccomulator(0);
		setCurrentOperator("");
	}

	function clearScreen() {
		setDisplayedValue(0);
	}

	// * Clear the screen and memory:

	// * Update the value on the screen
	function handleValueChange(value: number) {
		setDisplayedValue((previosState) => {
			const concatenated = Number(previosState.toString() + value.toString());
			// if (previosState === 0) return value;

			if (value === 0 && displayedValue !== 0) return concatenated;

			// if (currentOperator === "%" && accomulator !== 0) {
			// 	return previosState
			// }

			if (
				currentOperator === "/" ||
				currentOperator === "+" ||
				currentOperator === "*"
			) {
				return value;
			}

			return concatenated;
		});
	}

	// * Handle operator change
	function handleOperatorChange(operator: string) {
		if (operator !== "+/-") setCurrentOperator(operator as NonNumeric);

		setAccomulator((previosState) => {
			let product = 0;
			switch (operator) {
				case "+":
					if (previosState === 0) return displayedValue;
					else {
						setDisplayedValue(displayedValue + accomulator);
						return displayedValue + accomulator;
					}
				case "-":
					if (previosState === 0) return displayedValue;
					return (product = previosState - displayedValue);
				case "*":
					if (accomulator === 0) return displayedValue;
					else {
						setDisplayedValue(displayedValue * accomulator);
						return displayedValue * accomulator;
					}
				case "/":
					if (accomulator === 0) return displayedValue;
					else {
						setDisplayedValue(accomulator / displayedValue);
						return accomulator / displayedValue;
					}
				case "+/-":
					setDisplayedValue(displayedValue * -1);
					return previosState;
				case "%":
					setDisplayedValue(displayedValue / 100);
					setCurrentOperator("%")
					return previosState;
				default:
					break;
			}
			return product;
		});
		setDisplayedValue(0);
	}

	// * Calculate product
	function calcProduct() {
		switch (currentOperator) {
			case "+":
				setDisplayedValue(accomulator + displayedValue);
				setAccomulator(0);
				break;
			case "-":
				setDisplayedValue(accomulator - displayedValue);
				setAccomulator(0);
				break;
			case "*":
				setDisplayedValue(accomulator * displayedValue);
				setAccomulator(0);
				break;
			case "/":
				setDisplayedValue(accomulator / displayedValue);
				setAccomulator(0);
				break;
			case "%":
				setDisplayedValue(accomulator * displayedValue);
				setAccomulator(0);
				break;

			default:
				break;
		}
	}

	return (
		<Stack
			backgroundColor='calc.60'
			height='100vh'
			justifyContent='center'
			alignItems='center'
		>
			<Info
				currentAccomulator={accomulator}
				currentOperator={currentOperator}
			/>
			<Screen displayedValue={displayedValue} />
			<Keypad
				isAllClear={isAllClear}
				onClearAll={clearAllMemory}
				onClearScreen={clearScreen}
				onValueChanged={handleValueChange}
				onOperatorChange={handleOperatorChange}
				onEqual={calcProduct}
			/>
		</Stack>
	);
};
