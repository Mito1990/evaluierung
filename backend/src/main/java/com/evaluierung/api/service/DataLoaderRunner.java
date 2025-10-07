package com.evaluierung.api.service;

import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Profile;
import org.springframework.stereotype.Component;

@Component
@Profile("dev")
public class DataLoaderRunner implements CommandLineRunner {

    private final VehicleService vehicleService;

    public DataLoaderRunner(VehicleService vehicleService) {
        this.vehicleService = vehicleService;
    }

    @Override
    public void run(String... args) throws Exception {
        vehicleService.loadVehiclesFromJson();
    }
}
