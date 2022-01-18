// --- setup ---

function insertTiles(tileMap, mapName) {
  let tileCount = tileMap.width * tileMap.height;
  for (let i = 0; i < tileMap.height; i++) {
    for (let j = 0; j < tileMap.width; j++) {
      let tile = document.createElement("div")
      let className = getTileClassName(tileMap.mapGrid[i][j][0])
      
      tile.id = `x${j}y${i}`
      tile.className += "tile " + className
      mapName.appendChild(tile)

      // set player pos
      if (className == Entities.Character) {
        playerPos.x = i
        playerPos.y = j
      }
    }
  }
}

function getTileClassName(tileText) {
  switch (tileText) {
    case " ": return Tiles.Space
    case "W": return Tiles.Wall
    case "B": return Entities.Block
    case "P": return Entities.Character
    case "G": return Tiles.Goal
  }
}

var Direction = {
  "Up": { 
    "Move": { x: 0, y: -1, },
    "Push": { x: 0, y: -2, }, 
  },
  "Down": { 
    "Move": { x: 0, y: 1, },
    "Push": { x: 0, y: 2, }, 
  },
  "Right": { 
    "Move": { x: 1, y: 0, },
    "Push": { x: 2, y: 0, }, 
  },
  "Left": {
    "Move": { x: -1, y: 0, },
    "Push": { x: -2, y: 0, }, 
  },
}

var playerPos = { x: 0, y: 0, }
var mapName = "map"
var tileMap = tileMap01

var map = document.createElement("div")
map.id = mapName
insertTiles(tileMap, map)
document.body.prepend(map)


// --- Game Logic ---

function move(pos, dir) {
  let posId = calculateNewId(pos, { x:0, y:0 })
  let moveId = calculateNewId(pos, dir.Move)
  let pushId = calculateNewId(pos, dir.Push)

  let posTileClass = document.getElementById(posId).className
  let moveTileClass = document.getElementById(moveId).className
  let pushTileClass = document.getElementById(pushId).className

  // move
  if (
    !classNameIncludes(moveTileClass, Tiles.Wall)
    && !classNameIncludes(moveTileClass, Entities.Block)
    && !classNameIncludes(moveTileClass, Entities.BlockDone)
    ) {

    // set move tile class
    if (classNameIncludes(moveTileClass, Tiles.Goal))
      setClassName(moveId, "tile goal " + Entities.Character)
    else
      setClassName(moveId, "tile " + Entities.Character)

    // set pos tile class
    if (classNameIncludes(posTileClass, "goal"))
      setClassName(posId, "tile " + Tiles.Goal)      
    else
      setClassName(posId, "tile " + Tiles.Space)

    // update player pos
    playerPos.x += dir.Move.x
    playerPos.y += dir.Move.y
  } 

  // push
  else if (
    (  classNameIncludes(moveTileClass, Entities.Block) 
    || classNameIncludes(moveTileClass, Entities.BlockDone))
    && 
    !( pushTileClass.includes(Tiles.Wall)
    || pushTileClass.includes(Entities.Block)
    || pushTileClass.includes(Entities.BlockDone))
  ) {

    // set push tile class
    if (classNameIncludes(pushTileClass, Tiles.Goal))
      setClassName(pushId, "tile " + Entities.BlockDone)
    else
      setClassName(pushId, "tile " + Entities.Block)

    // set move tile class
    if (classNameIncludes(moveTileClass, Entities.BlockDone))
      setClassName(moveId, "tile goal " + Entities.Character)
    else if (classNameIncludes(moveTileClass, Entities.Block))
      setClassName(moveId, "tile " + Entities.Character)
    else
      setClassName(moveId, "tile " + Entities.Character)

    // set pos tile class
    if (classNameIncludes(posTileClass, "goal"))
      setClassName(posId, "tile " + Tiles.Goal)
    else
      setClassName(posId, "tile " + Tiles.Space)

    // update player pos
    playerPos.x += dir.Move.x
    playerPos.y += dir.Move.y
  }
}

function classNameIncludes(tileClass, match) {
  if (tileClass.includes(match))
    return true
  return false
}

function setClassName(classId, selectors) {
  document.getElementById(classId).className = selectors
}

function calculateNewId(pos, dir) {
  return `x${pos.x + dir.x}y${pos.y + dir.y}`
}

window.addEventListener("keydown", function(e) {
  if(["ArrowUp","ArrowDown","ArrowLeft","ArrowRight"].indexOf(e.code) > -1) {
      e.preventDefault();
  }

  try {
    switch (e.code) {
      case "ArrowUp": move(playerPos, Direction.Up); break
      case "ArrowDown": move(playerPos, Direction.Down); break
      case "ArrowLeft": move(playerPos, Direction.Left); break
      case "ArrowRight": move(playerPos, Direction.Right); break
    }
  } catch {}

}, false);
