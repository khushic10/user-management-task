import { Input, Label } from "semantic-ui-react";
import { Controller, Control, FieldValues, Path } from "react-hook-form";

type Props<T extends FieldValues> = {
	name: Path<T>;
	control: Control<T>;
	placeholder?: string;
	onClear?: () => void;
};

export default function SearchInput<T extends FieldValues>({
	name,
	control,
	placeholder,
	onClear,
}: Props<T>) {
	return (
		<Controller
			name={name}
			control={control}
			render={({ field, fieldState }) => (
				<>
					<Input
						fluid
						icon={
							field.value
								? {
										name: "close",
										link: true,
										onClick: () => {
											field.onChange("");
											field.onBlur();
											onClear?.();
										},
								  }
								: "search"
						}
						iconPosition="left"
						placeholder={placeholder || "Search..."}
						value={field.value ?? ""}
						onChange={(_, data) => field.onChange(data.value)}
						onBlur={field.onBlur}
						error={!!fieldState.error} // shows red border if invalid
					/>
					{fieldState.error && (
						<Label basic color="red" pointing>
							{fieldState.error.message}
						</Label>
					)}
				</>
			)}
		/>
	);
}
