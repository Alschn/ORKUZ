import {ComponentPropsWithoutRef, Ref, forwardRef} from "react"
import {cn} from "~/lib/utils";

type HtmlInputProps = ComponentPropsWithoutRef<'input'>

interface InputProps extends HtmlInputProps {
  label: string;
}

export const Field = forwardRef<HTMLInputElement, InputProps>( function Field({label, ...props}: InputProps, ref) {
  return (<div className={cn('flex', 'flex-col', 'gap-1')}>
    <label htmlFor={props.id} className={cn('p-1')}>{`${label}:`}</label>
    <input {...props} ref={ref} className={cn('rounded-md', 'p-2')}/>
  </div>);
})
