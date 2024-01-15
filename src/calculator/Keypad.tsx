import {
	// Box,
	Button,
	Grid,
	// GridItem,
	HStack,
	Stack,
	VStack,
} from "@chakra-ui/react";
import { NonNumeric } from "./types";

type KeypadProps = {
	onValueChanged: (qty: number) => void;
	onOperatorChange: (operator: NonNumeric) => void;
	onEqual: () => void;
};

export const Keypad = ({ onValueChanged, onOperatorChange }: KeypadProps) => {
	const operators: NonNumeric[] = ["/", "+", "-", "*", "=", "%", "+/-", "AC"];
	const numericNumber = Array.from(
		{ length: 10 },
		(_, index) => index
	).reverse();

	function handleNumericUpdate(pressedNumber: number) {
		onValueChanged(pressedNumber);
	}

	return (
		<Grid
			templateAreas={`"screen screen"
		"btnGp1 btnGp2"
		"numeric btnGp2"`}
			gridTemplateRows={"50px 1fr 30px"}
			gridTemplateColumns={"150px 1fr"}
			h='200px'
			gap='1'
			color='blackAlpha.700'
			fontWeight='bold'
		>
			<HStack justifyContent='right'>
				{operators.map((operator, index) =>
					index > operators.length / 2 ? (
						<Button
							backgroundColor='calc.10'
							color='calc.50'
							value={operator}
							key={operator}
							onClick={(e) =>
								onOperatorChange(
									(e.target as HTMLButtonElement).value as NonNumeric
								)
							}
						>
							{operator}
						</Button>
					) : null
				)}
			</HStack>

			<Stack
				width='200px'
				flexWrap='wrap'
				position='relative'
				// justifyContent='center'
				alignContent='top'
				flexDir='row-reverse'
				// height='300px'
			>
				{numericNumber.map((numButton) => (
					<Button
						padding='1.5rem'
						width={numButton === 0 ? "93%" : ""}
						value={numButton}
						key={numButton}
						onClick={(e) =>
							handleNumericUpdate(Number((e.target as HTMLButtonElement).value))
						}
					>
						{numButton}
					</Button>
				))}
			</Stack>

			<VStack gap='1rem'>
				{operators.map((operator, index) =>
					index <= operators.length / 2 ? (
						<Button
							backgroundColor='calc.10'
							color='calc.50'
							key={index}
							value={operator}
							padding='1.4rem'
							onClick={(e) =>
								onOperatorChange(
									(e.target as HTMLButtonElement).value as NonNumeric
								)
							}
						>
							{operator}
						</Button>
					) : null
				)}
			</VStack>
		</Grid>
	);
};
