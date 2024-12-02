import swaggerJsDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";

const swaggerOptions = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "HealthMate API",
      version: "1.0.0",
      description: "API documentation for HealthMate application",
    },
    servers: [
      {
        url: "http://localhost:5173", // Hoặc cổng mà bạn đang chạy API
      },
    ],
  },
  apis: ["./Routes/**/*.js"], // Đảm bảo đường dẫn chính xác
};

export const swaggerDocs = (app, port) => {
  const swaggerSpec = swaggerJsDoc(swaggerOptions);

  app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
  console.log(`Swagger docs available at http://localhost:${port}/api-docs`);
};
