function Input({ label, ...props }) {
  return (
    <div style={{ marginBottom: '12px' }}>
      <label>{label}</label>
      <input
        {...props}
        style={{
          width: '100%',
          padding: '10px',
          marginTop: '5px',
          border: '1px solid #ccc',
          borderRadius: '6px',
        }}
      />
    </div>
  )
}

export default Input
