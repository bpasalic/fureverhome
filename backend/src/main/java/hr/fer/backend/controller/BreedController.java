package hr.fer.backend.controller;

import hr.fer.backend.entity.BreedEntity;
import hr.fer.backend.service.BreedService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin
@RestController
@RequestMapping("/breeds")
@RequiredArgsConstructor
public class BreedController {

    private final BreedService breedService;

    @PostMapping
    public ResponseEntity<BreedEntity> createBreed(@RequestBody BreedEntity breedEntity) {
        return ResponseEntity.ok().body(breedService.createBreed(breedEntity));
    }

    @GetMapping
    public ResponseEntity<List<BreedEntity>> getBreeds() {
        return ResponseEntity.ok().body(breedService.getAllBreeds());

    }

    @PutMapping("/{id}")
    public ResponseEntity<BreedEntity> updateBreed(@PathVariable Long id, @RequestBody BreedEntity breed) {
        return ResponseEntity.ok().body(breedService.updateBreed(breed, id));
    }

    @DeleteMapping("/{id}")
    public String deleteBreedById(@PathVariable("id") Long id) {
        breedService.deleteBreedById(id);
        return "Deleted successfully";
    }
}
