package com.evaluierung.api.controller;

import java.util.List;
import java.util.stream.Collectors;

import com.evaluierung.api.assembler.VehicleModelAssembler;
import com.evaluierung.api.dto.VehicleDto;
import com.evaluierung.api.service.VehicleService;

import org.springframework.hateoas.CollectionModel;
import org.springframework.hateoas.EntityModel;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1/vehicles")
public class VehicleController {

    private final VehicleService vehicleService;
    private final VehicleModelAssembler vehicleModelAssembler;

    public VehicleController(VehicleService vehicleService, VehicleModelAssembler vehicleModelAssembler) {
        this.vehicleService = vehicleService;
        this.vehicleModelAssembler = vehicleModelAssembler;
    }

    @GetMapping
    public ResponseEntity<CollectionModel<EntityModel<VehicleDto>>> getAllVehicles() {
        List<EntityModel<VehicleDto>> vehicles = vehicleService.getVehicles()
                .stream()
                .map(vehicleModelAssembler::toModel)
                .collect(Collectors.toList());
        return ResponseEntity.ok(CollectionModel.of(vehicles));
    }

    @GetMapping("/{id}")
    public ResponseEntity<EntityModel<VehicleDto>> getVehicle(@PathVariable Long id) {
        VehicleDto dto = vehicleService.getVehicleById(id);
        EntityModel<VehicleDto> model = vehicleModelAssembler.toModel(dto);
        return ResponseEntity.ok(model);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteVehicle(@PathVariable Long id) {
        vehicleService.deleteVehicle(id);
        return ResponseEntity.noContent().build();
    }
}
