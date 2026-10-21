package com.unscripted.backend.repository;

import com.unscripted.backend.model.UserProfile;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UserProfileRepository extends MongoRepository<UserProfile, String> {
    Optional<UserProfile> findByEmailIgnoreCase(String email);
    boolean existsByEmailIgnoreCase(String email);
}
