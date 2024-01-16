import { Box, Button, Flex, Grid, GridItem, HStack } from "@chakra-ui/react";
import { NonNumeric } from "./types";
import { operators } from "./calButtons";

type KeypadProps = {
	isAllClear: boolean;
	onValueChanged: (qty: number) => void;
	onOperatorChange: (operator: NonNumeric) => void;
	onEqual: () => void;
	onClearAll: () => void;
	onClearScreen: () => void;
};

export const Keypad = ({
	onEqual,
	onValueChanged,
	onOperatorChange,
	onClearAll,
	isAllClear,
}: KeypadProps) => {
	const numericNumber = Array.from(
		{ length: 10 },
		(_, index) => index
	).reverse();

	return (
		<Grid
			templateAreas={`"btnGp1 btnGp1"
							"numeric btnGp2"`}
			gridTemplateRows={"1fr"}
			gridTemplateColumns={"200px"}
		>
			<Box> All clear === {isAllClear ? "yes" : "no"}</Box>
			<GridItem area='btnGp1'>
				<HStack justifyContent='space-between'>
					{operators.map((operator) => {
						return (
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
								_hover={{
									backgroundColor: "calc.50",
									color: "calc.10"
								}}
							>
								{operator}
							</Button>
						);
					})}
					<Button
						backgroundColor={isAllClear ? "calc.100" : "calc.110"}
						color='calc.50'
						// TODO: include clear screen
						onClick={onClearAll}
						_hover={{
							backgroundColor: "calc.50",
							color: "calc.100"
						}}
					>
						{isAllClear ? "AC" : "C"}
					</Button>
				</HStack>
			</GridItem>

			<GridItem gridArea='numeric' mt='10px'>
				<HStack
					flexWrap='wrap'
					flexDir='row-reverse'
					justifyContent='space-between'
				>
					{numericNumber.map((numButton) => (
						<Button
							width={numButton === 0 ? "100%" : "30%"}
							value={numButton}
							key={numButton}
							py='22px'
							onClick={(e) =>
								onValueChanged(Number((e.target as HTMLButtonElement).value))
							}
						>
							{numButton}
						</Button>
					))}
				</HStack>
			</GridItem>

			<GridItem gridArea='btnGp2'>
				<Flex justifyContent='center' alignContent='center'>
					<Button
						backgroundColor='calc.90'
						mt='10px'
						width='80%'
						color='calc.50'
						height='200'
						fontSize='2rem'
						onClick={onEqual}
						_hover={{
							backgroundColor: "calc.80",
							color: "calc.90"
						}}
					>
						=
					</Button>
				</Flex>
			</GridItem>
		</Grid>
	);
};
