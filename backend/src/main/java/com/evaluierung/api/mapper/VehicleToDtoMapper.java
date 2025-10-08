package com.evaluierung.api.mapper;

import com.evaluierung.api.entity.Vehicle;
import com.evaluierung.model.VehicleDto;

public class VehicleToDtoMapper {
    public static VehicleDto toDto(Vehicle vehicle) {
        return new VehicleDto(vehicle.getId(), vehicle.getVehicleType(), vehicle.getCreated(), vehicle.getMileage(),
                vehicle.getGearbox(), vehicle.getOwner(), vehicle.getKwAndPs(), vehicle.getHek(),
                vehicle.getTaxation());
    }
}
