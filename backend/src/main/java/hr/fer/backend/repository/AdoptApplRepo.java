package hr.fer.backend.repository;

import hr.fer.backend.entity.AdoptApplEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface AdoptApplRepo extends JpaRepository<AdoptApplEntity, Long> {
    Optional<List<AdoptApplEntity>> findByDogId(Long dog_id);
    void deleteByDogId(Long dog_id);
}
