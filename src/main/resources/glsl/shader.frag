#version 330 core
out vec4 fragColour;

in vec3 finalTexCoords;

uniform sampler2D mappedTexture;

void main() {
    fragColour = texture(mappedTexture, finalTexCoords);
}