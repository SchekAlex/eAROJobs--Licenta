package com.backend.lucrarelicenta.service;

import com.backend.lucrarelicenta.model.Employee;
import com.backend.lucrarelicenta.repository.EmployeeRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class EmployeeService {
    private EmployeeRepository employeeRepository;

    public EmployeeService(EmployeeRepository employeeRepository) {
        this.employeeRepository = employeeRepository;
    }

    public Optional<Employee> findById(Long id){
        return employeeRepository.findById(id);
    }

    public List<Employee> findAll(){
        return employeeRepository.findAll();
    }

    public Employee addEmployee(Employee employee){
        return employeeRepository.save(employee);
    }

    public void deleteEmployeeById(Long id){
        employeeRepository.deleteById(id);
    }

}
