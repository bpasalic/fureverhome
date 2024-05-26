package hr.fer.backend.controller;

import hr.fer.backend.entity.DogEntity;
import hr.fer.backend.service.AdoptApplService;
import hr.fer.backend.service.DogService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;


@CrossOrigin
@RestController
@RequestMapping("/dogs")
@RequiredArgsConstructor
public class DogController {
    private final DogService dogService;
    private final AdoptApplService adoptApplService;

    @PostMapping
    public ResponseEntity<DogEntity> createDog(@RequestBody DogEntity dog) {
        return ResponseEntity.ok().body(dogService.createDog(dog));
    }

    @GetMapping
    public ResponseEntity<List<DogEntity>> getDogs() {
        return ResponseEntity.ok().body(dogService.getAllDogs());
    }

    @GetMapping("/{id}")
    public ResponseEntity<DogEntity> getDog(@PathVariable(value="id") Long id) {
        return ResponseEntity.ok().body(dogService.getDog(id));
    }

    @DeleteMapping("/{id}")
    public String deleteDog(@PathVariable("id") Long id) {
        adoptApplService.deleteByDogId(id);
        dogService.deleteDogById(id);
        return ("Deleted successfully");
    }

    @PutMapping("/{id}")
    public ResponseEntity<DogEntity> updateDog(@PathVariable Long id, @RequestBody DogEntity dog) {
        return ResponseEntity.ok().body(dogService.updateDog(dog, id));
    }

}
