import { Box } from "@chakra-ui/react";

type ScreenProps = {
  displayedValue: number | string
}

export const Screen = ({displayedValue}: ScreenProps) => {
	return (
		<Box fontSize='50px' width='350px' border='solid black 2px' textAlign="right" borderRadius="10px">
			{displayedValue ?? 0}
		</Box>
	);
};
