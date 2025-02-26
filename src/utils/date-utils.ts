export const formatTimestamp = (timestamp: string) => {
    // Convert string timestamp to milliseconds
    const date = new Date(parseFloat(timestamp) * 1000);
    
    return date.toLocaleString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: true
    });
  };