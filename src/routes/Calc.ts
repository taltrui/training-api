import {
  createExp,
  deleteExpById,
  getAllExpsByUid,
  getExpById,
  updateExpById,
} from "../firestore/Calc";
import { Request, Response } from "express";

interface Expression {
  expression: string;
  id: string;
}

interface CreateExpsBody {
  expressions: Array<string>;
}

interface DeleteExpsBody {
  expressions: Array<string>;
}

/**
 * @openapi
 * /calc/expressions/{id}:
 *   get:
 *     summary: Retrieves an expression by id.
 *     responses:
 *       200:
 *         description: Expression retrieved succesfully.
 *         content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                    data:
 *                      type: object
 *                      properties:
 *                         expression:
 *                            type: string
 *                            description: The expression.
 *                            example: 12 + 55
 *                         id:
 *                            type: string
 *                            description: Expression id.
 *                            example: ADFSfkwplmnfsdWwH
 *       400:
 *          description: Expressions couldn't be updated.
 *          content:
 *               application/json:
 *                 schema:
 *                   type: object
 *                   properties:
 *                     error:
 *                       type: string
 *                       description: error message.
 *                     code:
 *                       type: string
 *                       description: error code
 */
export const getExpression = async (req: Request, res: Response) => {
  const expId = req.params.id;

  try {
    const data = await getExpById(expId);

    res.status(200).send({
      data,
    });
  } catch (err) {
    const { code, message } = err;

    res.status(400).send({
      error: "There was an error when trying to retrieve the expression.",
      payload: {
        code,
        message,
      },
    });
  }
};

/**
 * @openapi
 * /calc/expressions/{id}:
 *   put:
 *     summary: Update an expression by id.
 *     requestBody:
 *        required: true
 *        content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                  expression:
 *                    type: string
 *                    description: The new expression.
 *                    example: '65 + 21'
 *     responses:
 *       200:
 *         description: Expressions updated succesfully.
 *         content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                   message:
 *                    type: string
 *                    description: A succesfull message.
 *       400:
 *          description: Expressions couldn't be updated.
 *          content:
 *               application/json:
 *                 schema:
 *                   type: object
 *                   properties:
 *                     error:
 *                       type: string
 *                       description: error message.
 *                     code:
 *                       type: string
 *                       description: error code
 */
export const updateExpression = async (req: Request, res: Response) => {
  const body = (req.body || {}) as Expression;
  const expId = req.params.id;
  const { expression } = body;

  try {
    await updateExpById(expId, expression);

    res.status(200).send({
      message: `Expression ${expId} updated succesfully`,
    });
  } catch (err) {
    const { code, message } = err;

    res.status(400).send({
      error: "There was an error when trying to update the expression.",
      payload: {
        code,
        message,
      },
    });
  }
};

/**
 * @openapi
 * /calc/expressions:
 *   delete:
 *     summary: Delete one or more expressions by id.
 *     requestBody:
 *          required: true
 *          content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                    expressions:
 *                     type: array
 *                     description: An array of strings, each one is an id to delete.
 *                     example: ['ZlkfkwplmnwoRhQQH', 'ADFSfkwplmnfsdWwH']
 *     responses:
 *       200:
 *         description: Expressions deleted succesfully.
 *         content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                   message:
 *                    type: string
 *                    description: A succesfull message.
 *       400:
 *          description: Expressions couldn't be deleted.
 *          content:
 *               application/json:
 *                 schema:
 *                   type: object
 *                   properties:
 *                     error:
 *                       type: string
 *                       description: error message.
 *                     code:
 *                       type: string
 *                       description: error code
 */
export const deleteExpressions = async (req: Request, res: Response) => {
  const body = (req.body || {}) as DeleteExpsBody;
  const { expressions } = body;

  try {
    const createPromises = expressions.map((id) => deleteExpById(id));

    await Promise.all(createPromises);

    res.status(200).send({
      message: "Expressions deleted succesfully.",
    });
  } catch (err) {
    const { code, message } = err;

    res.status(400).send({
      error: "There was an error when trying to delete the expressions.",
      payload: {
        code,
        message,
      },
    });
  }
};

/**
 * @openapi
 * /calc/expressions:
 *   get:
 *     summary: Retrieve expressions for an user.
 *     responses:
 *       200:
 *         description: Expressions retrieved succesfully.
 *         content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  data:
 *                    type: object
 *                    properties:
 *                      expressions:
 *                        type: array
 *                        description: All the expressions retrieved.
 *                        example: [{expression: '12+3', id: 'ZlkfkwplmnwoRhQQH'}]
 *       400:
 *          description: Expressions couldn't be retrieved.
 *          content:
 *               application/json:
 *                 schema:
 *                   type: object
 *                   properties:
 *                     error:
 *                       type: string
 *                       description: error message.
 *                     code:
 *                       type: string
 *                       description: error code
 */
export const getAllExpressions = async (req: Request, res: Response) => {
  const { uid } = res.locals.user;
  try {
    const { data } = await getAllExpsByUid(uid);

    res.status(200).send({
      data,
    });
  } catch (err) {
    const { code, message } = err;

    res.status(400).send({
      error: "There was an error when trying to retrieve the expressions.",
      payload: {
        code,
        message,
      },
    });
  }
};

/**
 * @openapi
 * /calc/expressions:
 *   post:
 *     summary: Creates new expressions.
 *     requestBody:
 *           required: true
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   expressions:
 *                    type: array
 *                    description: An array of strings, each one is a new expression.
 *                    example: ['12 + 5', '5 * 11']
 *     responses:
 *       200:
 *         description: Expressions created succesfully.
 *         content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  message:
 *                    type: string
 *                    description: Success message.
 *       400:
 *          description: Expressions couldn't be created.
 *          content:
 *               application/json:
 *                 schema:
 *                   type: object
 *                   properties:
 *                     error:
 *                       type: string
 *                       description: error message.
 *                     code:
 *                       type: string
 *                       description: error code
 */
export const createExpressions = async (req: Request, res: Response) => {
  const body = (req.body || {}) as CreateExpsBody;
  const { expressions } = body;
  const { uid } = res.locals.user;

  try {
    const createPromises = expressions.map((expression) =>
      createExp(expression, uid)
    );

    await Promise.all(createPromises);

    res.status(200).send({
      message: "Expressions created succesfully.",
    });
  } catch (err) {
    const { code, message } = err;

    res.status(400).send({
      error: "There was an error when trying to create the expressions.",
      payload: {
        code,
        message,
      },
    });
  }
};
