/**
 * @author Nishant / https://nish.space
 */

const THREE = require('three');

var Physics3 = function(scene, clock) {
  let consts = {
    gravity: 0,
    velocity: 0.01,
    gravityDir: new THREE.Vector3(0, -1, 0),
    floor: true
  };

  let objects = [];

  function listObjects(root) {
    if(root.children.length > 0) {
      for (const c of root.children) {
        if (c instanceof THREE.Mesh) {
          objects.push(c);
        }
        listObjects(c);
      }
    } else {
      return;
    }
  }
  function updateVelocities() {
  }
  function moveObjects() {
    const dt = clock.getDelta();
    for (const o of objects) {
      if(o.velocity) {
        o.translateOnAxis(o.velocity.direction, o.velocity.magnitude * dt)
      }
    }
  }
  return {

    update: function() {
      objects = []
      listObjects(scene);
      updateVelocities();
      moveObjects();
    },
  }
}

module.exports = Physics3;
