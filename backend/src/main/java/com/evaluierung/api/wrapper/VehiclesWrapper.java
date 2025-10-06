package com.evaluierung.api.wrapper;

import java.util.List;
import com.evaluierung.api.entity.Vehicle;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class VehiclesWrapper {

    List<Vehicle> vehicles;
}
