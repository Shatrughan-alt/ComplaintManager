package com.exceptions;


public class NoSuchUserFoundException extends RuntimeException {
    public NoSuchUserFoundException(String noUserFound) {
        super(noUserFound);
    }
}
