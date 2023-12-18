const AbstractManager = require("./AbstractManager");

class BoatManager extends AbstractManager {
  constructor() {
    super({ table: "boat" });
  }

  async readAll(where) {
    let whereString;
    if (where !== undefined) {
      whereString = Object.entries(where)
        .map(([key, value]) => `b.${key}="${value}"`)
        .join(" AND ");
    }

    // Execute the SQL SELECT query to retrieve all boats from the "boat" table
    const [rows] = await this.database.query(
      `select 
        b.id AS id, 
        b.name, 
        b.coord_x, 
        b.coord_y, 
        t.id AS tile_id, 
        t.type, 
        t.coord_x, 
        t.coord_y, 
        t.has_treasure 
      from ${this.table} b 
      JOIN tile t ON b.coord_x=t.coord_x and b.coord_y=t.coord_y
      ${whereString?.length > 0 ? `WHERE ${whereString}` : ""};
      `
    );

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
