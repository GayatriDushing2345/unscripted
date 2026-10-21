package com.unscripted.backend.repository;

import com.unscripted.backend.model.UserJourney;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UserJourneyRepository extends MongoRepository<UserJourney, String> {
    Optional<UserJourney> findByUserId(String userId);
    void deleteByUserId(String userId);
}
