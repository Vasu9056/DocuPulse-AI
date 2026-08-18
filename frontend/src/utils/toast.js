export const showToast = (message, type = 'info') => {
  // Mock toast utility
  console.log(`[Toast] ${type.toUpperCase()}: ${message}`);
  // If the app has a real toast library like react-hot-toast, it can be integrated here
};
