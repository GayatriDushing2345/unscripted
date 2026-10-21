package com.unscripted.backend.repository;

import com.unscripted.backend.model.CareerResult;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CareerResultRepository extends MongoRepository<CareerResult, String> {
    List<CareerResult> findByDomainIgnoreCase(String domain);
}
