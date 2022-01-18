//
// --- setup ---
//

class StyleSheet {
  constructor(cssRules = null) {
    let style = document.createElement("style")
    document.head.appendChild(style)
    this.sheet = style.sheet
  }

  addRule(rule) {
    this.sheet.insertRule(rule, this.sheet.cssRules.length)
  }
}

var styleSheet = new StyleSheet()

var tileSize = 36

//
// --- rules ---
//

styleSheet.addRule(
`* { 
  padding: 0; margin: 0;
  font-family: sans-serif;
}`)

styleSheet.addRule(
`html {
  height: 100%;
  width: 100%;
}`)

styleSheet.addRule(
`body {
  height: 100%;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #2a2a2a;
}`)

styleSheet.addRule(
`#${mapName} {
  display: grid;
  grid-template-columns: repeat(${tileMap.width}, ${tileSize}px);
  margin: auto;
}`)

styleSheet.addRule(
`.tile {
  height: ${tileSize}px;
  width: ${tileSize}px;
  background-color: #2a2a2a;
  background-size: 100% 100%;
}`)

styleSheet.addRule(
`.tile-space {
  background-image: url("img/i0.gif");
}`)

styleSheet.addRule(
`.tile-goal {
  background-image: url("img/i1.gif");
}`)

styleSheet.addRule(
`.tile-wall {
  background-image: url("img/i2.gif");
}`)

styleSheet.addRule(
`.entity-block {
  background-image: url("img/i3.gif");
}`)

styleSheet.addRule(
`.entity-block-goal {
  background-image: url("img/i4.gif");
}`)

styleSheet.addRule(
`.entity-player {
  background-image: url("img/i5.gif");
}`)

styleSheet.addRule(
`.victory {
  position: absolute;
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: rgba(42, 42, 42, 0.8);
  color: #888;
}`)

styleSheet.addRule(
`p {
  font-size: 5rem;
}`)
  
styleSheet.addRule(
`.victory a {
  font-size: 2rem;
  color: #888;
}`)

styleSheet.addRule(
`.hide {
  visibility: hidden;
}`)
