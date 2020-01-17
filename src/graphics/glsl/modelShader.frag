precision mediump float;
 
varying vec4 fragColour;
varying vec4 fragNormal;
 
void main() {
   gl_FragColor = fragColour + 0.00001 * fragNormal;
}
