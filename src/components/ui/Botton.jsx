function Button({ children, ...props }) {
  return (
    <button
      {...props}
      style={{
        padding: '10px 20px',
        background: '#111',
        color: 'white',
        border: 'none',
        borderRadius: '6px',
        cursor: 'pointer',
      }}
    >
      {children}
    </button>
  )
}

export default Button
