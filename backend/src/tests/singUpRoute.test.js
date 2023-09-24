// Importe as dependências necessárias para seus testes
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { v4 as uuid } from "uuid";
import { signUp } from "../routes/singUpRoute"; // Substitua por import correto

// Simule as dependências externas, como a função de envio de email
jest.mock("../utils/sendEmail", () => ({
  sendEmail: jest.fn(),
}));

// Mock para simular o banco de dados
const mockDb = {
  collection: jest.fn().mockReturnThis(),
  findOne: jest.fn(),
  insertOne: jest.fn(),
};

jest.mock("../database/db", () => ({
  getDbConnection: jest.fn(() => mockDb),
}));

// Mock para simular o objeto "res" do Express
const mockRes = {
  status: jest.fn(() => mockRes),
  sendStatus: jest.fn(),
  json: jest.fn(),
};

// Mock para simular o objeto "req" do Express
const mockReq = {
  body: {
    email: "test@example.com",
    password: "password123",
    phone: "1234567890",
    userName: "testuser",
  },
};

describe("signUp", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should return status code 409 if user already exists", async () => {
    mockDb.findOne.mockResolvedValue({ email: "test@example.com" });

    await signUp.handler(mockReq, mockRes);

    expect(mockRes.sendStatus).toHaveBeenCalledWith(409);
  });

  it("should create a new user and return a JWT token if user does not exist", async () => {
    mockDb.findOne.mockResolvedValue(null);
    mockDb.insertOne.mockResolvedValue({ insertedId: "123" });
    jwt.sign.mockImplementationOnce((_, __, ___, callback) => {
      callback(null, "jwt-token");
    });

    await signUp.handler(mockReq, mockRes);

    expect(mockDb.insertOne).toHaveBeenCalledWith({
      email: "test@example.com",
      phone: "1234567890",
      userName: "testuser",
      passwordHash: expect.any(String), // You can't exactly match the hash, so just check if it's a string
      salt: expect.any(String),
      info: { orders: [] },
      isVerified: false,
      verificationString: expect.any(String),
    });

    expect(mockRes.status).toHaveBeenCalledWith(200);
    expect(mockRes.json).toHaveBeenCalledWith({ token: "jwt-token" });
  });

  it("should return status code 500 if there's an error sending the verification email", async () => {
    mockDb.findOne.mockResolvedValue(null);
    mockDb.insertOne.mockResolvedValue({ insertedId: "123" });
    jwt.sign.mockImplementationOnce((_, __, ___, callback) => {
      callback(null, "jwt-token");
    });
    const sendEmailMock = jest.fn(() => {
      throw new Error("Email send error");
    });
    require("../utils/sendEmail").sendEmail = sendEmailMock;

    await signUp.handler(mockReq, mockRes);

    expect(mockRes.sendStatus).toHaveBeenCalledWith(500);
  });
});
