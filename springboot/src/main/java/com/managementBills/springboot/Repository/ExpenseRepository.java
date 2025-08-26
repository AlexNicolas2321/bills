package com.managementBills.springboot.Repository;

import com.managementBills.springboot.Entity.Expense;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;


@Repository
public interface ExpenseRepository extends JpaRepository<Expense,Long>{
    
}
