// Button.jsx
import { Link } from 'react-router';

function Button({
  label,
  handleOnClick,
  customCss,
  icon = null,
  iconPosition,
  to, // new prop to support navigation
  disabled = false,
  ref
}) {
  const commonClasses = `${customCss} px-4 py-2.5 text-center flex items-center justify-center gap-2 ${
    disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'
  }`;

  const content = (
    <>
      {icon && iconPosition === 'left' && <span>{icon}</span>}
      {label && <span>{label}</span>}
      {icon && iconPosition === 'right' && <span>{icon}</span>}
    </>
  );

  if (to) {
    // If 'to' is provided, render a <Link>
    return (
      <Link to={to} className={commonClasses}>
        {content}
      </Link>
    );
  }

  // Otherwise, render a standard <button>
  return (
    <button ref={ref} className={commonClasses} onClick={handleOnClick}>
      {content}
    </button>
  );
}

export default Button;
