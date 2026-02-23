package ru.lazukserg.locavore.mapper;

import org.springframework.stereotype.Component;
import ru.lazukserg.locavore.models.Region;
import ru.lazukserg.locavore.models.pl.RegionDTO;

@Component
public class RegionMapper {

    public RegionDTO toPl(Region region) {
        return RegionDTO.builder()
                .id(region.getId())
                .name(region.getName().getDisplayName())
                .build();
    }
}
