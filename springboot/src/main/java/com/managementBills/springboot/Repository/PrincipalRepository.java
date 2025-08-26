package com.managementBills.springboot.Repository;

import com.managementBills.springboot.Entity.Principal;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PrincipalRepository extends JpaRepository<Principal,Long>{
    
}
