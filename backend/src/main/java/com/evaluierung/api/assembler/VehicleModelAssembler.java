package com.evaluierung.api.assembler;

import static org.springframework.hateoas.server.mvc.WebMvcLinkBuilder.linkTo;
import static org.springframework.hateoas.server.mvc.WebMvcLinkBuilder.methodOn;

import org.springframework.hateoas.EntityModel;
import org.springframework.hateoas.server.RepresentationModelAssembler;
import org.springframework.stereotype.Component;

import com.evaluierung.api.controller.VehicleController;
import com.evaluierung.model.VehicleDto;

@Component
public class VehicleModelAssembler implements RepresentationModelAssembler<VehicleDto, EntityModel<VehicleDto>> {
    @Override
    public EntityModel<VehicleDto> toModel(VehicleDto vehicle) {
        return EntityModel.of(vehicle,
                linkTo(methodOn(VehicleController.class).getVehicle(vehicle.getId())).withSelfRel(),
                linkTo(methodOn(VehicleController.class).getAllVehicles()).withRel("all-vehicles"),
                linkTo(methodOn(VehicleController.class).deleteVehicle(vehicle.getId())).withRel("delete"));
    }


}
