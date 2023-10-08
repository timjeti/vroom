import React, { useState } from 'react';

function RefreshComponent() {
  const [count, setCount] = useState(0);

  const handleRefresh = () => {
    // Increment the count to trigger a re-render
    setCount(count + 1);
  };

  return (
    <div>
      <h1>Count: {count}</h1>
      <button onClick={handleRefresh}>Refresh</button>
    </div>
  );
}

export default RefreshComponent;
