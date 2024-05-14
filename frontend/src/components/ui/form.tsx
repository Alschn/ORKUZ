import React, {ComponentPropsWithoutRef, FormEventHandler, ReactNode} from "react";
import {Field} from "~/components/ui/field";
import {cn} from "~/lib/utils";
import {Button} from "~/components/ui/button";

type HtmlFormProps = ComponentPropsWithoutRef<'form'>

interface FormProps extends HtmlFormProps {
  fields: ReactNode;
  submitButtonLabel?: string;
  onSubmit: () => void;
}

export default function Form({onSubmit, fields, submitButtonLabel, ...props}: FormProps) {
  const handleSubmit: FormEventHandler<HTMLFormElement> = e => {
    e.preventDefault();
    onSubmit();
  }
  return (
    <div className={cn('border', 'rounded-md', 'w-1/3', 'p-3')}>
      <form onSubmit={handleSubmit} {...props}>
        {fields}
        <div className={cn('text-center', 'p-3')}>
          <Button className={cn('w-1/2')}>{submitButtonLabel ?? 'Submit'}</Button>
        </div>
      </form>
    </div>
  )
}
