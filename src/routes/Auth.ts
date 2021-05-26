import { Request, Response } from "express";
import { admin, auth } from "@firebase";

interface LoginBody {
  email?: string;
  password?: string;
}

/**
 * @openapi
 * /auth/login:
 *   post:
 *     summary: Login an user to the app.
 *     requestBody:
 *           required: true
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   email:
 *                     type: string
 *                     description: User's email.
 *                     example: jon.doe@email.com
 *                   password:
 *                     type: string
 *                     description: User's password.
 *                     example: 12345678
 *     responses:
 *       200:
 *         description: Authenticates the existant user and returns an authentication token.
 *         content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  token:
 *                    type: string
 *                    description: User's authentication token.
 *                    example: 3db45d22d6ce4a--70c6e7a6fe183f4bdc13db45d2
 *       400:
 *          description: Error when trying to login the user.
 *          content:
 *               application/json:
 *                 schema:
 *                   type: object
 *                   properties:
 *                     error:
 *                       type: string
 *                       description: error message.
 *                       example: Mail or Password (or both) are missing.
 *       500:
 *          description: Server error at login.
 *          content:
 *               application/json:
 *                 schema:
 *                   type: object
 *                   properties:
 *                     error:
 *                       type: string
 *                       description: error message.
 *                       example: Server error at login, couldn't generate token. Try again..

 */
export const login = async (req: Request, res: Response) => {
  const body = (req.body || {}) as LoginBody;
  const { email, password } = body;

  if (!email || !password) {
    res.status(400).send({
      error: "Mail or Password (or both) are missing.",
    });

    return;
  }

  try {
    const { user } = await auth.signInWithEmailAndPassword(email, password);

    const token = await user?.getIdToken();

    if (!token) {
      res.status(500).send({
        error: "Server error at login, couldn't generate token. Try again.",
      });
      return;
    }

    res.status(200).send({
      token,
    });
  } catch (err) {
    const { code, message } = err;

    if (code === "auth/wrong-password") {
      res.status(400).send({
        error: "Bad credentials.",
        payload: {
          code,
          message,
        },
      });
      return;
    }

    if (code === "auth/user-not-found") {
      res.status(400).send({
        error: "Non-existent user.",
        payload: {
          code,
          message,
        },
      });
      return;
    }

    res.status(400).send({
      error: "There was an error when trying to login.",
      payload: {
        code,
        message,
      },
    });
    return;
  }
};

/**
 * @openapi
 * /auth/create:
 *   post:
 *     summary: Creates a new user.
 *     requestBody:
 *           required: true
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   email:
 *                     type: string
 *                     description: User's email.
 *                     example: jon.doe@email.com
 *                   password:
 *                     type: string
 *                     description: User's password.
 *                     example: 12345678
 *     responses:
 *       200:
 *         description: Creates a user and returns an authentication token.
 *         content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  token:
 *                    type: string
 *                    description: User's authentication token.
 *                    example: 3db45d22d6ce4a--70c6e7a6fe183f4bdc13db45d2
 *       400:
 *          description: Mail or password are missing or a Firebase error.
 *          content:
 *               application/json:
 *                 schema:
 *                   type: object
 *                   properties:
 *                     error:
 *                       type: string
 *                       description: error message.
 *                       example: Mail or Password (or both) are missing.
 *       500:
 *          description: Server error at creation.
 *          content:
 *               application/json:
 *                 schema:
 *                   type: object
 *                   properties:
 *                     error:
 *                       type: string
 *                       description: error message.
 *                       example: Server error at creation, couldn't create user. Try again.
 */
export const create = async (req: Request, res: Response) => {
  const body = (req.body || {}) as LoginBody;
  const { email, password } = body;

  if (!email || !password) {
    res.status(400).send({
      error: "Mail or Password (or both) are missing.",
    });

    return;
  }

  try {
    const { user } = await auth.createUserWithEmailAndPassword(email, password);

    const token = await user?.getIdToken();

    if (!token) {
      res.status(500).send({
        error: "Server error at creation, couldn't create user. Try again.",
      });
      return;
    }

    res.status(200).send({
      token,
    });
  } catch (err) {
    const { code, message } = err;

    res.status(400).send({
      error: "There was an error when trying to create the user.",
      payload: {
        code,
        message,
      },
    });
  }
};

/**
 * @openapi
 * /auth/logout:
 *   get:
 *     summary: logout an user to the app.
 *     responses:
 *       200:
 *         description: User logged out succesfully.
 *         content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  message:
 *                    type: string
 *                    description: Success message.
 *                    example: Logged out succesfully.
 *       400:
 *          description: Error when trying to logout the user.
 *          content:
 *               application/json:
 *                 schema:
 *                   type: object
 *                   properties:
 *                     error:
 *                       type: string
 *                       description: error message.
 *                       example: There was an error loging out the user.
 *                     code:
 *                       type: string
 *                       description: error code.

 */
export const logout = async (req: Request, res: Response) => {
  try {
    await admin.auth().revokeRefreshTokens(res.locals.user.uid);

    res.status(200).send({
      message: "Logged out succesfully.",
    });
  } catch (err) {
    const { code, message } = err;

    res.status(400).send({
      error: "There was an error loging out the user.",
      payload: {
        code,
        message,
      },
    });
  }
};
