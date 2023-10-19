package com.precize.scoreApp.repository;

import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import com.precize.scoreApp.model.SatResult;

import jakarta.transaction.Transactional;

@Repository
public interface satResultRepository extends JpaRepository<SatResult, Long> {
	Optional<SatResult> findByName(String name);

	@Transactional
	@Modifying
	@Query("DELETE FROM SatResult s WHERE s.name = :name")
	void deleteByName(@Param("name") String name);
}
