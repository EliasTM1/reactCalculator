export type NonNumeric =
	| "/"
	| "+"
	| "-"
	| "*"
	| "="
	| "%"
	| "+/-"
	| "AC"
	| ""
	| "C";

export type ScreenControl = "AC" | "" | "C";

export function isNonNumeric(value: string): value is NonNumeric {
	return ["/", "+", "-", "*", "=", "%", "+/-", "AC", "", "C"].includes(value);
}
