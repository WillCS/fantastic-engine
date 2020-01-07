attribute vec4 vertexPos;
attribute vec2 texCoord;
 
uniform mat4 model;
uniform mat4 view;
uniform mat4 projection;

varying highp vec2 fragTexCoord;
 
void main() {
  gl_Position = projection * view * model * vertexPos;
  fragTexCoord = texCoord;
}
