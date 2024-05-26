package hr.fer.backend.controller;

import hr.fer.backend.entity.AdoptApplEntity;
import hr.fer.backend.service.AdoptApplService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin
@RestController
@RequestMapping("/dogs/{id}")
@RequiredArgsConstructor
public class AdoptApplController {
    private final AdoptApplService adoptApplService;

    @GetMapping("/applications")
    public ResponseEntity<List<AdoptApplEntity>> getApplications(@PathVariable("id") Long id) {
        return ResponseEntity.ok().body(adoptApplService.getAllAppForDog(id));

    }
    @PostMapping("/applications")
    public ResponseEntity<AdoptApplEntity> createAppl(@PathVariable("id") Long id, @RequestBody AdoptApplEntity appl) {
        appl.setDogId(id);
        return ResponseEntity.ok().body(adoptApplService.createAppl(appl));
    }

    @PutMapping("/applications/{app_id}")
    public ResponseEntity<AdoptApplEntity> updateAdoptAppl(@PathVariable("id") Long dog_id, @PathVariable("app_id") Long id, @RequestBody AdoptApplEntity adoptAppl) {
        adoptAppl.setDogId(dog_id);
        return ResponseEntity.ok().body(adoptApplService.updateAppl(id, adoptAppl));
    }

    @DeleteMapping("/applications/{app_id}")
    public String deleteAdoptAppl(@PathVariable("app_id") Long id) {
        adoptApplService.delete(id);
        return "Adoption Application Deleted successfully";
    }
}
