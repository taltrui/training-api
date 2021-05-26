import app from "@server";

// Start the server
const port = Number(process.env.PORT || 3000);
// eslint-disable-next-line @typescript-eslint/no-unsafe-call
app.listen(port, () => {
  console.log("Express server started on port: " + port);
});
