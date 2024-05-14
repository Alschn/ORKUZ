import {ComponentPropsWithoutRef, Ref, forwardRef} from "react"
import {cn} from "~/lib/utils";
import {useTheme} from "next-themes";

type HtmlInputProps = ComponentPropsWithoutRef<'input'>

interface InputProps extends HtmlInputProps {
  label: string;
  error?: string;
}

export const Field = forwardRef<HTMLInputElement, InputProps>( function Field({error, label, ...props}: InputProps, ref) {
  return (<div className={cn('flex', 'flex-col', 'gap-1')}>
    <label htmlFor={props.id} className={cn('p-1')}>{`${label}:`}</label>
    <input {...props} ref={ref} className={cn('rounded-md', 'p-2', 'border')}/>
    {error && <span className={cn('dark:text-red-400','text-red-500', 'text-xs', 'py-2', 'px-1')}>{error}</span>}
  </div>);
})
