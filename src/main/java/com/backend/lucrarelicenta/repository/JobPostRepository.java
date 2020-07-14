package com.backend.lucrarelicenta.repository;

import com.backend.lucrarelicenta.model.JobPost;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface JobPostRepository extends JpaRepository <JobPost,Long> {

}
