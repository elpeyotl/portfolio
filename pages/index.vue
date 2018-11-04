<template>
	<div class="content demo-2">
		<canvas class="scene scene--full" id="scene"></canvas>
		<script type="x-shader/x-vertex" id="wrapVertexShader">
			#define PI 3.1415926535897932384626433832795
			attribute float size;
			void main() {
				vec4 mvPosition = modelViewMatrix * vec4( position, 1.0 );
				gl_PointSize = 3.0;
				gl_Position = projectionMatrix * mvPosition;
			}
		</script>
		<script type="x-shader/x-fragment" id="wrapFragmentShader">
			uniform sampler2D texture;
			void main(){
				vec4 textureColor = texture2D( texture, gl_PointCoord );
				if ( textureColor.a < 0.3 ) discard;
				vec4 dotColor = vec4(0.06, 0.18, 0.36, 0.4);
				vec4 color = dotColor * textureColor;
				gl_FragColor = color;
			}
		</script>
		<div class="content__inner">
			<h2 class="content__title">Chris Perez</h2>
			<h3 class="content__subtitle">Webdeveloper</h3>
			<div class="icons">
				<a href="https://github.com/elpeyotl" rel="noreferrer" target="_blank" title="Github"><i class="fab fa-github"></i></a>
				<a href="mailto:hello@chrisperez.ch" rel="noreferrer" title="Send email"><i class="far fa-envelope"></i></a>
				<a href="https://twitter.com/elpeyotl" rel="noreferrer" title="Twitter" target="_blank"><i class="fab fa-twitter"></i></a>
				<a href="https://codepen.io/elpeyotl/" rel="noreferrer" title="Codepen" target="_blank"><i class="fab fa-codepen"></i></a>
				<a href="/files/portfolio_chris_perez.pdf" rel="noreferrer" title="Portfolio" target="_blank"><i class="fa fa-file-pdf"></i></a>
			</div>
		</div>
	</div>
</template>
<script>

export default {
	mounted: function () {
		if(process.browser) {
			var canvas = document.querySelector('#scene');
			var width = canvas.offsetWidth,
				height = canvas.offsetHeight;

			var renderer = new THREE.WebGLRenderer({
				canvas: canvas,
				antialias: true
			});
			renderer.setPixelRatio(window.devicePixelRatio > 1 ? 2 : 1);
			renderer.setSize(width, height);
			renderer.setClearColor(0x8ac2e2);

			var scene = new THREE.Scene();

			var camera = new THREE.PerspectiveCamera(50, width / height, 0.1, 2000);
			camera.position.set(0, 0, 80);

			var loader = new THREE.TextureLoader();
			loader.crossOrigin = "Anonymous";
			var dotTexture = loader.load('img/dotTexture.png');

			var radius = 50;
			var sphereGeom = new THREE.IcosahedronGeometry(radius, 5);
			var dotsGeom = new THREE.Geometry();
			var bufferDotsGeom = new THREE.BufferGeometry();
			var positions = new Float32Array(sphereGeom.vertices.length * 3);
			for (var i = 0;i<sphereGeom.vertices.length;i++) {
				var vector = sphereGeom.vertices[i];
				animateDot(i, vector);
				dotsGeom.vertices.push(vector);
				vector.toArray(positions, i * 3);
			}

			function animateDot(index, vector) {
					TweenMax.to(vector, 4, {
						x: 0,
						z: 0,
						ease:Back.easeOut,
						delay: Math.abs(vector.y/radius) * 2,
						repeat:-1,
						yoyo: true,
						yoyoEase:Back.easeOut,
						onUpdate: function () {
							updateDot(index, vector);
						}
					});
			}
			function updateDot(index, vector) {
					positions[index*3] = vector.x;
					positions[index*3+2] = vector.z;
			}

			var attributePositions = new THREE.BufferAttribute(positions, 3);
			bufferDotsGeom.addAttribute('position', attributePositions);
			var shaderMaterial = new THREE.ShaderMaterial({
				uniforms: {
					texture: {
						value: dotTexture
					}
				},
				vertexShader: document.getElementById("wrapVertexShader").textContent,
				fragmentShader: document.getElementById("wrapFragmentShader").textContent,
				transparent:true
			});
			var dots = new THREE.Points(bufferDotsGeom, shaderMaterial);
			scene.add(dots);

			function render(a) {
				dots.geometry.verticesNeedUpdate = true;
				dots.geometry.attributes.position.needsUpdate = true;
				renderer.render(scene, camera);
			}

			function onResize() {
				canvas.style.width = '';
				canvas.style.height = '';
				width = canvas.offsetWidth;
				height = canvas.offsetHeight;
				camera.aspect = width / height;
				camera.updateProjectionMatrix();
				renderer.setSize(width, height);
			}

			var mouse = new THREE.Vector2(0.8, 0.5);
			function onMouseMove(e) {
				mouse.x = (e.clientX / window.innerWidth) - 0.5;
				mouse.y = (e.clientY / window.innerHeight) - 0.5;
				TweenMax.to(dots.rotation, 4, {
					x : (mouse.y * Math.PI * 0.5),
					z : (mouse.x * Math.PI * 0.2),
					ease:Power1.easeOut
				});
			}

			TweenMax.ticker.addEventListener("tick", render);
			window.addEventListener("mousemove", onMouseMove);
			var resizeTm;
			window.addEventListener("resize", function(){
				resizeTm = clearTimeout(resizeTm);
				resizeTm = setTimeout(onResize, 200);
			});
		}
	}
}
</script>

<style>


</style>
