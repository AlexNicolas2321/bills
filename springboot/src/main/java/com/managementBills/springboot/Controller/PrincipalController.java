package com.managementBills.springboot.Controller;

import com.managementBills.springboot.Entity.Principal;
import com.managementBills.springboot.Service.PrincipalService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/principal")
@CrossOrigin(origins = "*")
public class PrincipalController {

    private final PrincipalService principalService;

    public PrincipalController(PrincipalService principalService) {
        this.principalService = principalService;
    }

    // Get all principals (with expenses)
    @GetMapping
    public List<Principal> getAllPrincipals() {
        return principalService.getAllPrincipals();
    }

    // Get a single principal by ID
    @GetMapping("/{id}")
    public Principal getPrincipalById(@PathVariable Long id) {
        return principalService.getPrincipalById(id);
    }

    // Create a new principal
    @PostMapping
    public Principal createPrincipal(@RequestBody Principal principal) {
        return principalService.savePrincipal(principal);
    }

    // Update an existing principal
    @PutMapping("/{id}")
    public Principal updatePrincipal(@PathVariable Long id, @RequestBody Principal principal) {
        principal.setId(id);
        return principalService.savePrincipal(principal);
    }

    // Delete a principal
    @DeleteMapping("/{id}")
    public void deletePrincipal(@PathVariable Long id) {
        principalService.deletePrincipal(id);
    }
}
