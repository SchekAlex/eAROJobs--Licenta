package com.backend.lucrarelicenta.controller;

import com.backend.lucrarelicenta.dto.RoleDto;
import com.backend.lucrarelicenta.exceptions.RoleNotFoundException;
import com.backend.lucrarelicenta.model.Role;
import com.backend.lucrarelicenta.model.User;
import com.backend.lucrarelicenta.service.RoleService;
import com.backend.lucrarelicenta.service.UserService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import java.net.URI;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/roles")
@CrossOrigin(origins = "http://localhost:3000")
public class RoleController {
    private RoleService roleService;
    private UserService userService;

    public RoleController(RoleService roleService,UserService userService) {
        this.roleService = roleService;
        this.userService = userService;

    }

    @GetMapping
    public ResponseEntity<List<Role>> findAllRoles(){
        List<Role> rolesList = roleService.findAllRoles();
        return ResponseEntity.ok(rolesList);
    }

    @PostMapping
    public ResponseEntity<Role> addRole(@RequestBody Role role){
        Role role1= new Role();

        role1.setTitle(role.getTitle());

        Role savedRole = roleService.addRole(role1);
        URI location = ServletUriComponentsBuilder
                .fromCurrentRequest()
                .path("/{id}")
                .buildAndExpand(savedRole.getId()).toUri();

        return ResponseEntity.created(location).build();
    }

    @GetMapping("/{title}")
    public ResponseEntity<Optional<Role>> findRoleByTitle(@PathVariable String title){
        Optional<Role> role = roleService.findRole(title);

        if(!role.isPresent()){
            throw new RoleNotFoundException("Role with title : " + title +" not found");
        }

        return ResponseEntity.ok(role);
    }

    @DeleteMapping("/{title}")
    public ResponseEntity<Optional<Role>> deleteRole(@PathVariable String title){
        Optional<Role> role = roleService.findRole(title);

        if(!role.isPresent()){
            throw new RoleNotFoundException("Role with title : " + title +" not found");
        }
//        roleService.deleteUserRoleById(role.get().getId());
        roleService.deleteRoleById(role.get().getId());
        return ResponseEntity.ok(role);
    }

    @PutMapping("/{id}")
    public  ResponseEntity<Optional<Role>> updateRole( @RequestBody RoleDto roleDto, @PathVariable Long id){
        List<Role> roleList = new ArrayList<>();
        Optional<User> foundUser = userService.findUserById(id);



        for(String role:roleDto.getRoles()){
            Optional<Role> role1=roleService.findRole(role);
            roleList.add(role1.get());

        }
        foundUser.get().setRoleList(roleList);

        return ResponseEntity.ok().build();
    }
}
