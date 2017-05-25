(function() {
  var container;
  var camera, scene, renderer, group, particle;
  var mouseX = 0;
  var mouseY = 0;

  var windowHalfX = window.innerWidth / 2;
  var windowHalfY = window.innerHeight / 2;

  var colors = [
    0xE6E6E6,
    0xD3D3D3,
    0xBFBFBF,
    0x989898,
    0x858585,
    0x5F5F5F,
    0x383838
  ];

  function init() {
    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 1, 3000);
    camera.position.z = 1000;
    scene = new THREE.Scene();

    var PI2 = Math.PI * 2;
    var program = function(context) {
      context.beginPath();
      context.arc(0, 0, 0.4, 0, PI2, true);
      context.fill();
    };

    group = new THREE.Group();
    scene.add(group);

    for (var i = 0; i < 2500; i++) {

      var material = new THREE.SpriteCanvasMaterial({
        //color: Math.random() * 0x808008 + 0x808080,
        color: new THREE.Color(colors[Math.floor(Math.random() * colors.length)]),
        program: program
      });

      particle = new THREE.Sprite(material);
      particle.position.x = Math.random() * 2300 - 1000;
      particle.position.y = Math.random() * 2400 - 1000;
      particle.position.z = Math.random() * 2500 - 1000;
      particle.scale.x = particle.scale.y = Math.random() * 6;
      group.add(particle);
    }

    renderer = new THREE.CanvasRenderer({
      alpha: true
    });
    renderer.setClearColor(0x242424, 1);
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth, window.innerHeight);

    document.body.appendChild(renderer.domElement);
    document.addEventListener('mousemove', onDocumentMouseMove, false);
    window.addEventListener('resize', onWindowResize, false);
  }

  function onWindowResize() {
    windowHalfX = window.innerWidth / 2;
    windowHalfY = window.innerHeight / 2;
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
  }

  function onDocumentMouseMove(event) {
    mouseX = event.clientX - windowHalfX;
    mouseY = event.clientY - windowHalfY;
  }

  function animate() {
    requestAnimationFrame(animate);
    render();
  }

  function render() {
    camera.position.x += (mouseX - camera.position.x) * 0.01;
    camera.position.y += (-mouseY - camera.position.y) * 0.01;
    camera.lookAt(scene.position);

    group.rotation.x += 0.001;
    group.rotation.y += 0.002;

    renderer.render(scene, camera);
  }

  init();
  animate();
})();
