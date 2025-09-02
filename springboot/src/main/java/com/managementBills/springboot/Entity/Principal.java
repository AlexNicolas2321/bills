package com.managementBills.springboot.Entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDate;
import java.util.List;

@Entity
@Table(name = "principals")
@Getter @Setter
@NoArgsConstructor @AllArgsConstructor
public class Principal {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String title;  // e.g. "Vacation to Italy"

    private String description; // optional

    @Column(nullable = true)
    private LocalDate date;  // useful for calendar

    @OneToMany(mappedBy = "principal", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    @JsonIgnore
    private List<Expense> expenses;
}
