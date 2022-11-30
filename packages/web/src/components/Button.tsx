// Types -----------------------------------------------------------------------

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  label: string;
  theme: 'primary' | 'secondary';
}

// Component -------------------------------------------------------------------

export function Button(props: ButtonProps): JSX.Element {
  return (
    <button
      className={getButtonClassName(props)}
      {...props}
    >
      {props.label}
    </button>
  );
}

// Helpers ---------------------------------------------------------------------

function getButtonClassName(props: ButtonProps): string {
  const classes = [
    'text-sm font-semibold hover:opacity-95',
    'rounded-lg',
    'block w-full h-11 relative',
  ];

  if (props.theme === 'primary')
    classes.push('bg-primary-600 text-white');
  else if (props.theme === 'secondary')
    classes.push('bg-gray-600 text-white');

  return classes.join(' ');
}