package com.backend.lucrarelicenta.controller;

import com.backend.lucrarelicenta.dto.EmployeeDto;
import com.backend.lucrarelicenta.exceptions.EmployeeNotFoundException;
import com.backend.lucrarelicenta.model.Employee;
import com.backend.lucrarelicenta.model.Role;
import com.backend.lucrarelicenta.service.EmployeeService;
import com.backend.lucrarelicenta.service.RoleService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import java.net.URI;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/employees")
public class EmployeeController {
    private EmployeeService employeeService;
    private RoleService roleService;

    public EmployeeController(EmployeeService employeeService,RoleService roleService) {
        this.employeeService = employeeService;
        this.roleService = roleService;
    }

    @GetMapping
    public ResponseEntity<List<Employee>> findAllEmployees(){
        List<Employee> employeeList = employeeService.findAll();
        return ResponseEntity.ok(employeeList);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Optional<Employee>> findEmployeeById(@PathVariable Long id){
        Optional<Employee> employeeOptional = employeeService.findById(id);
        if(!employeeOptional.isPresent()){
            throw new EmployeeNotFoundException("Employee with id: " + " not found");
        }

        return ResponseEntity.ok(employeeOptional);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Optional<Employee>> deleteEmployeeById(@PathVariable Long id){
        Optional<Employee> employeeOptional = employeeService.findById(id);
        if(!employeeOptional.isPresent()){
            throw new EmployeeNotFoundException("Employee with id: " + id +" not found");
        }

        employeeService.deleteEmployeeById(id);

        return ResponseEntity.ok(employeeOptional);
    }

    @PostMapping
    public ResponseEntity<Employee> addEmployee(@RequestBody EmployeeDto employeeDto){
        Employee employee = new Employee();

        employee.setFirstName(employeeDto.getFirstName());
        employee.setLastName(employeeDto.getLastName());
        employee.setJobTitle(employeeDto.getJobTitle());

        Optional<Role> role = roleService.findRole("Angajat");
        employee.setRole(role.get());

        Employee savedEmployee = employeeService.addEmployee(employee);
        URI location = ServletUriComponentsBuilder
                .fromCurrentRequest()
                .path("/{id}")
                .buildAndExpand(savedEmployee.getId()).toUri();

        return ResponseEntity.created(location).build();

    }


}
