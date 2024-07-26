/* eslint-disable @typescript-eslint/no-unused-vars */
namespace API {
  interface LoginRequest {
    username: string;
    password: string;
  }

  interface LoginResponse {
    token: string;
  }
}
