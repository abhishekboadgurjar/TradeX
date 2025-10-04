class CustomAPIError extends Error {
  constructor(message) {
    super(message);
  }
}

export { CustomAPIError };
export default CustomAPIError;
