attribute vec3 vertexPos;
attribute vec3 vertexColour;
attribute vec3 vertexNorm;
 
uniform mat4 model;
uniform mat4 view;
uniform mat4 projection;

varying vec4 fragColour;
varying vec4 fragNormal;
 
void main() {
  gl_Position = projection * view * model * vec4(vertexPos, 1);
 
  fragColour = vec4(vertexColour, 1);
  fragNormal = vec4(vertexNorm, 1);
}
