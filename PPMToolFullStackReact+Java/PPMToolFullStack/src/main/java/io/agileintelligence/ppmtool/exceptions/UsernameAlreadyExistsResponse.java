package io.agileintelligence.ppmtool.exceptions;

public class UsernameAlreadyExistsResponse {
    String username;

    public UsernameAlreadyExistsResponse(String username) {
        this.username = username;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }
}
