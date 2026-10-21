package com.unscripted.backend.service;

import com.unscripted.backend.model.CareerResult;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CareerCatalogService {

    private final OnetCareerDataService onetDataService;

    public CareerCatalogService(OnetCareerDataService onetDataService) {
        this.onetDataService = onetDataService;
    }

    public List<CareerResult> getAllCareers() {
        return onetDataService.getAllOccupations();
    }

    public CareerResult getCareerById(String id) {
        return onetDataService.getBySocCodeOrId(id);
    }

    public List<CareerResult> searchCareers(String query, String domain) {
        return onetDataService.search(query, domain);
    }
}
