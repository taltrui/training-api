import { Request, Response } from "express";
import { admin, auth } from "@firebase";

interface LoginBody {
  email?: string;
  password?: string;
}

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

export const logout = async (req: Request, res: Response) => {
  try {
    await admin.auth().revokeRefreshTokens(res.locals.user.uid);

    res.status(200).send({
      message: "Loged out succesfully.",
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
