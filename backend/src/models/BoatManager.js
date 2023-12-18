const AbstractManager = require("./AbstractManager");

class BoatManager extends AbstractManager {
  constructor() {
    super({ table: "boat" });
  }

  async readAll() {
    // Execute the SQL SELECT query to retrieve all boats from the "boat" table
    const [rows] = await this.database.query(`select * from ${this.table}`);

    // Return the array of boats
    return rows;
  }

  async update(id, coordX, coordY) {
    // Execute the SQL SELECT query to retrieve all boats from the "boat" table
    const [result] = await this.database.query(
      `UPDATE ${this.table} SET coord_x=?, coord_y=? WHERE id=?;`,
      [coordX, coordY, id]
    );
    return result;
  }
}

module.exports = BoatManager;
