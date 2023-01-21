export class UnauthorizedError extends Error {
  constructor(message) {
    super(message || 'Please enter an email address');
    this.statusCode = 401;
  } 
}