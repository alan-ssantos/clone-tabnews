test("GET to api/v1/status should return 200 ", async () => {
  const response = await fetch("http://localhost:3000/api/v1/status");
  expect(response.status).toBe(200);

  const responseBody = await response.json();
  expect(responseBody.updated_at).toBeDefined();

  const parsedDate = new Date(responseBody.updated_at).toISOString();
  expect(responseBody.updated_at).toBe(parsedDate);

  expect(responseBody.dependencies.database.version).toEqual("16.1");
  expect(responseBody.dependencies.database.max_connections).toEqual(100);
  expect(responseBody.dependencies.database.opened_connections).toEqual(1);
});
