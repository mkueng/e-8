class SpatialHashMap {

  constructor(cellSize) {
    this.cellSize = cellSize;
    this.hashTable = new Map();
  }

  hashCoordinates(x,y){
    return `${Math.floor(x / this.cellSize)},${Math.floor(y / this.cellSize)}`;
  }

  addObject(x, y, object) {
    const hash = this.hashCoordinates(x, y);

    if (!this.hashTable.has(hash)) {
      this.hashTable.set(hash, []);
    }

    this.hashTable.get(hash).push(object);
  }

  removeObject(x, y, object) {
    const hash = this.hashCoordinates(x, y);

    if (this.hashTable.has(hash)) {
      const cellObjects = this.hashTable.get(hash);
      const index = cellObjects.indexOf(object);

      if (index !== -1) {
        cellObjects.splice(index, 1);
      }
    }
  }

  updateObject(oldX, oldY, newX, newY, object) {
    this.removeObject(oldX, oldY, object);
    this.addObject(newX, newY, object);
  }


  getObjects(x, y) {
    const hash = this.hashCoordinates(x, y);
    return this.hashTable.get(hash) || [];
  }


}