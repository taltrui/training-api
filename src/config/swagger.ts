export default {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Training API",
      version: "1.0.0",
    },
  },
  apis: ["./src/routes/*.ts"],
};
