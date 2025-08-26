package com.managementBills.springboot.Entity;


import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDate;

@Entity
@Table(name = "expenses")
@Getter @Setter
@NoArgsConstructor @AllArgsConstructor
public class Expense {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String description;  // e.g. "Dinner at restaurant"

    @Column(nullable = false)
    private Double amount;

  
    @ManyToOne
    @JoinColumn(name = "principal_id")
    private Principal principal;

}