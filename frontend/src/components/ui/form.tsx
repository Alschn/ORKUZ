import React, {
  type ComponentPropsWithoutRef,
  type FormEventHandler,
  type ReactNode,
} from "react";
import { Button } from "~/components/ui/button";

type HtmlFormProps = ComponentPropsWithoutRef<"form">;

interface FormProps extends HtmlFormProps {
  fields: ReactNode;
  submitButtonLabel?: string;
  onSubmit: () => void;
}

export default function Form({
  onSubmit,
  fields,
  submitButtonLabel,
  ...props
}: FormProps) {
  const handleSubmit: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    onSubmit();
  };
  return (
    <div className={"w-1/3 rounded-md border p-3"}>
      <form onSubmit={handleSubmit} {...props}>
        {fields}
        <div className={"p-3 text-center"}>
          <Button className={"w-1/2"}>{submitButtonLabel ?? "Submit"}</Button>
        </div>
      </form>
    </div>
  );
}
