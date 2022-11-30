// Types -----------------------------------------------------------------------
import { Fragment } from 'react';


interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

// Component -------------------------------------------------------------------

export function Input(props: InputProps): JSX.Element {
  return (
    <div className='w-full relative h-24'>
      <Label {...props} />
      <input
        {...props}
        className={getInputClassName(props)}
      />
      <Error {...props} />
    </div>
  );
}

// Sub-components --------------------------------------------------------------

function Label(props: InputProps): JSX.Element {
  if (!props.label) return <Fragment />;
  return (
    <label
      id={props.id}
      className="block mb-1 text-sm font-medium capitalize-first text-gray-400"
    >
      {props.label}
    </label>
  );
}

function Error(props: InputProps): JSX.Element {
  if (!props.error) return <Fragment />;
  return (
    <p className="absolute text-red-500 text-xs mt-1 capitalize-first">{props.error}.</p>
  );
}

// Helpers ---------------------------------------------------------------------

function getInputClassName(props: InputProps): string {
  const classes = [
    'bg-gray-900 text-gray-400 text-sm',
    'border-2 rounded-lg focus:border-gray-500',
    'block w-full p-2.5',
  ];
  classes.push(props.error ? 'border-red-500' : 'border-gray-900');
  return classes.join(' ');
}