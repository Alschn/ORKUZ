import { type ComponentPropsWithoutRef, forwardRef } from "react";

type HtmlInputProps = ComponentPropsWithoutRef<"input">;

interface InputProps extends HtmlInputProps {
  label: string;
  error?: string;
}

export const Field = forwardRef<HTMLInputElement, InputProps>(function Field(
  { error, label, ...props }: InputProps,
  ref,
) {
  return (
    <div className={"flex flex-col gap-1"}>
      <label htmlFor={props.id} className={"p-1"}>{`${label}:`}</label>
      <input {...props} ref={ref} className={"rounded-md border p-2"} />
      {error && (
        <span className={"px-1 py-2 text-xs text-red-500 dark:text-red-400"}>
          {error}
        </span>
      )}
    </div>
  );
});

Field.displayName = "Field";
