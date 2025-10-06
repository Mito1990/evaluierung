package com.evaluierung.api.dto;

import com.evaluierung.api.entity.Vehicle;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class VehicleDto {

    private Long id;
    private String vehicleType;
    private String created;
    private String mileage;
    private String gearbox;
    private Long owner;
    private String kwAndPs;
    private Double hek;
    private String taxation;

    public static VehicleDto toDto(Vehicle vehicle) {
        return new VehicleDto(vehicle.getId(), vehicle.getVehicleType(), vehicle.getCreated(), vehicle.getMileage(),
                vehicle.getGearbox(), vehicle.getOwner(), vehicle.getKwAndPs(), vehicle.getHek(),
                vehicle.getTaxation());
    }
}
