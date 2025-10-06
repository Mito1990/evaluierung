package com.evaluierung.api.exception;

public class VehicleNotFoundException extends RuntimeException {
    public VehicleNotFoundException(Long id) {
        super("Vehicle with id not found: " + id);
    }
}
