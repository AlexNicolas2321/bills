package com.managementBills.springboot.Service;

import com.managementBills.springboot.Repository.PrincipalRepository;

import com.managementBills.springboot.Entity.Principal; 
import java.util.List;
import org.springframework.stereotype.Service;

@Service
public class PrincipalService {
    
    private final PrincipalRepository principalRepository;

    public PrincipalService (PrincipalRepository principalRepository){
        this.principalRepository=principalRepository;
    }

    public List<Principal> getAllPrincipals() {
        return principalRepository.findAll();
    }

    public Principal getPrincipalById(Long id) {
        return principalRepository.findById(id).orElse(null);
    }

    public Principal savePrincipal(Principal principal) {
        return principalRepository.save(principal);
    }

    public void deletePrincipal(Long id) {
        principalRepository.deleteById(id);
    }
}
