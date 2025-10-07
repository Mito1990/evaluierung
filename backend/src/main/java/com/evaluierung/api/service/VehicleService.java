package com.evaluierung.api.service;

import com.evaluierung.api.dto.VehicleDto;
import com.evaluierung.api.entity.Vehicle;
import com.evaluierung.api.exception.VehicleNotFoundException;
import com.evaluierung.api.repository.VehicleRepository;
import com.evaluierung.api.wrapper.VehiclesWrapper;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import java.io.IOException;
import java.io.InputStream;
import java.util.List;
import java.util.stream.Collectors;

@Slf4j
@Service
public class VehicleService {

    private final VehicleRepository vehicleRepository;
    private final ObjectMapper objectMapper;

    public VehicleService(VehicleRepository vehicleRepository, ObjectMapper objectMapper) {
        this.vehicleRepository = vehicleRepository;
        this.objectMapper = objectMapper;
    }

    public void loadVehiclesFromJson() throws IOException {
        InputStream inputStream = getClass().getResourceAsStream("/data.json");
        VehiclesWrapper vehicles = objectMapper.readValue(inputStream, VehiclesWrapper.class);
        vehicleRepository.saveAll(vehicles.getVehicles());
    }

    public List<VehicleDto> getVehicles() {
        return vehicleRepository.findAll()
                .stream()
                .map(VehicleDto::toDto)
                .collect(Collectors.toList());
    }

    public VehicleDto getVehicleById(Long id) {
        Vehicle vehicle = vehicleRepository.findById(id)
                .orElseThrow(() -> new VehicleNotFoundException(id));
        return VehicleDto.toDto(vehicle);
    }

    public void deleteVehicle(Long id) {
        Vehicle vehicle = vehicleRepository.findById(id)
                .orElseThrow(() -> new VehicleNotFoundException(id));
        vehicleRepository.delete(vehicle);
        log.info("Vehicle with ID {} successfully deleted.", id);
    }

}
