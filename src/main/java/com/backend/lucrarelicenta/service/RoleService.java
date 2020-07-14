package com.backend.lucrarelicenta.service;

import com.backend.lucrarelicenta.model.Role;
import com.backend.lucrarelicenta.repository.RoleRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class RoleService {
    private RoleRepository roleRepository;

    public RoleService(RoleRepository roleRepository) {
        this.roleRepository = roleRepository;
    }

    public Optional<Role> findRole(String title){
        return roleRepository.findByTitle(title);
    }

    public List<Role> findAllRoles(){
        return roleRepository.findAll();
    }

    public Role addRole(Role role){
        Role role1= roleRepository.save(role);
        return role1;
    }

    public void deleteRoleById(Long id){
        roleRepository.deleteById(id);
    }


}
