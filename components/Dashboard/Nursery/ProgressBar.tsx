const ProgressBar = (completed: {completed: number}) => {
  return (
    <div
      style={{
        height: 20,
        width: '100%',
        backgroundColor: '#e0e0de',
        borderRadius: 50,
        margin: 50,
      }}
    >
      <div
        style={{
          height: '100%',
          width: `${completed.completed}%`,
          backgroundColor: '#4ecca3',
          borderRadius: 'inherit',
          textAlign: 'center',
        }}
      >
        <span
          style={{
            padding: 5,
            color: 'white',
            fontWeight: 'bold',
          }}
        >
          {`${completed.completed}%`}
        </span>
      </div>
    </div>
  );
};

export default ProgressBar;
