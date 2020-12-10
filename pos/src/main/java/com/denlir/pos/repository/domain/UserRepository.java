package com.denlir.pos.repository.domain;

import com.denlir.pos.entity.domain.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<User, Long> {
}
