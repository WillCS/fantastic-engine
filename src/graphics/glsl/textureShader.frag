precision mediump float;
 
varying highp vec2 fragTexCoord;

uniform sampler2D textureSampler;
 
void main() {
   gl_FragColor = texture2D(textureSampler, fragTexCoord);
}
