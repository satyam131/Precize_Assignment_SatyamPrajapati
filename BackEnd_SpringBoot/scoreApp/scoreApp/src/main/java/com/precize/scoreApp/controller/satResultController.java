package com.precize.scoreApp.controller;

import java.util.List;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import com.precize.scoreApp.model.SatResult;
import org.springframework.http.HttpStatus;

@CrossOrigin
@RestController
@RequestMapping("/api/sat-results")
public class satResultController {

	@Autowired
	private com.precize.scoreApp.repository.satResultRepository satResultRepository;

	@PostMapping
	public SatResult insertData(@RequestBody SatResult satResult) {
		satResult.setPassed((satResult.getSatScore() / 100.0) >= 30.0);
		return satResultRepository.save(satResult);
	}

	@GetMapping
	public List<SatResult> viewAllData() {
		return satResultRepository.findAll();
	}

	@GetMapping("/rank/{name}")
	public String getRank(@PathVariable String name) {
		Optional<SatResult> result = satResultRepository.findByName(name);
		if (result.isPresent()) {
			SatResult candidate = result.get();
			List<SatResult> allResults = satResultRepository.findAll();

			allResults.sort((s1, s2) -> Integer.compare(s2.getSatScore(), s1.getSatScore()));

			int rank = 1;
			for (SatResult satResult : allResults) {
				if (satResult.equals(candidate)) {
					return name + " is ranked #" + rank;
				}
				rank++;
			}
			return "Rank not found";
		}
		return "Candidate not found";
	}

	@PutMapping("/update-score/{name}")
	public ResponseEntity<Object> updateScore(@PathVariable String name, @RequestParam int satScore) {
		Optional<SatResult> result = satResultRepository.findByName(name);
		if (result.isPresent()) {
			SatResult satResult = result.get();
			satResult.setSatScore(satScore);
			satResult.setPassed((satScore / 100.0) >= (30.0 / 100.0));
			satResultRepository.save(satResult);
			return ResponseEntity.ok("Score updated successfully");
		}

		return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Candidate not found");
	}

	@DeleteMapping("/delete/{name}")
	public ResponseEntity<String> deleteRecord(@PathVariable String name) {
		Optional<SatResult> result = satResultRepository.findByName(name);
		if (result.isPresent()) {
			SatResult satResult = result.get();
			satResultRepository.delete(satResult);

			return ResponseEntity.ok("Record deleted successfully");
		} else {
			return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Student not found");
		}
	}

}
