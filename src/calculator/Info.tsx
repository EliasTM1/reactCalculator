import { Heading, Stack } from "@chakra-ui/react";
import { NonNumeric } from "./types";

type InfoProps = {
	currentAccomulator: number;
	currentOperator: NonNumeric | null;
};

export const Info = ({ currentOperator, currentAccomulator }: InfoProps) => {
	return (
		<Stack pb='3rem' border='1px solid black' paddingInline='5rem' borderRadius="10">
			<Heading>Memory: {currentAccomulator}</Heading>
			<Heading>Operator: {currentOperator}</Heading>
		</Stack>
	);
};
