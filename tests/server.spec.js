const request = require("supertest");
const server = require("../index");

describe("Operaciones CRUD de cafes", () => {

// 1. Testea que la ruta GET /cafes devuelve un status code 200 y el tipo de dato recibido es un arreglo con por lo menos 1 objeto.
  it("Obteniendo un 200", async () => {
    const response = await request(server).get("/cafes").send();
    expect(response.statusCode).toBe(200);
  });

  it("Obteniendo un array de cafes", async () => {
    const { body } = await request(server).get("/cafes").send();
    expect(body).toBeInstanceOf(Array);
  });


  it("Comprobando que un array tenga al menos un objeto", async () => {
    const { body } = await request(server).get("/cafes").send();
    const cafes = body;
    const result = cafes.find((element) => typeof element === 'object')
    expect(result).toBeInstanceOf(Object);
  });



// 2. Comprueba que se obtiene un código 404 al intentar eliminar un café con un id que no existe.

  it("Comprobando que no existe un id con 404", async () => {
    const jwt = "token";
    const idDeProductoAEliminar = 5;
    const response = await request(server)
      .delete(`/cafes/${idDeProductoAEliminar}`)
      .set("Authorization", jwt)
      .send();
   expect(response.statusCode).toBe(404);
  });

// 3. Prueba que la ruta POST /cafes agrega un nuevo café y devuelve un código 201.

    it("Testing add new coffe", async () => {
      const id = Math.floor(Math.random() * 999);
      const cafe = { id, nombre: "Nuevo cafe" };

      const { body: cafes } = await request(server).post("/cafes").send(cafe);
      expect(cafes).toContainEqual(cafe);

    });

    it("Testing add new coffe and returns a code 201", async () => {
        const id = Math.floor(Math.random() * 999);
        const cafe = { id, nombre: "Nuevo cafe" };
  
        const response = await request(server).post("/cafes").send(cafe);
        expect(response.statusCode).toBe(201);
      });

// 4. Prueba que la ruta PUT /cafes devuelve un status code 400 si intentas actualizar un café enviando un id en los parámetros que sea diferente al id dentro del payload.

  it("Obteniendo un 400", async () => {
    const id = 2;
    const coffeeMilk = { id, nombre: "Con Leche" };
    const response = await request(server).put("/cafes/1").send(coffeeMilk);
    expect(response.statusCode).toBe(400);
  });

});
