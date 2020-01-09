attribute vec2 vertexPos;
attribute vec2 texCoord;
 
varying highp vec2 fragTexCoord;
 
void main() {
  gl_Position = vec4(vertexPos, 0, 1);
  fragTexCoord = texCoord;
}
