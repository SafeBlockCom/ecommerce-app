export default function ALink({
  children,
  className,
  tabindex,
  target,
  style,
  ...props
}) {
  function defaultFunction(e) {
    e.preventDefault();
    // navigateTo(props.href, undefined, { shallow: true });
  }

  return (
    <a
      className={className}
      style={style}
      onClick={defaultFunction}
      tabIndex={tabindex}
      target={target}
    >
      {children}
    </a>
  );
}
