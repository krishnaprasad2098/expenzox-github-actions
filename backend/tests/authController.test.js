const authController = require('../controllers/authController');
const User = require('../models/User');
const jwt = require('jsonwebtoken');

// Mock User model and jwt
jest.mock('../models/User');
jest.mock('jsonwebtoken');

describe('Auth Controller', () => {
  let req;
  let res;

  beforeEach(() => {
    req = {
      body: {},
      user: { id: 'user-id-123' },
    };

    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    jest.clearAllMocks();
  });

  // =========================
  // registerUser
  // =========================
  describe('registerUser', () => {
    it('should return 400 if required fields are missing', async () => {
      req.body = { fullName: '', email: '', password: '' };

      await authController.registerUser(req, res);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({ message: 'All fields are required' });
    });

    it('should return 400 if email already exists', async () => {
      req.body = { fullName: 'Test User', email: 'test@example.com', password: 'password' };
      User.findOne.mockResolvedValue(true); // simulate existing user

      await authController.registerUser(req, res);

      expect(User.findOne).toHaveBeenCalledWith({ email: 'test@example.com' });
      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({ message: 'Email already in use' });
    });

    it('should create user and return 201 with token', async () => {
      req.body = {
        fullName: 'Test User',
        email: 'test@example.com',
        password: 'password',
        profileImageUrl: 'url',
      };

      const mockUser = { _id: 'user-id', fullName: 'Test User' };

      User.findOne.mockResolvedValue(null); // no existing user
      User.create.mockResolvedValue(mockUser);
      jwt.sign.mockReturnValue('mockToken123');

      await authController.registerUser(req, res);

      expect(User.create).toHaveBeenCalledWith({
        fullName: 'Test User',
        email: 'test@example.com',
        password: 'password',
        profileImageUrl: 'url',
      });

      expect(res.status).toHaveBeenCalledWith(201);
      expect(res.json).toHaveBeenCalledWith({
        id: mockUser._id,
        user: mockUser,
        token: 'mockToken123',
      });
    });

    it('should return 500 on error', async () => {
      req.body = { fullName: 'Test', email: 'test@example.com', password: 'pass' };
      User.findOne.mockRejectedValue(new Error('DB error'));

      await authController.registerUser(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith(expect.objectContaining({
        message: 'Error registering user',
        error: 'DB error',
      }));
    });
  });

  // =========================
  // loginUser
  // =========================
  describe('loginUser', () => {
    it('should return 400 if required fields are missing', async () => {
      req.body = { email: '', password: '' };

      await authController.loginUser(req, res);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({ message: 'All fields are required' });
    });

    it('should return 400 if user not found or password invalid', async () => {
      req.body = { email: 'test@example.com', password: 'wrongpass' };

      const mockUser = {
        comparePassword: jest.fn().mockResolvedValue(false),
      };

      User.findOne.mockResolvedValue(mockUser);

      await authController.loginUser(req, res);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({ message: 'Invalid Credentials' });
    });

    it('should return 200 with token on successful login', async () => {
      const mockUser = {
        _id: 'user-id',
        comparePassword: jest.fn().mockResolvedValue(true),
      };

      req.body = { email: 'test@example.com', password: 'correctpass' };
      User.findOne.mockResolvedValue(mockUser);
      jwt.sign.mockReturnValue('mockToken123');

      await authController.loginUser(req, res);

      expect(mockUser.comparePassword).toHaveBeenCalledWith('correctpass');
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({
        id: mockUser._id,
        user: mockUser,
        token: 'mockToken123',
      });
    });

    it('should return 500 on error', async () => {
      req.body = { email: 'test@example.com', password: 'pass' };
      User.findOne.mockRejectedValue(new Error('DB error'));

      await authController.loginUser(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith(expect.objectContaining({
        message: 'Error registering user',
        error: 'DB error',
      }));
    });
  });

  // =========================
  // getUserInfo
  // =========================
  describe('getUserInfo', () => {
    it('should return 404 if user not found', async () => {
      User.findById.mockReturnValue({
        select: jest.fn().mockResolvedValue(null),
      });

      await authController.getUserInfo(req, res);

      expect(User.findById).toHaveBeenCalledWith('user-id-123');
      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({ message: 'User not found' });
    });

    it('should return 200 with user info', async () => {
      const mockUser = { _id: 'user-id-123', fullName: 'Test User' };

      User.findById.mockReturnValue({
        select: jest.fn().mockResolvedValue(mockUser),
      });

      await authController.getUserInfo(req, res);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith(mockUser);
    });

    it('should return 500 on error', async () => {
      User.findById.mockReturnValue({
        select: jest.fn().mockRejectedValue(new Error('DB error')),
      });

      await authController.getUserInfo(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith(expect.objectContaining({
        message: 'Error registering user',
        error: 'DB error',
      }));
    });
  });
});
