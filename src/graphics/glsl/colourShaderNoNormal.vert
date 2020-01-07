attribute vec3 vertexPos;
attribute vec3 vertexColour;
 
uniform mat4 model;
uniform mat4 view;
uniform mat4 projection;

varying vec4 fragColour;
 
void main() {
  gl_Position = projection * view * model * vec4(vertexPos, 1);
 
  fragColour = vec4(vertexColour, 1);
}
