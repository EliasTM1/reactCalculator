import { Stack } from "@chakra-ui/react";
import { Screen } from "./Screen";
import { Keypad } from "./Keypad";
import { KeyboardEvent, useEffect, useRef, useState } from "react";
import { NonNumeric, isNonNumeric } from "./types";
import { Info } from "./Info";

export const Calculator = () => {
	const [displayedValue, setDisplayedValue] = useState<string>("0");
	const [accomulator, setAccomulator] = useState<number>(0);
	const [currentOperator, setCurrentOperator] = useState<NonNumeric | null>(
		null
	);
	const componentRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		componentRef.current?.focus();
	}, []);

	const isAllClear =
		displayedValue === "0" && accomulator === 0 && !currentOperator;

	// * Clear the screen and memory:

	function clearAllMemory() {
		setDisplayedValue("0");
		setAccomulator(0);
		setCurrentOperator("");
	}

	function clearScreen() {
		setDisplayedValue("0");
	}

	// * Update the value on the screen
	function handleValueChange(value: number) {
		setDisplayedValue((previosState) => {
			if (previosState.split("").includes(".")) return previosState + value;

			const concatenated = previosState.toString() + value.toString();
			if (previosState === "0") return value.toString();

			if (value === 0 && displayedValue !== "0") return concatenated;

			if (
				currentOperator === "/" ||
				currentOperator === "+" ||
				currentOperator === "*"
			) {
				return value.toString();
			}

			return concatenated;
		});
	}

	// * Handle operator change
	function handleOperatorChange(operator: string) {
		if (operator !== "+/-") setCurrentOperator(operator as NonNumeric);

		setAccomulator((previosState) => {
			let product = 0;
			const displayedAsNumber = Number(displayedValue);
			switch (operator) {
				case "+":
					// if (previosState === displayedAsNumber) return previosState
					if (previosState === 0) return displayedAsNumber;
					else {
						setDisplayedValue((displayedAsNumber + accomulator).toString());
						// return displayedAsNumber + accomulator;
						return displayedAsNumber + accomulator;
					}
				case "-":
					if (previosState === 0) return displayedAsNumber;
					return (product = previosState - displayedAsNumber);
				case "*":
					if (accomulator === 0) return displayedAsNumber;
					else {
						setDisplayedValue((displayedAsNumber * accomulator).toString());
						return displayedAsNumber * accomulator;
					}
				case "/":
					if (accomulator === 0) return displayedAsNumber;
					if (displayedValue === "0" && accomulator !== 0) return previosState;
					else {
						setDisplayedValue((accomulator / displayedAsNumber).toString());
						return accomulator / displayedAsNumber;
					}
				case "+/-":
					setDisplayedValue((displayedAsNumber * -1).toString());
					return previosState;
				case "%":
					setDisplayedValue((Number(displayedValue) / 100).toString());
					setCurrentOperator("%");
					return previosState;
				default:
					break;
			}
			return product;
		});
		setDisplayedValue("0");
	}

	function handleKeyDown(e: KeyboardEvent<HTMLDivElement>) {
		const pressedKey = e.key;
		console.log(pressedKey, "PRSSED");
		// *In case us an operator

		if (pressedKey === "=" || pressedKey === "Enter") {
			calcProduct();
			return;
		}

		if (isNonNumeric(pressedKey)) handleOperatorChange(pressedKey);

		if (!isNaN(Number(pressedKey))) handleValueChange(Number(pressedKey));
	}

	// * Calculate product
	function calcProduct() {
		switch (currentOperator) {
			case "+":
				setDisplayedValue((accomulator + Number(displayedValue)).toString());
				setAccomulator(0);
				break;
			case "-":
				setDisplayedValue((accomulator - Number(displayedValue)).toString());
				setAccomulator(0);
				break;
			case "*":
				setDisplayedValue((accomulator * Number(displayedValue)).toString());
				setAccomulator(0);
				break;
			case "/":
				setDisplayedValue((accomulator / Number(displayedValue)).toString());
				setAccomulator(0);
				break;
			case "%":
				setDisplayedValue((accomulator * Number(displayedValue)).toString());
				setAccomulator(0);
				break;

			default:
				break;
		}
	}

	function handleDecimalPoint() {
		setDisplayedValue((previousValue) => {
			const splitted = previousValue.split("");
			if (splitted.includes(".")) return previousValue;
			if (previousValue === "0") return previousValue;
			return previousValue + ".";
		});
	}

	return (
		<Stack
			backgroundColor='calc.60'
			height='100vh'
			justifyContent='center'
			alignItems='center'
			onKeyDown={(e) => handleKeyDown(e)}
			tabIndex={0}
			ref={componentRef}
			_focus={{
				border: "0px",
			}}
		>
			<Info
				currentAccomulator={accomulator}
				currentOperator={currentOperator}
			/>
			<Screen displayedValue={displayedValue} />
			<Keypad
				isAllClear={isAllClear}
				onDecimalPoint={handleDecimalPoint}
				onClearAll={clearAllMemory}
				onClearScreen={clearScreen}
				onValueChanged={handleValueChange}
				onOperatorChange={handleOperatorChange}
				onEqual={calcProduct}
			/>
		</Stack>
	);
};
